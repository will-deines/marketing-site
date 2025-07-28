import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { checkRateLimit } from "@/lib/api-rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  storeUrl: z.string().url().optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
  topic: z.enum(["Support", "Sales", "Partnerships", "Press", "Other"]).default("Other"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export async function POST(request: Request) {
  try {
    // Check rate limit using Upstash Redis
    const { success: rateLimitSuccess, response: rateLimitResponse } = await checkRateLimit(request, {
      type: "strict", // Use strict rate limiting for contact forms
    });
    
    if (!rateLimitSuccess && rateLimitResponse) {
      return rateLimitResponse;
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { success: false, message: "Email service is not configured" },
        { status: 500 },
      );
    }

    // Parse form data (supports both JSON and multipart/form-data)
    let body: any;
    let fileAttachment: File | null = null;
    
    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        name: formData.get("name") as string || "",
        email: formData.get("email") as string || "",
        storeUrl: formData.get("storeUrl") as string || "",
        topic: formData.get("topic") as string || "Other",
        message: formData.get("message") as string || "",
        website: formData.get("website") as string || "", // honeypot
      };
      
      // Handle file attachment if present
      const file = formData.get("fileAttachment") as File;
      if (file && file.size > 0) {
        fileAttachment = file;
      }
    } else {
      body = await request.json();
    }

    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data: ContactFormData = validationResult.data;
    
    // Now validate file attachment after form data is validated
    if (fileAttachment) {
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(fileAttachment.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid file type. Please upload a PNG, JPG, or PDF file.",
          },
          { status: 400 },
        );
      }
      
      if (fileAttachment.size > 5 * 1024 * 1024) { // 5MB
        return NextResponse.json(
          {
            success: false,
            message: "File must be less than 5MB.",
          },
          { status: 400 },
        );
      }
    }

    const honeypot = body.website || body.url || body.phone;
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.storeUrl ? `<p><strong>Store URL:</strong> ${data.storeUrl}</p>` : ""}
      <p><strong>Topic:</strong> ${data.topic}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
      <hr>
      ${fileAttachment ? `<p><small>Attachment: ${fileAttachment.name} (${(fileAttachment.size / 1024).toFixed(2)} KB)</small></p>` : ""}
    `;

    const toEmail = process.env.CONTACT_EMAIL || "contact@garr.io";

    // Prepare email options
    const emailOptions: any = {
      from: "Garrio Contact Form <noreply@updates.garr.io>",
      to: [toEmail],
      replyTo: data.email,
      subject: `[${data.topic}] Contact from ${data.name}`,
      html: emailContent,
    };
    
    // Add attachment if present
    if (fileAttachment) {
      const buffer = await fileAttachment.arrayBuffer();
      emailOptions.attachments = [
        {
          filename: fileAttachment.name,
          content: Buffer.from(buffer),
        },
      ];
    }
    
    const { error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send your message. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}
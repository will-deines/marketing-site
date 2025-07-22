import type { Metadata } from "next"
import Header from "@/components/header"
import ContactPage from "@/components/contact/contact-page"

export const metadata: Metadata = {
  title: "Contact Garrio | Talk to Our Team",
  description:
    "Get in touch with the Garrio team. We reply within 24 hours and are here to help with sales, support, partnerships, or any questions you have.",
  keywords: "contact garrio, customer support, sales inquiries, partnerships, shopify support help",
  openGraph: {
    title: "Contact Garrio | Talk to Our Team",
    description:
      "Get in touch with the Garrio team. We reply within 24 hours and are here to help with sales, support, partnerships, or any questions you have.",
    url: "https://garrio.ai/contact",
    siteName: "Garrio",
    images: [
      {
        url: "/og/contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Garrio Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Garrio | Talk to Our Team",
    description:
      "Get in touch with the Garrio team. We reply within 24 hours and are here to help.",
    images: ["/og/contact.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ContactPage />
    </div>
  )
}

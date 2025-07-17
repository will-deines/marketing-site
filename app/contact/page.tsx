import type { Metadata } from "next"
import ContactPage from "@/components/contact/contact-page"

export const metadata: Metadata = {
  title: "Contact Garrio | Talk to Our Team",
  description:
    "Get in touch with the Garrio team. We reply within 24 hours and are here to help with sales, support, partnerships, or any questions you have.",
}

export default function Contact() {
  return <ContactPage />
}

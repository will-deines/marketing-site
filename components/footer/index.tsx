import CoreFooter from "./core-footer"
import LastChanceCTA from "./last-chance-cta"
import MicroFooter from "./micro-footer"
import NewsletterForm from "./newsletter-form"
import TrustStrip from "./trust-strip"

export default function Footer() {
  return (
    <footer>
      <LastChanceCTA />
      <CoreFooter />
      <TrustStrip />
      <NewsletterForm />
      <MicroFooter />
    </footer>
  )
}

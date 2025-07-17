import LastChanceCTA from "./last-chance-cta"
import CoreFooter from "./core-footer"
import TrustStrip from "./trust-strip"
import NewsletterForm from "./newsletter-form"
import MicroFooter from "./micro-footer"

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

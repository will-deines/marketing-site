import HeroIntro from "./hero-intro"
import SmartContactForm from "./smart-contact-form"
import SelfServeLinks from "./self-serve-links"
import CompanyInfo from "./company-info"
import SocialCta from "./social-cta"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <HeroIntro />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <SmartContactForm />
          </div>
          <div className="lg:col-span-5">
            <SelfServeLinks />
          </div>
        </div>

        <div className="mt-16">
          <CompanyInfo />
        </div>

        <div className="mt-16">
          <SocialCta />
        </div>
      </div>
    </main>
  )
}

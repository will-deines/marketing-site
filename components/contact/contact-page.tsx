import HeroIntro from "./hero-intro"
import SmartContactForm from "./smart-contact-form"
import SelfServeLinks from "./self-serve-links"
import CompanyInfo from "./company-info"
import SocialCta from "./social-cta"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-float-delayed" />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <HeroIntro />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <SmartContactForm />
            </div>
            <div className="lg:col-span-5 space-y-8">
              <SelfServeLinks />
              <CompanyInfo />
            </div>
          </div>

          <div className="mt-24">
            <SocialCta />
          </div>
        </div>
      </div>
    </main>
  )
}

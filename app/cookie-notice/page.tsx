import Header from "@/components/header";
import CoreFooter from "@/components/footer/core-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function CookieNotice() {
  return (
    <>
      <Header variant="solid" />
      <main className="min-h-screen pt-20">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-12">
            <section>
              <h1 className="text-4xl font-bold mb-6">
                Garrio, Inc. Notice on Cookies and Similar Technologies
              </h1>
              <p className="text-lg mb-4">
                Last updated/effective date: Dec 6, 2024
              </p>
              <p className="text-base mb-8">
                This Notice on Cookies and Similar Technologies ("Notice") applies
                to all websites and mobile applications (collectively, "Sites") of
                Garrio, Inc. ("Garrio," "us," "we," or "our").
              </p>
              <p className="text-base mb-8">
                This Notice describes the practices that Garrio follows when
                collecting information through the use of cookies and similar
                technologies on our Sites. Please be advised that, to the extent you
                access any of our Sites from the European Economic Area and accept
                our use of cookies, any information we collect from cookies will be
                transferred to the United States. Please see our Privacy Notice for
                more information.
              </p>
              <p className="text-base mb-8">
                We may change this Notice at any time. Please take a look at the
                Last Updated/Effective Date of this Policy (above) to see when this
                Notice was last revised. Any changes in this Notice will become
                effective when we make the revised Notice available.
              </p>
              <p className="text-base mb-8">
                If you have comments or questions about this Notice, please contact
                us as set forth below.
              </p>
            </section>

            <Accordion type="single" collapsible className="w-full space-y-6">
              <AccordionItem value="general-info" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    1. General information about cookies
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      Cookies are small text files, usually consisting of a series
                      of letters and numbers, that are downloaded onto your device
                      when you access our Sites. Software on your device, like your
                      browser, can store cookies and send them back to us the next
                      time you visit our Sites.
                    </p>
                    <p>
                      Because cookies store information between your visits to our
                      Sites, they allow us to "recognize" or "remember" you when you
                      return to the Sites, allowing our Sites to work. Cookies let
                      you log in, check out your shopping cart, see the Sites in
                      your preferred language and auto-populate your shipping
                      address. Cookies can also be used to track your online
                      behavior, activities and interests, so we can send you
                      customized advertising.
                    </p>
                    <p>
                      A cookie can either be a "session" cookie or a "persistent"
                      cookie. Session cookies exist only for so long as you are
                      visiting the applicable website and are typically deleted
                      within thirty (30) minutes or removed when you exit your web
                      browser, whichever is longer.
                    </p>
                    <p>
                      Persistent cookies exist for a set period of time, for
                      example, up to two (2) years. Each time you visit a website
                      that has implemented a persistent cookie, the persistent
                      cookie is renewed and that cookie will remain active until its
                      predetermined expiration date. You can restrict or block
                      cookies that are set by our Sites (or any other website on the
                      Internet) by adjusting your browser settings.
                    </p>
                    <p>
                      We place cookies necessary for our Sites to operate correctly.
                      These cookies do not capture identifiable personal information
                      and include cookies such as a Visitor ID (providing you with
                      consistency on our Sites), page number, session ID
                      (identifying your session on the Sites), test (does your
                      browser support cookies), and order (ensuring your shopping
                      basket functions).
                    </p>
                    <p>
                      First party cookies are necessary for our Sites to function.
                      Although you can opt out of first-party cookies using your
                      browser settings, if you do the Sites will not work properly.
                    </p>
                    <p>
                      Our Sites set several types of third-party cookies. We do not
                      control the operation of any third-party cookies. Some
                      third-party cookies facilitate "cross-device tracking,"
                      allowing us to connect your activity across our Sites
                      regardless of the device you use. You can opt out of many
                      third-party cookies at{' '}
                      <Link href="http://aboutads.info/choices" className="text-blue-600 hover:underline">
                        aboutads.info/choices
                      </Link>
                      .
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="summary-types" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    2. Summary of the types of cookies on our sites
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      There are three different categories of cookies used on our
                      Sites: (1) cookies that are strictly necessary for the Sites
                      to operate; (2) cookies that assist with the performance of
                      our Sites; and (3) marketing/targeting cookies. Each purpose
                      is outlined below.
                    </p>
                    <p className="font-bold">Strictly Necessary</p>
                    <p>
                      These cookies are necessary for the Sites to function and
                      enable us to provide you with features such as accessing
                      secure areas of the Sites. They cannot be switched off. As
                      mentioned above, without these cookies, the Sites would not
                      work properly. Since these cookies are strictly necessary to
                      deliver the Sites and any services you have requested to you,
                      you cannot opt out of the use of these cookies.
                    </p>
                    <p className="font-bold">Performance Cookies</p>
                    <p>
                      These cookies enhance the functionality and performance of our
                      Sites but are not essential to their use. Without these
                      cookies, certain functionality may become unavailable. These
                      cookies allow us to know which pages you find most and least
                      interesting, and how you move around the Sites. We can then
                      use the information to improve the Sites' performance and
                      therefore user experience, by ensuring you can more easily
                      find what you are looking for.
                    </p>
                    <p className="font-bold">Marketing/Targeting Cookies</p>
                    <p>
                      These cookies can be used to build profiles of your interests
                      and allow us to show you relevant ads on our Sites and
                      third-party sites. These cookies don't directly store personal
                      information, but they are based on uniquely identifying your
                      browser and Internet device. If you don't allow these cookies,
                      you'll still see advertisements, but they will be less
                      targeted.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="similar-tech" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    3. Similar Technologies
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      In addition to cookies, we use similar technologies. Web
                      beacons, tiny graphics, also known as "pixel tags" or "clear
                      GIFS", may be included on our Sites and used to track the
                      actions of users on our Sites. Web beacons, clear GIFs, or
                      similar technologies are usually rendered invisible on screen,
                      but can be seen using special "source" tools employed on most
                      browsers.
                    </p>
                    <p>
                      When you access the Sites or emails that we send, we may
                      automatically collect information about you, like your IP
                      address, the website that referred you to our Site, what pages
                      of our Site you visit, the time and date of these page views,
                      the type of device you're using, a unique device identifier,
                      the type of browser you're using, and your browser language.
                    </p>
                    <p>
                      This information is used to verify the effectiveness of our
                      Sites and emails, improve the quality of our Sites and emails,
                      and provide statistics regarding use of our Sites and emails.
                      Third parties may also use web beacons with our consent to
                      help compile statistics about your visit to our Sites.
                    </p>
                    <p>
                      Email messages sometimes include "click-through URLs" linked
                      to content on our Sites. When you click one of these URLs, you
                      pass through a separate web server before arriving at the
                      destination page on our Site. We track this click-through to
                      help us determine interest in topics and measure the
                      effectiveness of our customer communications. If you prefer
                      not to be tracked in this way, you should not click graphic or
                      text links in our email messages.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="manage-cookies" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    4. How to manage cookies
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      Most Internet browsers automatically accept cookies. However,
                      you can change your browser's options to stop automatically
                      accepting cookies or to prompt you before accepting cookies.
                      Please note, however, that if you don't accept cookies, you
                      may not be able to access all portions or features of the
                      Sites.
                    </p>
                    <p>
                      To find out more about cookies, including how to see what
                      cookies have been set and how to manage and delete them,
                      visit{' '}
                      <Link href="https://allaboutcookies.org" className="text-blue-600 hover:underline">
                        https://allaboutcookies.org
                      </Link>
                      .
                    </p>
                    <p>
                      To opt-out of being tracked by Google Analytics across all
                      websites, visit{' '}
                      <Link href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline">
                        https://tools.google.com/dlpage/gaoptout
                      </Link>
                      .
                    </p>
                    <p>
                      The EU GDPR and California Consumer Privacy Act permit you to
                      ask to opt out of each of these activities. If you are
                      browsing from the European Economic Area or California, United
                      States, to opt out of our use of cookies that are not
                      strictly necessary, please click "Manage Preferences" in the
                      website footer.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="location" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    5. Location
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      We are based in the United States and the information we
                      collect is governed by U.S. law. If you are accessing the
                      Sites from outside of the United States, please be aware that
                      information collected through the Site may be transferred to,
                      processed, stored, and used in the United States and other
                      jurisdictions. Data protection laws in the United States and
                      other jurisdictions may be different from those of your
                      country of residence. Your use of the Site or provision of any
                      information therefore constitutes your consent to the
                      transfer, processing, use, storage, and disclosure of your
                      information in the United States and other jurisdictions as
                      described in this Notice. If you have questions, please
                      consult our Privacy Notice or contact us as set forth below.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <p className="text-lg">
                If you have comments or questions about this Notice, please
                contact us at{' '}
                <Link href="mailto:legal@garr.io" className="text-blue-600 hover:underline">
                  legal@garr.io
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
      <CoreFooter />
    </>
  );
}
import Header from "@/components/header";
import CoreFooter from "@/components/footer/core-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function CCPADisclosures() {
  return (
    <>
      <Header variant="solid" />
      <main className="min-h-screen pt-20">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-12">
            <section>
              <h1 className="text-4xl font-bold mb-6">
                California Consumer Privacy Act Disclosures
              </h1>
              <p className="text-lg mb-4">
                Last updated/Effective date: Dec 6 2024
              </p>
              <p className="text-base mb-8">
                This notice and policy ("CCPA Notice") supplements information
                contained in the Privacy Notice ("Privacy Notice") from Garrio, Inc.
                and its corporate business affiliates ("Garrio," "Company," "us,"
                "we," or "our") and applies solely to residents of the State of
                California ("consumers" or "you"). Any terms defined in the
                California Consumer Privacy Act of 2018, as amended from time to
                time ("CCPA") and the California Privacy Rights Act of 2020 ("CPRA")
                have the same meaning when used in this notice and policy. This
                notice and policy does not reflect our collection, use, or
                disclosure of California residents' personal information, or data
                subject rights, where an exception under the CCPA applies.
              </p>
            </section>

            <Accordion type="single" collapsible className="w-full space-y-6">
              <AccordionItem value="right-to-know" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    1. Right to know about personal information collected and
                    disclosed, and to request deletion of personal information
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      You have the right to request that we disclose what personal
                      information we collect, use, or disclose about you
                      specifically ("right to know") and to request the deletion of
                      personal information. To submit a request to exercise the
                      right to know, please submit an email request to{' '}
                      <Link href="mailto:legal@garr.io" className="text-blue-600 hover:underline">
                        legal@garr.io
                      </Link>{' '}
                      To submit a request to delete personal information, please submit
                      an email request to{' '}
                      <Link href="mailto:legal@garr.io" className="text-blue-600 hover:underline">
                        legal@garr.io
                      </Link>{' '}
                    </p>
                    <p>
                      Garrio may ask that you provide certain information to verify
                      your identity. The information that we ask you to provide to
                      verify your identity will depend on your prior interactions
                      with us and the sensitivity of the personal information at
                      issue. Garrio will respond to your request in accordance with
                      the CCPA. If we deny your request, we will explain why.
                    </p>
                    <p>
                      When a business sells your personal information, you have a
                      right to opt out of such sale. We do not sell, and in the
                      preceding 12 months did not sell, the personal information of
                      California residents. We do not have actual knowledge that it
                      sells the personal information of minors under 16 years of
                      age.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="personal-info-handling" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    2. Personal information handling practices
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      We have set out below categories of personal information we
                      collect about California residents and have collected in the
                      preceding 12 months. For each category of personal
                      information, we have collected, we have included the reference
                      to the enumerated category or categories of personal
                      information in the CCPA that most closely describe such
                      personal information.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              Category
                            </th>
                            <th className="border border-gray-300 p-2">
                              Examples
                            </th>
                            <th className="border border-gray-300 p-2">
                              Collected
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Identifiers
                        </td>
                          <td className="border border-gray-300 p-2">
                          A real name, alias, postal address, unique personal
                          identifier, online identifier, Internet Protocol
                          address, email address, account name, Social Security
                          number, driver’s license number, passport number, or
                          other similar identifiers.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Yes
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Personal information categories listed in the
                          California Customer Records statute (Cal. Civ. Code §
                          1798.80(e)).
                        </td>
                          <td className="border border-gray-300 p-2">
                          A name, signature, Social Security number, physical
                          characteristics or description, address, telephone
                          number, passport number, driver’s license or state
                          identification card number, insurance policy number,
                          education, employment, employment history, bank
                          account number, credit card number, debit card number,
                          or any other financial information, medical
                          information, or health insurance information. Some
                          personal information included in this category may
                          overlap with other categories.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Yes
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Protected classification characteristics under
                          California or federal law.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Age (40 years or older), race, color, ancestry,
                          national origin, citizenship, religion or creed,
                          marital status, medical condition, physical or mental
                          disability, sex (including gender, gender identity,
                          gender expression, pregnancy or childbirth and related
                          medical conditions), sexual orientation, veteran or
                          military status, genetic information (including
                          familial genetic information).
                        </td>
                          <td className="border border-gray-300 p-2">
                          No
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Commercial information
                        </td>
                          <td className="border border-gray-300 p-2">
                          Records of personal property, products or services
                          purchased, obtained, or considered, or other
                          purchasing or consuming histories or tendencies.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Yes
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Biometric information
                        </td>
                          <td className="border border-gray-300 p-2">
                          Genetic, physiological, behavioral, and biological
                          characteristics, or activity patterns used to extract
                          a template or other identifier or identifying
                          information, such as, fingerprints, faceprints, and
                          voiceprints, iris or retina scans, keystroke, gait, or
                          other physical patterns, and sleep, health, or
                          exercise data.
                        </td>
                          <td className="border border-gray-300 p-2">
                          No
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Internet or other similar network activity
                        </td>
                          <td className="border border-gray-300 p-2">
                          Browsing history, search history, information on a
                          consumer’s interaction with a website, application, or
                          advertisement.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Yes
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Geolocation data
                        </td>
                          <td className="border border-gray-300 p-2">
                          Physical location or movements.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Yes
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Sensory data
                        </td>
                          <td className="border border-gray-300 p-2">
                          Audio, electronic, visual, thermal, olfactory, or
                          similar information.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Yes
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Professional or employment-related information
                        </td>
                          <td className="border border-gray-300 p-2">
                          Current or past job history or performance
                          evaluations.
                        </td>
                          <td className="border border-gray-300 p-2">
                          No
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Non-public education information (per the Family
                          Educational Rights and Privacy Act (20 U.S.C. Section
                          1232g, 34 C.F.R. Part 99)).
                        </td>
                          <td className="border border-gray-300 p-2">
                          Education records directly related to a student
                          maintained by an educational institution or party
                          acting on its behalf, such as grades, transcripts,
                          class lists, student schedules, student identification
                          codes, student financial information, or student
                          disciplinary records.
                        </td>
                          <td className="border border-gray-300 p-2">
                          No
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Inferences drawn from other personal information
                        </td>
                          <td className="border border-gray-300 p-2">
                          Profile reflecting a person’s preferences,
                          characteristics, psychological trends,
                          predispositions, behavior, attitudes, intelligence,
                          abilities, and aptitudes.
                        </td>
                          <td className="border border-gray-300 p-2">
                          Yes
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Sensitive personal information
                        </td>
                          <td className="border border-gray-300 p-2">
                          Social security, driver’s license, state
                          identification card, or passport number; account
                          log-in, financial account, debit card, or credit card
                          number in combination with any required security or
                          access code, password, or credentials allowing access
                          to an account; precise geolocation; racial or ethnic
                          origin, religious or philosophical beliefs, or union
                          membership; contents of a consumer’s mail, email, and
                          text messages unless the business is the intended
                          recipient of the communication; genetic data;
                          biometric information for the purpose of uniquely
                          identifying a consumer; personal information collected
                          and analyzed concerning a consumer’s health; or
                          personal information collected and analyzed concerning
                          a consumer’s sex life or sexual orientation.
                        </td>
                          <td className="border border-gray-300 p-2">
                          No
                        </td>
                      </tr>
                    </tbody>
                      </table>
                    </div>
                    <p>
                  Shine the Light: Pursuant to California Civil Code Section
                  1798.83, if you are a California resident, you have the right
                  to obtain: (a) a list of all third parties to whom we may have
                  disclosed your Personal Information within the past year
                  direct marketing purposes, and (b) a description of the
                  categories of Personal Information disclosed, by contacting us
                  per the “Contact Us” Section below.
                    </p>
                    <p>
                  Garrio collects such information from the following categories
                  of sources:
                    </p>
                    <ul className="list-disc pl-6">
                  <li>
                    <em>Directly from You.</em> We may
                    collect personal information when you: create a Garrio
                    account; make a purchase; communicate with us including when
                    you request information about our Services, register for
                    regular information updates, and request customer or
                    technical support; participate in our surveys; make
                    information available through our interactive features;
                    transfer information to third party platforms, such as your
                    social media platforms; and provide information while
                    attending our conferences, trade shows, webinars, or other
                    events.
                  </li>
                  <li>
                    <em>
                      Using cookies and automatic collection methods.
                        </em>{' '}
                    Garrio and its service providers may collect personal
                    information from the computer, tablet, phone, or other
                    device that you use to access our Services or to open an
                    email or click on an advertisement from Garrio. Garrio uses
                    efforts to respond to and honor “do not track signals.” For
                    more information about our collection of Cookies and Similar
                    Technologies, please refer to our Cookie Policy.
                  </li>
                  <li>
                    <em>
                      Third Parties, including Service Providers.
                        </em>{' '}
                    We may collect personal information about you that you have
                    made available via your privacy settings when you access our
                    Services through a third-party application, such as an app
                    store, a third party log-in service, or a social networking
                    website. We may also collect personal information from
                    service providers that we use to perform Services on our
                    behalf or assist us with our provision of Services to you
                    and from other third parties that we choose to collaborate
                    or work with. Further, third parties, such as your friends,
                    family, or co-worker, may provide information about you
                    through our referral service.
                  </li>
                    </ul>
                    <p>
                  Garrio collects, uses, retains, and discloses your personal
                  information for the purposes described below:
                    </p>
                    <ul className="list-disc pl-6">
                  <li>
                    Establish your identity and verify the accuracy of your
                    information.
                  </li>
                  <li>
                    Provide you with our services, including to: provide you
                    access to our Services, applications, tools, and
                    functionalities; process, maintain, and service your
                    account(s); offer you enhanced functionalities when
                    accessing our Services, including to keep track of your
                    specified preferences, interests, or past items viewed;
                    process your payments; identify and repair errors with our
                    Services; provide you customer or technical support; allow
                    you to register for our events; and enable service providers
                    to perform the Services on our behalf of assist us with our
                    provision of Services to you.
                  </li>
                  <li>Manage user relationship and communications with you.</li>
                  <li>
                    Handle and record consumer rights requests, including
                    opt-ins and opt-outs.
                  </li>
                  <li>
                    Market our products and Services and provide personalized
                    service or product recommendations to you.
                  </li>
                  <li>
                    Engage in research and development efforts to assess the
                    performance of our Services, analyze activities, usage,
                    interests, and trends in connection with our Services,
                    improve and personalize our Services, and develop new
                    products and services.
                  </li>
                  <li>Assess and pursue potential business opportunities.</li>
                  <li>
                    Monitor, protect and improve Garrio security assets and
                    resources, including devices, systems, customer data,
                    infrastructure, and Garrio network.
                  </li>
                  <li>
                    Audit interactions and transactions with you, identify
                    irregular website behavior, and prevent fraud or other
                    unauthorized or illegal activity.
                  </li>
                  <li>
                    Enforce our agreements and policies, comply with laws and
                    regulatory requirements, and respond to lawful requests,
                    court orders, and legal processes.
                  </li>
                  <li>
                    Create de-identified and/or aggregated information, such as
                    demographic information and information about the device
                    from which you access our Services. If we create or receive
                    de-identified information, we will not attempt to
                    re-identify such information, except to comply with
                    applicable law.
                  </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="disclosure" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    3. Disclosure of personal information
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                  In the preceding 12 months, Garrio disclosed the above
                  categories of personal information to the following categories
                  of third parties for a business purpose, in some cases as
                  directed by you:
                    </p>
                    <ul className="list-disc pl-6">
                  <li>
                    <em>
                      Garrio Affiliates and Business Partners.
                        </em>{' '}
                    In particular, we may transfer your personal information to
                    our affiliates for administrative purposes, including IT
                    management, to provide Services to you, and to support and
                    supplement the Services we provide. We may also transfer
                    your personal information to business partners to provide
                    you with a product or service you have requested or to
                    jointly offer a product or service to you.
                  </li>
                  <li>
                    <em>
                      Third Parties, including Service Providers.
                        </em>{' '}
                    In particular, we may use service providers to perform
                    Services on our behalf or assist us with the provision of
                    Services to you, including to provide us with IT support,
                    hosting, payment processing, customer service, marketing,
                    advertising, and related services. We may also transfer your
                    personal information to third parties in connection with a
                    merger, acquisition, financing due diligence,
                    reorganization, bankruptcy, receivership, purchase or sale
                    of assets, or transition of service to another provider, as
                    permitted by law and/or contract.
                  </li>
                  <li>
                    <em>
                      Government Regulatory Authorities.
                        </em>{' '}
                    In particular, we may disclose your personal information to
                    relevant government regulatory authorities if we believe the
                    disclosure is reasonably necessary to comply with a law,
                    regulation, or legal request. We may also transfer your
                    personal information to third parties if we, in good faith,
                    believe doing so is required to enforce our policies or
                    contracts, collect amounts owed to us, assist us with an
                    investigation or prosecution of a suspected or actual
                    illegal activity, or to otherwise protect your, our, or
                    others’ rights, property, or safety.
                  </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy-rights" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    4. Your California privacy rights
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      If you are a resident of California, subject to certain
                      exceptions, you may have the following rights:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              Privacy Right
                            </th>
                            <th className="border border-gray-300 p-2">
                              Description
                            </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Notice
                        </td>
                          <td className="border border-gray-300 p-2">
                          The right to be notified of what categories of
                          Personal Information will be collected at or before
                          the point of collection and the purposes for which
                          they will be used and shared.
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Access
                        </td>
                          <td className="border border-gray-300 p-2">
                          The right to request the categories of Personal
                          Information that we collected in the previous twelve
                          (12) months, the categories of sources from which the
                          Personal Information was collected, the specific
                          pieces of Personal Information we have collected about
                          you, and the business purposes for which such Personal
                          Information is collected and shared. You may also have
                          the right to request the categories of Personal
                          Information which were disclosed for business
                          purposes, and the categories of third parties in the
                          twelve (12) months preceding your request for your
                          Personal Information.
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Data Portability
                        </td>
                          <td className="border border-gray-300 p-2">
                          The right to receive the Personal Information you have
                          previously provided to us.
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Erasure
                        </td>
                          <td className="border border-gray-300 p-2">
                          The right to have your Personal Information deleted.
                          However, please be aware that we may not fulfill your
                          request for deletion if we (or our service
                          provider(s)) are required or permitted to retain your
                          Personal Information for one or more of the following
                          categories of purposes: (1) to complete a transaction
                          for which the Personal Information was collected,
                          provide a good or service requested by you, or
                          complete a contract between us and you; (2) to ensure
                          our website integrity, security, and functionality;
                          (3) to comply with applicable law or a legal
                          obligation, or exercise rights under the law
                          (including free speech rights); or (4) to otherwise
                          use your Personal Information internally, in a lawful
                          manner that is compatible with the context in which
                          you provided it.
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          Correction
                        </td>
                          <td className="border border-gray-300 p-2">
                          You have the right to request that we correct any
                          incorrect personal information that we collect or
                          retain about you, subject to certain exceptions. Once
                          we receive and confirm your verifiable consumer
                          request (see below), we will correct (and direct any
                          of our service providers that hold your data on our
                          behalf to correct) your personal information from our
                          records, unless an exception applies. We may deny your
                          correction request if (a) we believe the personal
                          information we maintain about you is accurate; (b)
                          correcting the information would be impossible or
                          involve disproportionate; or (c) if the request
                          conflicts with our legal obligations.
                        </td>
                      </tr>
                      <tr>
                          <td className="border border-gray-300 p-2">
                          To Opt Out of Sales or Sharing of Personal Information
                        </td>
                          <td className="border border-gray-300 p-2">
                          The right to opt out of the sale or sharing of your
                          Personal Information.
                        </td>
                      </tr>
                    </tbody>
                      </table>
                    </div>
                    <p>
                  You may not be discriminated against because you exercise any
                  of your rights under the CCPA in violation of California Civil
                  Code § 1798.125.
                    </p>
                    <p>
                  If you would like to opt out of sharing or the sales of your
                  Personal Information, you may submit your opt-out request{' '}
                  <Link href="#" className="text-blue-600 hover:underline">here</Link>. If you would like to limit the use
                  of your sensitive Personal Information, you may submit your
                  request <Link href="#" className="text-blue-600 hover:underline">here</Link>.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="authorized-agent" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    5. Authorized agent
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      You can designate an authorized agent to make a request under
                      the CCPA on your behalf if:
                    </p>
                    <ul className="list-disc pl-6">
                  <li>
                    The authorized agent is a natural person or a business
                    entity registered with the Secretary of State of California
                    and the agent provides proof that you gave the agent signed
                    permission to submit the request; and
                  </li>
                  <li>
                    You directly confirm with Garrio that you provided the
                    authorized agent with permission to submit the request.
                  </li>
                    </ul>
                    <p>
                  If you use an authorized agent to submit a request to exercise
                  your right to know or your right to request deletion, please
                  provide any information Garrio requests to verify your
                  identity. The information that Garrio asks you to provide to
                  verify your identity will depend on your prior interactions
                  with us and the sensitivity of the personal information at
                  issue.
                    </p>
                    <p>
                  If you provide an authorized agent with power of attorney
                  pursuant to Probate Code sections 4121 to 4130, it may not be
                  necessary to perform these steps and we will respond to any
                  request from such authorized agent in accordance with the
                  CCPA.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    7. Security
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      We use commercially reasonable efforts to protect the
                      confidentiality and security of the personal data we process.
                      However, despite these efforts to store personal data in a
                      secure operating environment, we cannot guarantee the security
                      of the personal data during its transmission or its storage on
                      our systems. Furthermore, while we attempt to ensure the
                      integrity and security of personal data, we cannot guarantee
                      that our security measures will prevent third parties, such as
                      hackers, from illegally obtaining access to it.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="changes" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    8. Changes to this notice
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      Please note that we may modify or update this CCPA Notice from
                      time to time, so please review it periodically. We may provide
                      you with an updated Notice if material changes are made.
                      Unless otherwise indicated, any changes to this Notice will
                      apply immediately upon posting to the Site.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                Contact us for more information
              </h2>
              <p className="text-lg">
                If you have any questions or comments about this notice and policy,
                the ways in which we collect and use your personal information, your
                choices and rights regarding such use, please do not hesitate to
                contact us at:
              </p>
              <p className="text-base mt-4">
                Garrio, Inc.
                <br />
                <Link href="mailto:privacy@garr.io" className="text-blue-600 hover:underline">
                  privacy@garr.io
                </Link>
                <br />
              </p>
            </section>
          </div>
        </div>
      </main>
      <CoreFooter />
    </>
  );
}

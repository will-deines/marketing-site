import Link from "next/link";

import CoreFooter from "@/components/footer/core-footer";
import Header from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default function PrivacyPolicy() {
  return (
    <>
      <Header variant="solid" />
      <main className="min-h-screen pt-20">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-12">
            <section>
              <h1 className="text-4xl font-bold mb-6">Privacy Notice</h1>
              <p className="text-lg mb-4">Thank you for using Garrio!</p>
              <p className="text-base mb-8">Last Updated: December 6, 2024</p>
              <p className="text-base mb-12">
                Garrio, Inc., inclusive of our wholly owned subsidiaries,
                (&quot;Garrio,&quot; &quot;Company,&quot; &quot;us,&quot;
                &quot;we,&quot; or &quot;our&quot;), provides a platform to
                allow our customers to engage and converse with their end users
                through chat, voice and video. This Privacy Notice
                (&quot;Privacy Notice&quot;) is designed to help you understand
                how we collect, use, process, and disclose your personal
                information and to help you understand and exercise your privacy
                rights under applicable law (&quot;Law&quot;).
              </p>
            </section>

            <Accordion type="single" collapsible className="w-full space-y-6">
              <AccordionItem value="scope" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Scope and Updates to this Privacy Notice
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      This Privacy Notice applies to personal information
                      processed by us, including on our websites and other
                      online or offline marketing or promotional campaigns. To
                      make this Privacy Notice easier to read, our websites and
                      other marketing campaigns are collectively called the
                      &quot;Services&quot;.
                    </p>
                    <p>
                      We may provide additional privacy notices in writing to
                      individuals at the time we collect their personal
                      information. Any additional privacy notices may supplement
                      this Privacy Notice or may apply in lieu of this Privacy
                      Notice.
                    </p>
                    <p className="font-bold">Important Note</p>
                    <p>
                      This Privacy Notice does not apply to any of the personal
                      information that we process on behalf of our customers
                      through their use of our Services (&quot;Customer
                      Data&quot;). Our customers&apos; respective privacy
                      policies govern their collection and use of Customer Data.
                      Our processing of Customer Data is governed by the
                      contracts that we have in place with our customers, not
                      this Privacy Notice. Any questions or requests relating to
                      Customer Data should be directed to our customer.
                    </p>
                    <p className="font-bold">Changes to our Privacy Notice</p>
                    <p>
                      We may revise this Privacy Notice from time to time in our
                      sole discretion. If there are any material changes to this
                      Privacy Notice, we will notify you if required by
                      applicable law. You understand and agree that you will be
                      deemed to have accepted the updated Privacy Notice if you
                      continue to participate in our Services after the new
                      Privacy Notice takes effect.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="personal-info"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Personal Information We Collect
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      The categories of personal information we collect depend
                      on how you interact with us, our Services, and the
                      requirements of applicable law. We collect information
                      that:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>you provide to us;</li>
                      <li>we obtain as you participate in our Services; or</li>
                      <li>
                        we obtain from other sources (i.e., third-party services
                        as defined below).
                      </li>
                    </ul>
                    <p className="font-bold">
                      A. Personal Information You Provide to Us Directly
                    </p>
                    <p>
                      We may collect personal information that you provide to
                      us.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-bold">Engagement.</span> We may
                        collect personal information when you engage with your
                        account, such as your name, email address, and username.
                        (Depending on the service you use, you may also be asked
                        to provide your phone number.)
                      </li>
                      <li>
                        <span className="font-bold">Purchases.</span> We may
                        collect personal information and details associated with
                        your purchases, including payment information (e.g.,
                        your billing details).
                      </li>
                      <li>
                        <span className="font-bold">
                          Your Communications with Us.
                        </span>{" "}
                        We may collect personal information, such as name,
                        company name, email address, phone number, or mailing
                        address when you request information about our Services,
                        register for regular information updates (e.g.,
                        newsletter, webinar, advertising), request customer or
                        technical support, or otherwise communicate with us.
                      </li>
                      <li>
                        <span className="font-bold">Surveys.</span> We may
                        contact you to participate in surveys. If you decide to
                        participate, we may collect personal information from
                        you in connection with the survey.
                      </li>
                      <li>
                        <span className="font-bold">Interactive Features.</span>{" "}
                        We and others who use our Services may collect personal
                        information that you submit or make available through
                        our interactive features (e.g., messaging and chat
                        features, commenting functionalities, forums, blogs, and
                        social media pages). Any information you provide using
                        the public sharing features of the Services will be
                        considered &quot;public,&quot; unless otherwise required
                        by applicable law and these privacy disclosures do not
                        apply to public information unless required by
                        applicable law. Please exercise caution before revealing
                        any information that may identify you in the real world
                        to other users.
                      </li>
                      <li>
                        <span className="font-bold">
                          Conferences, Trade Shows, Webinars and Other Events.
                        </span>{" "}
                        We may collect personal information from individuals
                        when we attend or host conferences, trade shows,
                        webinars, and other events.
                      </li>
                      <li>
                        <span className="font-bold">
                          Business Development and Strategic Partnerships.
                        </span>{" "}
                        We may collect personal information from individuals and
                        third parties to assess and pursue potential business
                        opportunities.
                      </li>
                      <li>
                        <span className="font-bold">Job Applications.</span> We
                        may post job openings and opportunities on our Services.
                        If you respond to one of these postings, we may collect
                        your personal information, such as your application, CV,
                        cover letter, and/or any other information you provide
                        to us.
                      </li>
                    </ul>
                    <p className="font-bold">
                      B. Personal Information Collected Automatically
                    </p>
                    <p>
                      We may collect personal information automatically when you
                      use our Services.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-bold">
                          Automatic Collection of Personal Information.
                        </span>{" "}
                        We may collect certain information automatically when
                        you use our Services, such as your Internet protocol
                        (IP) address, user settings, MAC address, cookie
                        identifiers, mobile carrier, mobile advertising and
                        other unique identifiers, browser or device information,
                        location information (including approximate location
                        derived from IP address), and Internet service provider.
                        We may also automatically collect information regarding
                        your use of our Services, pages you visit, information
                        about the links you click, the types of content you
                        interact with, the frequency and duration of your
                        activities, and other information about how you use our
                        Services. In addition, we may collect information on
                        diagnostic information, including metadata based on
                        information above, regarding the performance of the
                        Services.
                      </li>
                      <li>
                        <span className="font-bold">
                          Cookies and Other Technologies.
                        </span>{" "}
                        We, as well as third parties that provide content,
                        advertising, or other functionalities on our Services,
                        may use cookies, pixel tags or web beacons, and other
                        technologies (&quot;Technologies&quot;) to automatically
                        collect information through your use of our Services.
                        Such use of Technologies may be subject to your consent
                        as required by applicable law. See section 5 below to
                        understand your choices regarding these Technologies.
                        More information about our Cookies and Similar
                        Technologies is available in our Cookies Notice.
                      </li>
                      <li>
                        <span className="font-bold">Analytics.</span> We may use
                        Technologies and other third-party tools to process
                        analytics information on our Services. These
                        Technologies allow us to better understand how our
                        Services are used and to continually improve and
                        personalize our Services.
                      </li>
                      <li>
                        <span className="font-bold">
                          Social Media Platforms.
                        </span>{" "}
                        Our Services may contain social media buttons, such as
                        Twitter, Facebook and LinkedIn, which might include
                        widgets such as the &quot;share this&quot; button or
                        other interactive mini programs. These features may
                        collect personal information such as your IP address and
                        which page you are visiting on our Services, and may set
                        a cookie to enable the feature to function properly.
                        Your interactions (including your engagement with us on
                        these platforms) with these platforms are governed by
                        the privacy notice of the company providing it.
                      </li>
                    </ul>
                    <p className="font-bold">
                      C. Personal Information Collected from Other Sources
                    </p>
                    <p>
                      Third-Party Services and Sources. We may obtain personal
                      information about you from other sources, including
                      through third-party services and organizations. For
                      example, if you access our Services through a third-party
                      application, such as an app store, a third-party login
                      service, or a social networking site, we may collect
                      personal information about you from that third-party
                      application that you have made available via your privacy
                      settings.
                    </p>
                    <p>
                      Referrals and Sharing Features. Our Services may offer
                      various tools and functionalities that allow you to
                      provide personal information about your friends through
                      our referral service. Third parties may also use the
                      Services to upload personal information about you,
                      including when they tag you. Our referral services may
                      also allow you to forward or disclose certain content with
                      a friend or colleague, such as an email inviting your
                      friend to use our Services. Please only disclose with us
                      contact information of people with whom you have a
                      relationship (e.g., relative, friend, neighbor, or
                      co-worker).
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="how-we-use"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    How We Use Your Personal Information
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      We use your personal information for a variety of business
                      purposes, including to provide our Services, for
                      administrative purposes, and to market our products and
                      Services, as described below.
                    </p>
                    <p className="font-bold">A. Provide Our Services</p>
                    <p>
                      We use your information to fulfil our contract with you
                      and provide you with our Services, such as:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>
                        Managing your information (including opting-in and out
                        of communications);
                      </li>
                      <li>
                        Providing access to certain areas, functionalities, and
                        features of our Services;
                      </li>
                      <li>
                        Answering requests for information or technical support;
                      </li>
                      <li>
                        Communicating with your activities on our Services, and
                        Notice changes;
                      </li>
                      <li>
                        Processing applications if you apply for a job we post
                        on our Services; and
                      </li>
                      <li>Allowing you to register for events.</li>
                    </ul>
                    <p className="font-bold">B. Administrative Purposes</p>
                    <p>
                      We use your information for various administrative
                      purposes, such as:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Direct marketing;</li>
                      <li>
                        Research and development (including marketing research);
                      </li>
                      <li>Network and information security;</li>
                      <li>
                        Detecting security incidents, protecting against
                        malicious, deceptive, fraudulent or illegal activity,
                        and prosecuting those responsible for that activity;
                      </li>
                      <li>
                        Measuring interest and engagement in our Services;
                      </li>
                      <li>
                        Short-term, transient use, such as contextual
                        customization of ads;
                      </li>
                      <li>Improving, upgrading, or enhancing our Services;</li>
                      <li>Developing new products and services; and</li>
                      <li>Ensuring internal quality control and safety:</li>
                      <ul className="list-disc pl-8">
                        <li>
                          Authenticating and verifying individual identities,
                          including requests to exercise your rights under this
                          Privacy Notice
                        </li>
                        <li>
                          Debugging to identify and repair errors with our
                          Services
                        </li>
                        <li>
                          Auditing relating to interactions, transactions, and
                          other compliance activities
                        </li>
                        <li>
                          Sharing personal information with third parties as
                          needed to provide the Services
                        </li>
                        <li>Enforcing our agreements and policies</li>
                        <li>
                          Carrying out activities that are required to comply
                          with our legal obligations.
                        </li>
                      </ul>
                    </ul>
                    <p className="font-bold">
                      C. Marketing and Advertising our Products and Services
                    </p>
                    <p>
                      We may use personal information to tailor and provide you
                      with content and advertisements. We may provide you with
                      these materials as permitted by applicable law. Some of
                      the ways we market to you include email campaigns, custom
                      audiences advertising, and &quot;interest-based&quot; or
                      &quot;personalized advertising.&quot; If you have any
                      questions about our marketing practices or if you would
                      like to opt out of the use of your personal information
                      for marketing purposes, you may contact us at any time as
                      set forth in &quot;Contact Us&quot; below.
                    </p>
                    <p className="font-bold">D. With Your Consent</p>
                    <p>
                      We may use personal information for other purposes that
                      are clearly disclosed to you at the time you provide
                      personal information or with your consent.
                    </p>
                    <p className="font-bold">E. Other Purposes</p>
                    <p>
                      We may use your personal information for other purposes as
                      requested by you or as permitted by applicable law.
                    </p>
                    <ul className="list-disc pl-6">
                      <li>
                        De-identified and Aggregated Information. We may use
                        personal information to create de-identified and/or
                        aggregated information, such as demographic information,
                        information about the device from which you access our
                        Services, or other analyses we create. If we create or
                        receive de-identified information, we will not attempt
                        to reidentify such information, except to comply with
                        applicable law. In addition, we have implemented
                        commercially reasonable technical safeguards and
                        business processes to prohibit the reidentification of
                        information.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="how-we-disclose"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    How We Disclose Your Personal Information
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      We disclose your personal information to third parties for
                      a variety of business purposes, as follows.
                    </p>
                    <p className="font-bold">
                      A. Disclosures to Provide our Services
                    </p>
                    <p>
                      The categories of third parties with whom we may disclose
                      your personal information are described below.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-bold">Service Providers.</span> We
                        may disclose your personal information with our
                        third-party service providers and vendors that assist us
                        with the provision of our Services. This includes
                        service providers that provide us with IT support,
                        hosting, payment processing, customer service, and
                        related services.
                      </li>
                      <li>
                        <span className="font-bold">Business Partners.</span> We
                        may disclose your personal information with business
                        partners to provide you with a product or service you
                        have requested. We may also disclose your personal
                        information with business partners with whom we jointly
                        offer products or services.
                      </li>
                      <li>
                        <span className="font-bold">Affiliates.</span> We may
                        disclose your personal information with our company
                        affiliates for our administrative purposes, including
                        activities such as IT management, for them to provide
                        services to you or support and supplement the Services
                        we provide.
                      </li>
                      <li>
                        <span className="font-bold">
                          Other Users or Third Parties.
                        </span>{" "}
                        As described above in Section 2, our Services may allow
                        you to disclose personal information or interact with
                        other users and/or third parties (including individuals
                        and third parties who do not use our Services and the
                        general public).
                      </li>
                      <li>
                        <span className="font-bold">Advertising Partners.</span>{" "}
                        We may disclose your personal information with
                        third-party advertising partners. These third-party
                        advertising partners may set Technologies and other
                        tracking tools on our Services to collect information
                        regarding your activities and your device (e.g., your IP
                        address, cookie identifiers, page(s) visited, location,
                        time of day). These advertising partners may use this
                        information (and similar information collected from
                        other services) for purposes of delivering personalized
                        advertisements to you when you visit digital properties
                        within their networks. This practice is commonly
                        referred to as &quot;interest-based advertising&quot; or
                        &quot;personalized advertising.&quot;
                      </li>
                      <li>
                        <span className="font-bold">APIs/SDKs.</span> We may use
                        third-party application program interfaces
                        (&quot;APIs&quot;) and software development kits
                        (&quot;SDKs&quot;) as part of the functionality of our
                        Services. For more information about our use of APIs and
                        SDKs, please contact us as set forth in &quot;Contact
                        Us&quot; below.
                      </li>
                    </ul>
                    <p className="font-bold">
                      B. Disclosures to Protect Us or Others
                    </p>
                    <p>
                      We may access, preserve, and disclose any information we
                      store associated with you to external parties if we, in
                      good faith, believe doing so is required or appropriate
                      to: comply with law enforcement or national security
                      requests and legal process, such as a court order or
                      subpoena; protect your, our, or others&apos; rights,
                      property, or safety; enforce our policies or contracts;
                      collect amounts owed to us; or assist with an
                      investigation or prosecution of suspected or actual
                      illegal activity.
                    </p>
                    <p className="font-bold">
                      C. Disclosure in the Event of Merger, Sale, or Other Asset
                      Transfers
                    </p>
                    <p>
                      If we are involved in a merger, acquisition, financing due
                      diligence, reorganization, bankruptcy, receivership,
                      purchase or sale of assets, or transition of service to
                      another provider, your information may be sold or
                      transferred as part of such a transaction, as permitted by
                      law and/or contract.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="privacy-choices"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Your Privacy Choices and Rights
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      The privacy choices you may have about your personal
                      information are determined by applicable law and are
                      described below.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-bold">Email Communications.</span>{" "}
                        If you receive an unwanted email from us, you can use
                        the unsubscribe link found at the bottom of the email to
                        opt out of receiving future emails. Note that you will
                        continue to receive transaction-related emails regarding
                        products or Services you have requested. We may also
                        send you certain non-promotional communications
                        regarding us and our Services, and you will not be able
                        to opt out of those communications (e.g., communications
                        regarding our Services or updates to our Terms or this
                        Privacy Notice).
                      </li>
                      <li>
                        <span className="font-bold">
                          Cookies and Personalized Advertising.
                        </span>{" "}
                        You may stop or restrict the placement of Technologies
                        on your device or remove them by adjusting your
                        preferences as your browser or device permits. However,
                        if you adjust your preferences, our Services may not
                        work properly. Please note that cookie-based opt-outs
                        are not effective on mobile applications. However, you
                        may opt-out of personalized advertisements on some
                        mobile applications by following the instructions for
                        Android, iOS, and others.
                      </li>
                    </ul>
                    <p>
                      The online advertising industry also provides websites
                      from which you may opt out of receiving targeted ads from
                      data partners and other advertising partners that
                      participate in self-regulatory programs. You can access
                      these and learn more about targeted advertising and
                      consumer choice and privacy by visiting the Network
                      Advertising Initiative, the Digital Advertising Alliance,
                      the European Digital Advertising Alliance, and the Digital
                      Advertising Alliance of Canada.
                    </p>
                    <p>
                      Please note you must separately opt out in each browser
                      and on each device.
                    </p>
                    <p className="font-bold">B. Your Privacy Rights</p>
                    <p>
                      In accordance with applicable law, you may have the right
                      to:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>
                        Access Personal Information about you, including: (i)
                        confirming whether we are processing your personal
                        information; and (ii) obtaining access to or a copy of
                        your personal information
                      </li>
                      <li>
                        Request Correction of your personal information where it
                        is inaccurate, incomplete or outdated. In some cases, we
                        may provide self-service tools that enable you to update
                        your personal information
                      </li>
                      <li>
                        Request Deletion, Anonymization or Blocking of your
                        personal information when processing is based on your
                        consent or when processing is unnecessary, excessive, or
                        noncompliant
                      </li>
                      <li>
                        Request Restriction of or Object to our processing of
                        your personal information when processing is
                        noncompliant
                      </li>
                      <li>
                        Withdraw your Consent to our processing of your personal
                        information. Please note that your withdrawal will only
                        take effect for future processing, and will not affect
                        the lawfulness of processing before the withdrawal. If
                        you refrain from providing personal information or
                        withdraw your consent to processing, some features of
                        our Service may not be available
                      </li>
                      <li>
                        Request data portability and receive an electronic copy
                        of personal information that you have provided to us
                      </li>
                      <li>
                        Be informed about third parties to which your personal
                        information has been disclosed
                      </li>
                      <li>
                        Request the review of decisions taken exclusively based
                        on automated processing if these decisions could affect
                        your data subject rights.
                      </li>
                    </ul>
                    <p>
                      If you would like to exercise any of these rights, please
                      contact us as set forth in &quot;Contact Us&quot; below.
                      We will process such requests in accordance with
                      applicable laws.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="security"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Security of Your Information
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      Security procedures are in place to protect the
                      confidentiality of your data. Unfortunately, no system is
                      100% secure, and we cannot ensure or warrant the security
                      of any information you provide to us. To the fullest
                      extent permitted by applicable law, we do not accept
                      liability for unauthorized access, use, disclosure, or
                      loss of personal information.
                    </p>
                    <p>
                      By using our Services or providing personal information to
                      us, you agree that we may communicate with you
                      electronically regarding security, privacy, and
                      administrative issues relating to your use of our
                      Services. If we learn of a security system&apos;s breach,
                      we may attempt to notify you electronically by posting a
                      notice on our Services, by mail, or by sending an email to
                      you.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="international"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    International Data Transfers
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      All information processed by us may be transferred,
                      processed, and stored anywhere in the world, including,
                      but not limited to, the United States or other countries,
                      which may have data protection laws that are different
                      from the laws where you live. While transferring your
                      personal information internationally, we will comply with
                      the applicable requirements governing processing of your
                      personal information in a specific location – for example,
                      your country of residence. We endeavor to safeguard your
                      information consistent with the requirements of applicable
                      laws.
                    </p>
                    <p>
                      For personal data transferred from the United Kingdom,
                      Switzerland, or European Union, to the United States,
                      Garrio has self-certified its compliance with the EU-U.S.
                      Data Privacy Framework (&quot;EU-U.S. DPF&quot;), the
                      Swiss-U.S. Data Privacy Framework (&quot;Swiss-U.S.
                      DPF&quot;), and the UK Extension to the EU-U.S. DPF
                      (&quot;UK Extension&quot;), collectively (the
                      &quot;DPF&quot;). Further information can be found on
                      Garrio&apos;s Data Privacy Framework Notice.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="retention"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Retention of Personal Information
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      Your personal data will be retained for as long as
                      necessary for the purposes for which it was collected,
                      which in most cases do not exceed 5 years. When Garrio no
                      longer needs to use your personal data to comply with
                      contractual or statutory obligations, we will remove it
                      from our systems and records and/or take steps to properly
                      anonymize it so that you can no longer be identified from
                      it, unless we need to keep your information, including
                      personal data, to comply with statutory retention periods,
                      such as for tax, audit, or legal compliance purposes, for
                      a legally prescribed time period thereafter, or if we need
                      it to preserve evidence within statutes of limitation.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="google-workspace"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Google Workspace Data Usage
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p className="font-bold">
                      Use of Google User Data for AI/ML Models
                    </p>
                    <p>
                      Garrio does not automatically use Google Workspace data to
                      train artificial intelligence (AI) or machine learning
                      (ML) models. If a customer explicitly requests or provides
                      Google Workspace data as training data for an AI/ML model,
                      such data will only be used to create personalized AI/ML
                      models.
                    </p>

                    <p className="font-bold">
                      Restrictions on Google Workspace APIs
                    </p>
                    <p>
                      We explicitly affirm that Google Workspace APIs are not
                      used to develop, improve, or train
                      generalized/non-personalized AI and/or ML models. Any use
                      of data obtained through Google Workspace APIs is strictly
                      limited to providing and improving the specific service to
                      the user who authorized access to their data.
                    </p>

                    <p className="font-bold">Third-Party AI Tool Transfers</p>
                    <p>
                      Garrio does not transfer data from Google Workspaces to
                      any third-party AI tools as a standard practice. If a
                      customer explicitly requests Google Workspace data to be
                      transferred to any third-party AI tools, we ensure that
                      such transfers comply with our data protection obligations
                      and that the data will not be used for developing,
                      improving, or training generalized/non-personalized AI/ML
                      models.
                    </p>

                    <p>
                      Any processing of Google user data will always be in
                      compliance with the Google API Services User Data Policy,
                      including the Limited Use requirements.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="california"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Supplemental Notice for California Residents
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      For residents of California, please find our California
                      Consumer Privacy Act Disclosures{" "}
                      <Link
                        href="/ccpa-disclosures"
                        className="text-blue-600 hover:underline"
                      >
                        here
                      </Link>
                      .
                    </p>
                    <p>
                      <span className="font-bold">
                        California Shine the Light.
                      </span>{" "}
                      The California &quot;Shine the Light&quot; law permits
                      users who are California residents to request and obtain
                      from us once a year, free of charge, a list of the third
                      parties to whom we have disclosed their personal
                      information (if any) for their direct marketing purposes
                      in the prior calendar year, as well as the type of
                      personal information disclosed to those parties.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="third-party"
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    Third-Party Websites or Applications
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      The Services may contain links to other
                      websites/applications and other websites/applications may
                      reference or link to our Services. These third-party
                      services are not controlled by us. We encourage our users
                      to read the privacy policies of each website and
                      application with which they interact. We do not endorse,
                      screen, or approve, and are not responsible for, the
                      privacy practices or content of such other websites or
                      applications. Providing personal information to
                      third-party websites or applications is at your own risk.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <p className="text-lg">
                If you have any questions about this Privacy Notice, please
                contact us at{" "}
                <Link
                  href="mailto:legal@garr.io"
                  className="text-blue-600 hover:underline"
                >
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


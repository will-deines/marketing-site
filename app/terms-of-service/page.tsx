import Link from "next/link";

import CoreFooter from "@/components/footer/core-footer";
import Header from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default function TermsOfService() {
  return (
    <>
      <Header variant="solid" />
      <main className="min-h-screen pt-20">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-12">
            <section>
              <h1 className="text-4xl font-bold mb-6">
                Terms of Service
              </h1>
              <p className="text-lg mb-4">
                LAST UPDATED: 07/16/2024
              </p>
              <p className="text-base mb-8">
                GARRIO LICENSE AGREEMENT ("AGREEMENT" or "Agreement") (v2.1)
              </p>
              <p className="text-base mb-8">
                IMPORTANT: PLEASE CAREFULLY READ THESE CURRENT TERMS AND CONDITIONS
                GOVERNING YOUR USE OF GARRIO'S DOCUMENTATION, PACKAGED SOFTWARE,
                INCLUDING APPLICATION PROGRAMMING INTERFACE ("API") OR SOFTWARE
                DEVELOPER KITS ("SDK") AS APPLICABLE, AND ANY THIRD PARTY HOSTED
                CLOUD SERVICE PROVIDERS, INCLUSIVE OF SUCH LIMITATIONS OR OPTIONAL
                FEATURES AS MAY BE COMMUNICATED TO CUSTOMER AND ANY SUPPORTING
                SERVICES ("COLLECTIVELY, GARRIO SERVICES"). THIS IS A LEGAL
                AGREEMENT BETWEEN YOU AND THE LEGAL ENTITY YOU REPRESENT
                (&quot;CUSTOMER&quot;) AND GARRIO, INC. AND ITS SUBSIDIARIES AND
                AFFILIATES, AS APPLICABLE ("GARRIO"). BY CLICKING THE &quot;I
                ACCEPT&quot; BUTTON, EXECUTING AN ORDER THAT REFERENCES THIS
                AGREEMENT, OR BY EITHER ACCESSING OR USING THE GARRIO SERVICES,
                CUSTOMER ACKNOWLEDGES THAT CUSTOMER HAS REVIEWED, UNDERSTANDS, AND
                ACCEPTS THESE TERMS AND CONDITIONS. YOU WARRANT AND REPRESENT THAT
                YOU HAVE THE AUTHORITY TO BIND YOUR LEGAL ENTITY AND "CUSTOMER"
                REFERS TO THAT ENTITY. IF CUSTOMER DOES NOT AGREE WITH ALL OF THE
                TERMS AND CONDITIONS IN THIS AGREEMENT, DO NOT ACCESS OR OTHERWISE
                USE THE GARRIO SERVICES. BY USING THE GARRIO SERVICES, CUSTOMER
                WARRANTS TO USE BEST EFFORTS TO ENSURE CONTRACTUAL EFFICACY TO ALL
                TERMS HEREIN. GARRIO MAY MAKE CHANGES TO THE GARRIO SERVICES OR
                MODIFY THE TERMS AND CONDITIONS HEREIN AT ANY TIME. CUSTOMER'S
                CONTINUED USE OF THE GARRIO SERVICES AFTER MODIFICATIONS HAVE BEEN
                POSTED TO GARRIO'S WEBSITE WILL SIGNIFY CUSTOMER'S ASSENT TO AND
                ACCEPTANCE OF THE REVISED TERMS. TO THE EXTENT ANY TERMS OF THIS
                AGREEMENT DIRECTLY CONFLICT WITH THE TERMS OF ANY FULLY EXECUTED
                WRITTEN AGREEMENT BETWEEN GARRIO AND CUSTOMER ("SUPPLEMENTAL
                AGREEMENT"), THE SUPPLEMENTAL AGREEMENT SHALL APPLY.
              </p>
            </section>
            <Accordion type="single" collapsible className="w-full space-y-6">
              <AccordionItem value="orders" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    1. Order(s)
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      1.1. This Agreement incorporates any current or future
                      order(s) for Garrio Services (collectively, "Order") submitted
                      online or in written or electronic form between the parties
                      after the Effective Date and until the last expired Order
                      ("Term"). Each order will specify the service period, or if
                      not shall default to mean each calendar month ("Service
                      Period"). Garrio reserves the right to reasonably update,
                      modify or amend terms either to comply with applicable law or
                      based upon new features or functionality via Customer's
                      acknowledgement to a click-through license. To the extent, any
                      terms and conditions in any applicable click-through license
                      directly conflict with this Agreement, this Agreement shall
                      control until the parties execute a formal amendment or
                      addendum to this Agreement or a new master services agreement
                      is signed between the parties.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="access-license" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    2. Access & license to Garrio software, platform, services
                    and services documentation
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      2.1. Subject to all terms and conditions of this Agreement,
                      Garrio hereby grants to Customer the right to access and use
                      the Garrio Services during the term as expressly agreed in
                      applicable Order(s) and strictly limited to Customer's
                      internal and lawful business purposes. Subject to the terms of
                      this Agreement, Garrio grants to Customer and Customer accepts
                      from Garrio a limited, revocable, non-exclusive,
                      non-transferable limited license and right to use and access
                      the Garrio Services in strict accordance with this Agreement
                      and written guides and guidelines that describe the Garrio
                      Services, the operating instructions, getting started guides,
                      user manuals, and help files, in written or electronic form,
                      made available to Customer ("Documentation").
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="customer-data" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    3. Customer data
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      3.1. Customer represents and warrants that Customer has or
                      will procure all rights necessary for its use of any content,
                      data or data streams published in connection with the Garrio
                      Services, including, but not limited to, (i) data originating
                      from or destined for delivery to any subscriber, person or
                      entity that uses the Garrio Services ("End User")
                      participating in a stream of communication such as (but not
                      limited to) a conversation, chat room or comment thread that
                      is sent or received through the Garrio Services ("Messages");
                      (ii) the data related to a voice or voice & video call ("Call
                      Data") such as Call history, Call transaction dates, and other
                      Call metadata; or (iii) any data, data streams or third party
                      content from any websites, applications, or other technology
                      used to interface with the Garrio Services, accessible to End
                      Users which are owned and operated by the Customer or at the
                      direction of the Customer or under license from the Customer
                      (collectively, "Customer Data"). Customer will have sole
                      discretion as to which Customer Data it will utilize in
                      connection with Customer's use of the Garrio Services and
                      shall provide any and all necessary disclosures. Customer is
                      solely responsible for any use of Customer Data used during
                      the Garrio Services.
                    </p>
                    <p>
                      3.2. Customer will have control over any and all Customer Data
                      which Customer or End Users upload to the Garrio Services.
                      Customer hereby grants to Garrio a non-exclusive,
                      royalty-free, worldwide license during the Term to reproduce,
                      de-identify, distribute, publicly perform, publicly display
                      and digitally perform the Customer Data and Call Data solely
                      for providing, supporting or improving the Garrio Services to
                      Customer and End Users. Additionally, Customer understands
                      that the technical processing and transmission of the Garrio
                      Services, including any Customer Data and Calls provided by
                      Customer, may involve (i) transmissions over various
                      third-party networks, and (ii) changes to conform and adapt to
                      technical requirements of connecting networks or devices, and
                      Customer consents to such transmission and changes.
                    </p>
                    <p>
                      3.3. Customer and Garrio acknowledge that Customer Data may
                      from time to time include personally identifiable information
                      ("Personal Data") to the extent Customer or End Users upload
                      Personal Data to the Garrio Services. Customer agrees that, as
                      with all Customer Data and Call Data, the uploading of
                      Personal Data is exclusively within the control of Customer or
                      End Users, as applicable. Customer will comply with all
                      applicable federal, state, local and international privacy,
                      data protection, and security laws, rules and regulations,
                      including without limitation, laws relating to the collection,
                      use, reuse, processing, storage, security, protection,
                      handling, cross-border transfer and disclosure of Personal
                      Data. Garrio will process the Personal Data in accordance with
                      this Agreement, Customer's lawful written instructions and
                      Garrio 's then-current Data Processing Addendum ("DPA"), which
                      may be found at{' '}
                      <Link href="https://web.garr.io/data-privacy-framework" className="text-blue-600 hover:underline">web.garr.io/data-privacy-framework</Link>. The DPA
                      is incorporated herein by reference and made part of this
                      Agreement.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="de-identified-data" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    4. De-identified data & feedback
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      4.1. Customer grants to Garrio a non-exclusive,
                      non-transferable, worldwide, commercial, perpetual,
                      irrevocable, royalty-free license to use de-identified data
                      from Customer's or End User's use of the Garrio Service to:
                      (i) provide and maintain Garrio Services; (ii) improve or
                      offer new Garrio Services; (iii) measure performance of Garrio
                      Services; or (iv) for any other lawful business purpose. For
                      clarity, de-identified data, which may include metadata or
                      aggregated data, used by Garrio under this Section 4.1 will
                      never identify the Customer, End User nor any individual. To
                      the extent that any Customer provides any suggestions,
                      enhancement request, correction, ideas or other feedback
                      regarding the Garrio Services ("Feedback"), Customer grants
                      Garrio a non-exclusive, worldwide, irrevocable, royalty-free
                      license to reproduce, modify, create derivative works of,
                      license, distribute and otherwise commercialize the Feedback
                      as part of any of Garrio Services.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="restrictions" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    5. Restrictions of use for Garrio services
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      5.1. Customer agrees not to attempt to, nor allow any third
                      party to: (i) copy or make derivative works of the Garrio
                      Services, expand the rights of access or use beyond the Order,
                      or make the Garrio Services available to any third party via
                      sublicense, rent service bureau or time sharing basis, (ii)
                      decompile, reverse engineer, or disassemble the Garrio
                      Services or otherwise attempt to reconstruct or discover any
                      source code, underlying ideas or algorithms of the Garrio
                      Services; (iii) disclose or publish, without Garrio's express
                      prior written consent, performance or capacity statistics or
                      the results of any benchmark test performed on the Garrio
                      Services; (iv) use the Garrio Services to develop a
                      competitive product offering promote or support any product or
                      service that is competitive with the Garrio Services; (v)
                      attempt to gain unauthorized access to the Garrio Services,
                      including access to other Garrio customer's data; (vi) remove
                      any identification, patent, trademark, copyright, or other
                      notice from the Garrio Services; (vii) interfere with or
                      disrupt the integrity or performance of the Garrio Services,
                      or unreasonably burden the infrastructure utilized by Garrio
                      to deliver the Garrio Services; (viii) use the Garrio Services
                      including the transmission of Customer Data, in any manner
                      that violates any law, rule, regulation or any other legal or
                      regulatory requirement imposed by any regulatory or government
                      agency or political subdivision, whether federal, state,
                      local, or foreign; (ix) use, reproduce, distribute, or permit
                      others to use, reproduce, or distribute any Garrio
                      Confidential Information for any purpose other than as
                      explicitly specified in this Agreement; or (x) utilize
                      Garrio's sandbox environment for commercial use, use in an app
                      store or app marketplace, or in a manner that is noncompliant
                      with the restrictions set forth by Garrio.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="third-party-integration" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    6. Integration of third-party applications & platforms
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      6.1. The Garrio Services may support integrations with certain
                      third-party applications and platforms ("Third-Party
                      Services"). Customer may be required to input credentials or
                      Garrio may provide the applicable credentials on behalf of the
                      Customer to access and use Third-Party Services. Any access or
                      use is entirely at the Customer's sole discretion. By enabling
                      any access or use of the Third-Party Services, Customer has
                      authorized Garrio to provide, on Customer&apos;s behalf, an
                      integration with the Third-Party Services and has provided all
                      permissions required under applicable law. Customer represents
                      and warrants that Customer, in any use of Third-Party
                      Services, will comply with applicable law, as well as the
                      terms, conditions and restrictions of the Third-Party Services
                      provider. Customer acknowledges and agrees that Garrio has no
                      responsibility or liability for any Third-Party Services,
                      including but not limited to, how a Third-Party Services uses
                      or processes any information shared, including Customer Data,
                      after such is exported to a Third-Party Services. Garrio does
                      not guarantee that it will continue to make available or
                      maintain integrations with any Third-Party Services, and
                      moreover, Garrio may disable such integrations at any time
                      with or without notice to Customer. Customer agrees to
                      indemnify, defend and hold harmless Garrio against any claim
                      arising out of or relating to Customer's use of any
                      Third-Party Services.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="customer-obligations" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    7. Additional Customer obligations
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      7.1. Customer is solely responsible for all activities
                  required by or otherwise related to the development,
                  production, delivery, updating and promotion of any technology
                  outside of the Garrio Service, including but not limited to,
                  the Customer’s websites, applications, or other technology
                  used to interface with the Garrio Service (“Customer
                  Services”). Customer is solely responsible for all Customer
                  Services issues, including but not limited to, functionality,
                      warranty, and technical and end user support.
                    </p>
                    <p>
                      7.2. Customer shall comply with all applicable laws in the
                  performance of its obligations hereunder, and shall ensure
                  that each of the following complies with all applicable law:
                  (i) the Customer Services and all related features and
                  functionality; (ii) the terms and conditions applicable to the
                  Customer Services; (iii) the fees and charges applied to or in
                  connection with any Customer Service; (iv) and all materials
                  related to the Customer Services, including, without
                  limitation, all marketing and informational materials and
                      disclosures.
                    </p>
                    <p>
                      7.3. Customer shall promptly fix any bugs in Customer Service
                  or software that causes the Garrio Services to be accessed in
                  a way that is not consistent with the Documentation or is
                  otherwise detrimental to the performance of the Garrio
                      Platform or Garrio Services.
                    </p>
                    <p>
                      7.4. Customer shall maintain and adhere to all commercially
                  reasonable security measures to protect Customer Service and
                  the data contained therein from unauthorized control,
                  tampering, or any other unauthorized access, including,
                      without limitation, compliance with applicable laws.
                    </p>
                    <p>
                      7.5. Customer shall promptly notify Garrio (i) regarding any
                  End User that engages in (or that Customer reasonably believes
                  has engaged in) activity that is illegal, fraudulent,
                  malicious, or violates any rights of any third party or the
                  terms of this Agreement, or (ii) if Customer becomes aware of
                  any actual or suspected unauthorized use of its account,
                  usernames or passwords, or any other breach or suspected
                      breach of security related to the Garrio Services.
                    </p>
                    <p>
                      7.6. Customer shall ensure that at all times during the term
                  of this Agreement, Customer’s installation, configuration, and
                  use of Garrio Services shall (i) conform to specifications set
                  forth in the applicable Documentation, (ii) comply with all
                  applicable laws and regulations, including without limitation
                  the Telephone Consumer Protection Act (“TCPA”), and (iii)
                  comply with all license and use restrictions with respect to
                  any third party software used by, or incorporated into, the
                      Services.
                    </p>
                    <p>
                      7.7. Customer is responsible for processing and handling
                  notices it receives from any third party claiming that
                  Customer’s or its End User&apos;s content in connection with
                  the Garrio Platform and Garrio Services violates such party’s
                  rights including without limitation, notices pursuant to the
                  Digital Millennium Copyright Act. Garrio reserves the right to
                  block any Customer Data or suspend any Customer account that
                  violates the terms of Sections 5 or 7 of this Agreement,
                  violates applicable law or, due to a security risk, in
                  Garrio’s reasonable discretion is necessary to mitigate
                  liability or damages or reasonably necessary protect the
                      interests of either party to this Agreement.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="warranties" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    8. Limited warranties and disclaimers
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      8.1. With respect to Garrio Services, Garrio Services shall
                  conform in substantial conformance to the functionality as set
                      forth in the applicable then-current Documentation.
                    </p>
                    <p>
                      8.2. The preceding obligation will not apply if: (i) the
                  Garrio Services provided are used inconsistent with this
                  Agreement or the Documentation; (ii) if Garrio Services or any
                  part thereof have been modified without the prior written
                  consent of Garrio; or (iii) a defect in Garrio Services
                  provided hereunder has been caused by any of Customer’s
                  equipment, software or third-party software. In addition, the
                  preceding obligation does not apply to downtime, service
                  interruption or other related issues covered by Garrio&apos;s
                  then-current Service Level Agreement{' '}
                      <Link href="https://www.garr.io/support-sla" className="text-blue-600 hover:underline">
                        https://www.garr.io/support-sla
                      </Link>{' '}
                  (the &quot;SLA&quot;). Customer&apos;s sole and exclusive
                  remedies for Garrio&apos;s failure to meet an SLA Obligation
                      is described in the applicable SLA.
                    </p>
                    <p>
                      8.3. Garrio may use artificial intelligence and machine
                  learning technologies, including without limitation OpenAI,
                  Anthropic, and Mistral (collectively, “AI Technologies”) to
                  perform certain Garrio Services (&quot;AI Services&quot;).
                  Furthermore, Customer acknowledges and agrees that: (i) given
                  the predictive and fast evolving nature of AI Technologies,
                  Garrio cannot guarantee that outputs and responses generated
                  through use of the AI Services (“Outputs”) will be 100%
                  accurate and/or free from hallucinations, or will accurately
                  or completely reflect facts; (ii) it will not rely or allow
                  its end-users to rely on Outputs as a sole source of truth or
                  factual information, or as a substitute for professional
                  advice; (iii) it will evaluate Outputs for accuracy and
                  appropriateness for each applicable use case, including using
                  human review as appropriate before using or sharing Outputs;
                  (iv) it will not use Outputs relating to a person for any
                  purpose in a manner that could have a legal or material impact
                  on that person, including without limitation in connection
                  with making credit, educational, employment, housing,
                  insurance, legal, medical, or other important decisions about
                  them; (v) due to the nature of AI Technologies, Outputs may
                  not be unique and others may receive similar Outputs from the
                  AI Services; and (vi) Customer will not use or allow its
                  end-users to use the AI Services to generate Outputs that
                  violate another’s rights, including, without limitation, by
                      way of an infringement of intellectual property rights.
                    </p>
                    <p>
                      8.4. In the event Customer discovers that the Garrio Services
                  provided by Garrio hereunder, as applicable, are not in
                  conformance with the obligations set forth in Section 8.1 and
                  reports such non-conformity to Garrio, Garrio will, at
                  Garrio’s discretion, (i) exercise commercially reasonable
                  efforts to correct the non-conformity at no additional charge
                  to Customer, or (ii) refund Customer any prepaid fees covering
                  the remainder of the then-current term dating from the
                  Customer’s notice of such non-conformance. THE REMEDY STATED
                  IN THIS PARAGRAPH AND THE REMEDY STATED IN GARRIO&apos;S SLA,
                  AS APPLICABLE, CONSTITUTES CUSTOMER’S SOLE AND EXCLUSIVE
                  REMEDY AND GARRIO’S ENTIRE LIABILITY UNDER SECTIONS 8.1 OF
                      THIS AGREEMENT.
                    </p>
                    <p>
                  8.5. EXCEPT AS EXPRESSLY SET FORTH IN THIS SECTION 8, THE
                  SERVICES PROVIDED HEREUNDER BY GARRIO ARE PROVIDED &quot;AS
                  IS&quot; WITH ALL FAULTS AND WITHOUT ANY REPRESENTATIONS OR
                  WARRANTIES. GARRIO MAKES NO REPRESENTATION OR WARRANTY THAT
                  THE GARRIO SERVICES WILL BE AVAILABLE, ACCESSIBLE,
                  UNINTERRUPTED, TIMELY, SECURE, ACCURATE, COMPLETE, VIRUS-FREE
                  OR ERROR-FREE. THIS DISCLAIMER OF WARRANTY EXTENDS TO CUSTOMER
                  AND END USERS OF CUSTOMER’S PRODUCTS AND SERVICES AND IS IN
                  LIEU OF ALL WARRANTIES AND CONDITIONS WHETHER EXPRESS,
                  IMPLIED, OR STATUTORY, AND INCLUDES A DISCLAIMER OF THE
                  IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR PARTICULAR
                  PURPOSE, TITLE, AND NONINFRINGEMENT AND ANY IMPLIED WARRANTIES
                      ARISING FROM COURSE OF DEALING OR COURSE OF PERFORMANCE.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="intellectual-property" className="border rounded-lg px-4">
                <AccordionTrigger className="py-4">
                  <h2 className="text-xl font-semibold text-left">
                    9. Intellectual property & trademarks
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>
                      9.1. Garrio Services, Documentation and any content, excluding
                  Customer Data, but including de-identified data as expressed
                  in Section 4.1 herein, embodied in or used in connection with
                  the implementation, operation, improvement, maintenance, or
                  hosting of the Garrio Services including all associated
                  software (whether in source code, object code, or other form),
                  databases, indexing, search, and retrieval methods and
                  routines, HTML, active server pages, intranet pages, and
                  similar materials) and all intellectual property and other
                  rights, title, and interest therein (including copyrights,
                  trade secrets, and all rights in patents, custom reports,
                  compilations, algorithms, inventions, improvements,
                  modifications, extensions, enhancements, configurations,
                  derivative works, discoveries, processes, methods, designs and
                  know-how (regardless of whether copyrightable or patentable)
                  pertaining to any of the foregoing (all of which shall be
                  deemed part of the Garrio Proprietary Materials), whether
                  conceived by Garrio alone or in conjunction with others
                  constitute Confidential Information and the valuable
                  intellectual property, proprietary material, and trade secrets
                  of Garrio and our licensors and are protected by applicable
                  intellectual property laws of the United States and other
                  countries. Customer acknowledges and agrees that except for
                  the rights of access expressly granted to Customer in this
                  Agreement, Garrio shall retain all right, title and interest
                  in and to the foregoing, inclusive of any derivatives,
                  modifications or improvements and nothing contained in this
                  Agreement shall be construed as conferring upon Customer by
                  implication, operation of law, estoppel, or otherwise, any
                      other license or right to Garrio Proprietary Materials.
                    </p>
                    <p>
                      9.2. Each party shall strictly comply with all standards with
                  respect to the other party’s trademarks which may be furnished
                  by such party from time to time. Further, neither party shall
                  create a combination mark consisting of one or more marks of
                  the other party. All uses of the other party&apos;s marks
                  shall inure to the benefit of the party owning such mark.
                  Notwithstanding the foregoing, Garrio may identify Customer by
                  name, with or without use of the Customer’s trademark, in
                  general promotional lists of Garrio’s customers without
                      Customer's prior consent.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
          <AccordionItem value="confidentiality" className="border rounded-lg px-4">
            <AccordionTrigger className="py-4">
              <h2 className="text-xl font-semibold text-left">
                10. Confidentiality
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p>
                  10.1. Confidential Information means any data or information
                  disclosed to one party, oral or written, wherein a reasonable
                  person with general industry knowledge would likely understand
                  such information is non-public, sensitive, proprietary or
                  confidential. Such information includes, but is not limited
                  to, Garrio Proprietary Materials (in whatever form or media
                  provided), inventions, internal processes, plans, financial
                  information, End User data, transaction volume, forecasts,
                  projections, pricing and the terms and conditions of this
                  Agreement. Notwithstanding the foregoing, Confidential
                  Information shall not include information that the receiving
                  party may reasonably demonstrate: (i) is in or has entered the
                  public domain through no breach of this Agreement; (ii) it has
                  been rightfully received by the receiving party from a third
                  party and without breach of any obligation of confidentiality
                  of such third party to the owner of the Confidential
                  Information; (iii) it has been approved for release by written
                  authorization of the owner of the Confidential Information; or
                  (iv) was independently developed by a party without use of or
                  access to the Confidential Information of the other party.
                </p>
                <p>
                  10.2. Each party acknowledges and agrees that, from time to
                  time, it may receive Confidential Information from the other
                  party. The party that receives Confidential Information (the
                  Receiving Party) hereby agrees (i) to hold the other party’s
                  (the Disclosing Party) Confidential Information in confidence
                  and to take commercially reasonable precautions to protect
                  such Confidential Information from unauthorized disclosure
                  (including, without limitation, all precautions the Receiving
                  Party employs with respect to its own confidential materials),
                  (ii) not to make any use whatsoever at any time of such
                  Confidential Information except in furtherance of this
                  Agreement, (iv) not to copy or reverse engineer any such
                  Confidential Information, and (v) that any employee,
                  subcontractor, or agent given access to any such Confidential
                  Information must have a legitimate need to know and shall be
                  bound in writing to comply with confidentiality obligations at
                  least as restrictive as the Receiving Party's
                  confidentiality obligations in this Agreement.
                </p>
                <p>
                  10.3. Notwithstanding the above, the Receiving Party may
                  disclose Confidential Information only to the extent legally
                  compelled by a court or other government authority, provided,
                  however, that the Receiving Party will, to the extent legally
                  permissible, give prompt written notice to the Disclosing
                  Party of such legal process upon receipt so that the
                  Disclosing Party may seek an appropriate protective order, or
                  pursue such other legal action, as the Disclosing Party may
                  deem appropriate.
                </p>
                <p>
                  10.4. Each party’s confidentiality obligations will survive
                  for the longer of three (3) years after termination, or as
                  applicable for each Receiving Party, one (1) year after such
                  Receiving Party no longer holds any of Disclosing Party’s
                  Confidentiality Information in its possession, custody or
                  control.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="fees-payment" className="border rounded-lg px-4">
            <AccordionTrigger className="py-4">
              <h2 className="text-xl font-semibold text-left">
                11. Fees & payment
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p>
                  11.1. Customer shall pay to Garrio the amounts set forth on the
                  Garrio website unless otherwise agreed in an Order Form, which
                  such fees may include any applicable support fees. In
                  addition, Customer agrees to pay the applicable fees based
                  upon the volume of data, number of Chat Monthly Active Users
                  the Customer has processed or registered through the Garrio
                  Service and the volume of data stored in the Garrio Cloud
                  (Collectively, “Usage Fees”). All fees are non-refundable and
                  non-cancelable. There will be no refunds or credits for
                  partial months of service, upgrades, downgrades, or unused
                  months. Fees listed do not include any applicable sales, use,
                  withholding, excise or VAT taxes. Customer shall be
                  responsible for payment of all such taxes, fees, duties and
                  charges, and any related penalties and interest, arising from
                  the payment of such fees or the delivery or use of the Garrio
                  Services.
                </p>
                <p>
                  11.2. Prepaid package upgrades, downgrades, or cancellations
                  must be processed within the Garrio Administrative Portal. To
                  ensure upgrades, downgrades, or cancellations are processed
                  for an upcoming Service Period, requests must be submitted
                  before the end of the current month (using Pacific Standard
                  Time) to avoid billing of fees for the next month. Customer’s
                  requested upgrades, downgrades and cancellations shall
                  constitute an Order Form once confirmed by Garrio.
                </p>
                <p>
                  11.3. Customer must maintain a payment method on file within
                  the Garrio Dashboard. Customer authorizes Garrio to charge
                  your payment method on file for all services purchased
                  including Usage fees. Customer authorizes Garrio to use a
                  third party to process payments and consents to the disclosure
                  of your payment information to such third party.
                </p>
                <p>
                  11.4. Garrio will send billing correspondence to the email
                  address entered as billing contact by Customer in the Garrio
                  Dashboard.
                </p>
                <p>
                  11.5. In the event of a good faith dispute as to the
                  calculation of a charge, Customer shall promptly give written
                  notice to Garrio stating the details of any such dispute and
                  shall promptly pay any undisputed amount. The acceptance by
                  Garrio of such partial payment shall not constitute a waiver
                  of payment in full by Garrio of the disputed amount. Customer
                  agrees to pay all costs and expenses of whatever nature,
                  including reasonable attorneys’ fees, incurred by or on behalf
                  of Garrio in connection with the collection of any unpaid
                  amounts due to Garrio hereunder.
                </p>
                <p>
                  11.6. Any undisputed amount due to Garrio under this Agreement
                  and not paid within 30 days of invoice due date may be subject
                  to a finance charge payable by Customer which is equal to one
                  and one-half percent (1.5%) or the highest rate allowable by
                  law, whichever is less, determined and compounded daily from
                  the date such amount is due until the date such amount is
                  paid. Notwithstanding anything to the contrary contained in
                  this Agreement, failure to make timely payments of undisputed
                  amounts shall constitute a default hereunder and shall entitle
                  Garrio to suspend Customer access to the Garrio Platform and
                  Garrio Services without notice at Garrio's sole discretion.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="indemnification" className="border rounded-lg px-4">
            <AccordionTrigger className="py-4">
              <h2 className="text-xl font-semibold text-left">
                12. Indemnification
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p>
                  12.1. Customer will defend, indemnify and hold harmless Garrio
                  its officers, directors, employees, subsidiaries, affiliates,
                  successors and assigns from all claims, demands, actions,
                  proceedings, liabilities, judgments, settlements, damages,
                  costs and expenses (including reasonable attorneys' fees)
                  arising from, directly or indirectly, any unaffiliated third
                  party related to (i) facts that, if true would constitute a
                  breach of this Agreement by Customer, (ii) Customer’s or its
                  End Users’ access to, use, misuse or illegal use of the Garrio
                  Service including without limitation the use of AI Services,
                  Customer Data or End User Data, or (iii) the Customer Data or
                  Customer Service’s violation or infringement of any
                  intellectual property rights. Garrio reserves the right to
                  assume the exclusive defense and control of any matter which
                  is subject to indemnification under this section, in which
                  case Customer agrees to cooperate with any reasonable requests
                  to assist Garrio's defense of such matter.
                </p>
                <p>
                  12.2. Garrio will defend Customer against, and will indemnify
                  Customer against final award of damages paid to unaffiliated
                  third parties that brought the claim and arising out of any
                  claim that the Garrio Services, during the Term, infringe any
                  U.S. patent issued as of the Effective Date (“Claim”);
                  provided that: (i) Customer promptly notifies Garrio in
                  writing after Customer’s receipt of notification of a
                  potential Claim; (ii) Garrio shall have the right to assume
                  sole control of the defense of such Claim and all related
                  settlement negotiations; and (iii) Customer provides Garrio,
                  at Garrio’s request and expense, with the assistance,
                  information and authority necessary to perform Garrio’s
                  obligations under this Section. Notwithstanding the foregoing,
                  Garrio shall have no liability for any Claim to the extent it
                  is based on (i) Customer’s written specifications or
                  direction, or (ii) Customer’s or any agent of Customer’s
                  modification of the Garrio Services. Customer reserves the
                  right to retain counsel at its own expense to participate in
                  the defense and settlement of any such Claim. If, due to a
                  Claim, (i) the Garrio Services are held by a court of
                  competent jurisdiction to be or are believed by Garrio to
                  infringe, or (ii) Customer receives a valid court order
                  enjoining Customer from using the Garrio Services, Garrio may
                  at its expense, (i) replace or modify the Garrio Services to
                  be non-infringing provided that such modification or
                  replacement contains substantially similar features and
                  functionality, or (ii) obtain for Customer a license to
                  continue using the Garrio Services or (iii) terminate the
                  applicable Order and its indemnity obligation for further
                  activity by requesting that Customer cease use of the
                  offending Garrio Service and then refunding to Customer the
                  unamortized portion of the unused fees for those Services at
                  issue hereunder (assuming amortization on a straight-line
                  basis over the Term). THE FOREGOING STATES THE ENTIRE
                  LIABILITY OF GARRIO WITH RESPECT TO THE INFRINGEMENT OF ANY
                  INTELLECTUAL PROPERTY OR PROPRIETARY RIGHTS BY THE SERVICES OR
                  OTHERWISE, AND CUSTOMER HEREBY EXPRESSLY WAIVES ANY OTHER
                  LIABILITIES OR OBLIGATIONS WITH RESPECT THERETO.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="limitation-liability" className="border rounded-lg px-4">
            <AccordionTrigger className="py-4">
              <h2 className="text-xl font-semibold text-left">
                13. Limitation of liability
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p>
                  13.1. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                  EVENT WILL GARRIO BE LIABLE WITH RESPECT TO ANY SUBJECT MATTER
                  OF THIS AGREEMENT FOR BREACH OF CONTRACT, BREACH OF WARRANTY,
                  TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE) OR ANY OTHER
                  LEGAL OR EQUITABLE THEORY FOR: (I) ANY INDIRECT, INCIDENTAL,
                  CONSEQUENTIAL, SPECIAL OR EXEMPLARY DAMAGES (EVEN IF THAT
                  PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES),
                  SUCH AS, BUT NOT LIMITED TO, LOSS OF REVENUE, PROFITS OR
                  BUSINESS, COSTS OF DELAY, COSTS OF LOST OR DAMAGED DATA OR
                  DOCUMENTATION, OR LIABILITIES TO THIRD PARTIES ARISING FROM
                  ANY SOURCE; COST OF PROCUREMENT OF SUBSTITUTE GOODS,
                  TECHNOLOGY OR SERVICES, OR (II) ANY AMOUNTS IN EXCESS, IN THE
                  AGGREGATE, OF THE FEES PAID OR PAYABLE TO GARRIO HEREUNDER
                  DURING THE SIX MONTH PERIOD IMMEDIATELY PRIOR TO THE DATE THE
                  CAUSE OF ACTION AROSE.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="termination-effects" className="border rounded-lg px-4">
            <AccordionTrigger className="py-4">
              <h2 className="text-xl font-semibold text-left">
                14. Termination and effects
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p>
                  14.1. Garrio may terminate this Agreement, without cause, upon
                  providing Customer with thirty (30) days prior written notice.
                  Notwithstanding the foregoing, Garrio reserves the right to
                  fully or partially discontinue, at any time and from time to
                  time, temporarily or permanently, any free, trial, or beta
                  versions with or without notice.
                </p>
                <p>
                  14.2. Upon expiration or termination of this Agreement, all
                  licenses granted to the Garrio Services and the Documentation
                  shall expire. Garrio shall discontinue the provision of the
                  Garrio Services, and Customer shall immediately pay any
                  outstanding invoices for services rendered through the date of
                  termination.
                </p>
                <p>
                  14.3. Any provision of this Agreement that contemplates
                  performance or observance subsequent to any termination or
                  expiration of this Agreement, including, without limitation,
                  all provisions with respect to Intellectual Property,
                  limitation of liabilities, indemnification, governing law and
                  arbitration shall survive any termination or expiration of
                  this Agreement and continue in full force and effect in
                  perpetuity.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="general-terms" className="border rounded-lg px-4">
            <AccordionTrigger className="py-4">
              <h2 className="text-xl font-semibold text-left">
                15. General terms
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p>
                  15.1. In accordance with the Digital Millennium Copyright Act
                  (the DMCA), as it relates to online service providers, Garrio,
                  reserves the right to delete or disable digital content a
                  third party alleges to be infringing, and to terminate the
                  accounts of repeat alleged infringers. To review our complete
                  Copyright Dispute Policy and learn how to report potentially
                  infringing content, visit{' '}
                  <Link href="/dmca">garr.io/dmca</Link>. To learn more about
                  the DMCA, visit{' '}
                  <Link href="https://copyright.gov/legislation/dmca.pdf">
                    copyright.gov/legislation/dmca.pdf
                  </Link>
                  .
                </p>
                <p>
                  15.2. The Garrio Services and Garrio Proprietary Materials are
                  subject to the trade laws and regulations of the United States
                  and other countries, including the Export Administration
                  Regulations (EAR, 15 CFR Part 730 et seq.) and the sanctions
                  programs administered by the Office of Foreign Assets Control
                  (OFAC, 31 CFR Part 500). Customer agrees that it will not
                  import, export, re-export, transfer or otherwise use the
                  Garrio Platform or Garrio Proprietary Materials in violation
                  of these laws and regulations, including by engaging in any
                  unauthorized dealing involving (i) a U.S. embargoed country
                  (currently Cuba, Iran, North Korea, Sudan and Syria), (ii) a
                  party included on any restricted person list, such as the OFAC
                  Specially Designated Nationals List, or the Commerce
                  Department’s Denied Persons List or Entity List, or (iii) the
                  design, development, manufacture, or production of nuclear,
                  missile, or chemical or biological weapons. By using the
                  Garrio Platform and Garrio Proprietary Materials, Customer
                  represents and warrants that Customer is not located in any
                  such country or on any such list. Customer will not engage in
                  activity that would cause Garrio to be violation of these laws
                  and regulations, and will indemnify Garrio for any fines,
                  penalties or other liabilities incurred by Garrio for
                  Customer's failure to comply with this provision.
                </p>
                <p>
                  15.3. The Parties shall perform all of their duties under this
                  Agreement as independent contractors, and nothing in this
                  Agreement shall be construed to give either Party the power to
                  direct or control the activities of the other Party, or to
                  constitute the Parties as principal and agent, employer and
                  employee, franchiser and franchisee, partners, joint
                  venturers, co-owners, or otherwise as participants in a joint
                  undertaking. The Parties understand and agree that neither
                  Party grants the other Party the power or authority to make or
                  give any agreement, statement, representation, warranty, or
                  other commitment on behalf of the other Party, or to enter
                  into any contract or otherwise incur any liability or
                  obligation, express or implied, on behalf of the other Party,
                  or to transfer, release, or waive any right, title or interest
                  of such other Party.
                </p>
                <p>
                  15.4. Neither this Agreement nor any rights hereunder may be
                  transferred or assigned by either party without the prior
                  written consent of the other party, which consent shall not be
                  unreasonably withheld or delayed. Notwithstanding the
                  foregoing, Garrio may assign or transfer this Agreement or any
                  rights or obligations hereunder without Customer’s consent to
                  a third party acquirer of all, or substantially all, of the
                  assets or business of Garrio, whether by sale, merger, or
                  otherwise. Except as provided in this section, any attempts by
                  either party to assign any of its rights or delegate any of
                  its duties hereunder without the prior written consent of the
                  other party shall be null and void.
                </p>
                <p>
                  15.5. Neither party hereto shall be responsible for any
                  failure to perform its obligations under this Agreement if
                  such failure is caused by acts of God, natural disasters, war,
                  acts of terrorism, strikes, revolutions, lack or failure of
                  third party infrastructure, lack or failure of public or
                  private utilities, laws or governmental regulations (including
                  legislation that makes performance herein impossible,
                  impractical, or economically unreasonable) or any other causes
                  that are beyond the reasonable control of such party.
                  Obligations hereunder, however, shall in no event be excused
                  but shall be suspended only until the cessation of any cause
                  of such failure. In the event that such force majeure should
                  obstruct performance of this Agreement for more than ten (10)
                  days, the parties hereto shall consult with each other to
                  determine whether this Agreement should be modified or
                  terminated.
                </p>
                <p>
                  15.6. This Agreement shall be governed by and construed under
                  the laws of the State of California and the United States
                  without regard to conflicts of laws provisions thereof and
                  without regard to the United Nations Convention on Contracts
                  for the International Sale of Goods, and the parties consent
                  to exclusive jurisdiction and venue of the State or Federal
                  Courts located in San Francisco County, California. Any
                  dispute arising from or relating to the subject matter of this
                  Agreement that cannot be resolved thereby within a period of
                  30 days after written notice of a dispute has been given by
                  one party hereunder to the other, shall be finally settled by
                  arbitration in San Francisco, California, using the English
                  language in accordance with the Arbitration Rules and
                  Procedures of JAMS/Endispute (“JAMS”) then in effect, by an
                  arbitrator with substantial experience in resolving complex
                  commercial contract disputes, who will be chosen from the
                  appropriate list of JAMS arbitrators. If the parties cannot
                  agree upon the identity of an arbitrator within 15 days
                  following the arbitration date, then an arbitrator shall be
                  selected on an expedited basis in accordance with the
                  Arbitration Rules and Procedures of JAMS. The arbitrator shall
                  have the authority to grant specific performance and to
                  allocate between the parties the costs of arbitration
                  (including service fees, arbitrator fees and all other fees
                  related to the arbitration) in such equitable manner as the
                  arbitrator may determine. The prevailing party in the
                  arbitration shall be entitled to receive reimbursement of its
                  reasonable expenses (including reasonable attorneys’ fees,
                  expert witness fees and all other expenses) incurred in
                  connection therewith. Judgment upon the award so rendered may
                  be entered in a court having jurisdiction or application may
                  be made to such court for judicial acceptance of any award and
                  an order of enforcement, as the case may be. Notwithstanding
                  the foregoing, each party shall have the right to institute an
                  action in a court of proper jurisdiction for preliminary
                  injunctive relief pending a final decision by the arbitrator,
                  provided that a permanent injunction and damages shall only be
                  awarded by the arbitrator.
                </p>
                <p>
                  15.7. This Agreement, and any other references, appendices,
                  exhibits or attachments, constitutes the entire agreement
                  between the parties with respect to the subject matter hereof
                  and supersedes any and all written or oral prior agreements
                  and understandings between the parties concerning such subject
                  matter. No modification, amendment, or waiver of any provision
                  of this Agreement shall be effective unless in writing and
                  either signed or accepted electronically by the party against
                  whom the modification, amendment, or waiver is to be asserted.
                  Additionally, terms, provisions or conditions on any purchase
                  order, acknowledgement, or other business form or writing
                  (aside from an Order Form) that Customer may provide to Garrio
                  or use in connection with the procurement of Garrio Services
                  will have no effect on the rights, duties or obligations of
                  the parties hereunder, regardless of any failure of Garrio to
                  object to such terms, provisions or conditions. In the event
                  of any conflict or inconsistency among the following
                  documents, the order of preference shall be: (1) the
                  applicable Order Form, (2) this Agreement, (3) pricing per the
                  Garrio website (
                  <Link href="https://web.garr.io/pricing">
                    garr.io/pricing
                  </Link>
                  ). In the event that any provision of this Agreement shall be
                  determined to be illegal or unenforceable, a modified
                  provision shall be substituted which carries out as nearly as
                  possible the original intent of the parties, and the validity,
                  legality and enforceability of any of the remaining provisions
                  shall not in any way be affected or impaired thereby.
                </p>
                <p>
                  15.8. The waiver by either Party of a breach of any provision
                  contained herein shall be in writing and shall in no way be
                  construed as a waiver of any subsequent breach of such
                  provision or the waiver of the provision itself. Failure or
                  delay by either party in exercising any right hereunder shall
                  not operate as a waiver of such right.
                </p>
                <p>
                  15.9. Any notice required or permitted to be given hereunder
                  will be deemed to have been delivered and given for all
                  purposes: (i) on the delivery date, if delivered by hand
                  courier to the Party to whom such notice is directed; (ii) two
                  (2) Business Days after deposit with a commercial overnight
                  carrier; (iii) five (5) Business Days when mailed by United
                  States mail; (iv) upon completion of transmission, if sent via
                  facsimile with a confirmation of successful transmission; and
                  (v) the first business day after sending by email (provided
                  email shall not be sufficient for notices of an indemnifiable
                  claim). Suspension-related notices to Customer shall be sent
                  to the account holder designated in the Garrio Dashboard.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
          </div>
        </div>
      </main>
      <CoreFooter />
    </>
  );
}

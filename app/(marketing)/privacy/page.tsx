import {
  LegalLayout,
  LegalHeader,
  LegalContent,
  LegalSection,
  LegalParagraph,
  LegalList,
} from "@/components/ui/legal";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout>
      <LegalHeader title="Privacy" highlight="Policy" date="June 2026" />
      <LegalContent>
        <LegalSection title="1. Introduction">
          <LegalParagraph>
            Welcome to ZeroAxiis ("ZeroAxiis", "we", "our", or "us").
          </LegalParagraph>
          <LegalParagraph>
            We are a technology company focused on software development, open-source initiatives, digital products, research, innovation, and educational content.
          </LegalParagraph>
          <LegalParagraph>
            This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, interact with our content, or contact us through our forms and communication channels.
          </LegalParagraph>
          <LegalParagraph>
            By using our website, you agree to the practices described in this Privacy Policy.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="2. Information We Collect">
          <h3 className="text-xl text-bone font-display tracking-tight mb-4 mt-6">Information You Voluntarily Provide</h3>
          <LegalParagraph>
            We may collect information that you voluntarily submit to us through:
          </LegalParagraph>
          <LegalList
            items={[
              "Hire Us forms",
              "Contact forms",
              "Partnership inquiries",
              "Business inquiries",
              "Email communications",
            ]}
          />
          <LegalParagraph className="mt-4">
            This information may include:
          </LegalParagraph>
          <LegalList
            items={[
              "Full name",
              "Email address",
              "Company or organization name",
              "Project details",
              "Business requirements",
              "Budget information (if provided)",
              "Timeline information (if provided)",
              "Any additional information you choose to share",
            ]}
          />

          <h3 className="text-xl text-bone font-display tracking-tight mb-4 mt-6">Technical Information</h3>
          <LegalParagraph>
            When you access our website, certain technical information may be collected automatically by our hosting providers, security systems, or analytics tools, including:
          </LegalParagraph>
          <LegalList
            items={[
              "IP address",
              "Browser type and version",
              "Device type",
              "Operating system",
              "Pages visited",
              "Referral sources",
              "Date and time of access",
              "General location information derived from IP addresses",
            ]}
          />
        </LegalSection>

        <LegalSection title="3. How We Use Information">
          <LegalParagraph>We may use collected information to:</LegalParagraph>
          <LegalList
            items={[
              "Respond to inquiries and requests",
              "Evaluate project opportunities",
              "Communicate with prospective clients and partners",
              "Provide information about our services",
              "Improve website performance and usability",
              "Monitor website security and prevent abuse",
              "Maintain operational and technical functionality",
              "Comply with legal obligations",
            ]}
          />
          <LegalParagraph className="mt-4">
            We do not sell personal information.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="4. Project and Business Inquiries">
          <LegalParagraph>
            Information submitted through our Hire Us page or other inquiry forms is used solely for evaluating and responding to business opportunities, partnerships, collaborations, or service requests.
          </LegalParagraph>
          <LegalParagraph>Submitting an inquiry:</LegalParagraph>
          <LegalList
            items={[
              "Does not create a client relationship",
              "Does not guarantee project acceptance",
              "Does not create any contractual obligation",
              "Does not guarantee a response within a specific timeframe",
            ]}
          />
          <LegalParagraph className="mt-4">
            Formal engagements require separate written agreements.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="5. Cookies and Similar Technologies">
          <LegalParagraph>
            Our website may use cookies and similar technologies to:
          </LegalParagraph>
          <LegalList
            items={[
              "Ensure website functionality",
              "Improve performance",
              "Analyze website traffic",
              "Enhance user experience",
            ]}
          />
          <LegalParagraph className="mt-4">
            You may control cookie preferences through your browser settings.
          </LegalParagraph>
          <LegalParagraph>
            Disabling certain cookies may affect website functionality.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="6. Third-Party Services">
          <LegalParagraph>
            We may rely on third-party providers for:
          </LegalParagraph>
          <LegalList
            items={[
              "Website hosting",
              "Security services",
              "Analytics",
              "Infrastructure management",
              "Communication services",
            ]}
          />
          <LegalParagraph className="mt-4">
            These providers may process limited information necessary to perform their services on our behalf.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="7. Open Source Activities">
          <LegalParagraph>
            ZeroAxiis actively participates in open-source development.
          </LegalParagraph>
          <LegalParagraph>
            Information you voluntarily submit through public repositories, issue trackers, discussions, pull requests, or community platforms may become publicly accessible.
          </LegalParagraph>
          <LegalParagraph>
            We encourage contributors to avoid sharing confidential, sensitive, or personal information through public channels.
          </LegalParagraph>
          <LegalParagraph>
            Third-party platforms such as GitHub operate under their own privacy policies and terms.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="8. Data Retention">
          <LegalParagraph>
            We retain information only for as long as reasonably necessary to:
          </LegalParagraph>
          <LegalList
            items={[
              "Respond to inquiries",
              "Maintain business records",
              "Meet legal obligations",
              "Resolve disputes",
              "Protect our rights and interests",
            ]}
          />
          <LegalParagraph className="mt-4">
            Information that is no longer required may be deleted, anonymized, or archived.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="9. Data Security">
          <LegalParagraph>
            We implement reasonable administrative, technical, and organizational safeguards designed to protect information from:
          </LegalParagraph>
          <LegalList
            items={[
              "Unauthorized access",
              "Disclosure",
              "Loss",
              "Misuse",
              "Alteration",
            ]}
          />
          <LegalParagraph className="mt-4">
            However, no method of transmission or storage can be guaranteed to be completely secure.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="10. Children's Privacy">
          <LegalParagraph>
            Our website is not directed toward children under the age of 13.
          </LegalParagraph>
          <LegalParagraph>
            We do not knowingly collect personal information from children.
          </LegalParagraph>
          <LegalParagraph>
            If we become aware that information has been collected from a child without appropriate consent, we will take reasonable steps to remove it.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="11. Your Rights">
          <LegalParagraph>
            Depending on applicable laws, you may have rights regarding your personal information, including:
          </LegalParagraph>
          <LegalList
            items={[
              "Access",
              "Correction",
              "Deletion",
              "Restriction of processing",
              "Objection to processing",
            ]}
          />
          <LegalParagraph className="mt-4">
            Requests may be submitted through our contact channels.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="12. International Access">
          <LegalParagraph>
            Our website may be accessed from countries around the world.
          </LegalParagraph>
          <LegalParagraph>
            By using our website, you understand that information may be processed in jurisdictions different from your own.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="13. Changes to This Policy">
          <LegalParagraph>
            We may update this Privacy Policy from time to time.
          </LegalParagraph>
          <LegalParagraph>
            Any updates will be reflected by revising the "Last Updated" date at the top of this page.
          </LegalParagraph>
          <LegalParagraph>
            Continued use of our website after updates constitutes acceptance of the revised policy.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="14. Contact Us">
          <LegalParagraph>For privacy-related inquiries, contact:</LegalParagraph>
          <LegalParagraph>
            ZeroAxiis<br />
            Email: <a href="mailto:zeroaxiis.support@gmail.com" className="text-accent hover:underline">zeroaxiis.support@gmail.com</a>
          </LegalParagraph>
        </LegalSection>
      </LegalContent>
    </LegalLayout>
  );
}

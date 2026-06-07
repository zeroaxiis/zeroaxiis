import {
  LegalLayout,
  LegalHeader,
  LegalContent,
  LegalSection,
  LegalParagraph,
  LegalList,
} from "@/components/ui/legal";

export const metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalLayout>
      <LegalHeader title="Terms and" highlight="Conditions" date="June 2026" />
      <LegalContent>
        <LegalSection title="1. Acceptance of Terms">
          <LegalParagraph>
            By accessing or using the ZeroAxiis website, you agree to comply with and be bound by these Terms & Conditions.
          </LegalParagraph>
          <LegalParagraph>
            If you do not agree with these terms, please discontinue use of the website.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="2. About ZeroAxiis">
          <LegalParagraph>
            ZeroAxiis is a technology company focused on:
          </LegalParagraph>
          <LegalList
            items={[
              "Software development",
              "Digital products",
              "Open-source initiatives",
              "Research and innovation",
              "Educational content",
              "Technology-driven projects",
            ]}
          />
          <LegalParagraph className="mt-4">
            The website is intended to provide information about our company, services, projects, initiatives, and content.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="3. Permitted Use">
          <LegalParagraph>
            You may use the website for lawful purposes only.
          </LegalParagraph>
          <LegalParagraph>
            You agree not to:
          </LegalParagraph>
          <LegalList
            items={[
              "Violate applicable laws or regulations",
              "Attempt unauthorized access to systems or infrastructure",
              "Interfere with website functionality",
              "Distribute malware or malicious software",
              "Abuse website resources",
              "Misrepresent your affiliation with ZeroAxiis",
              "Use the website in a manner that could damage our reputation or operations",
            ]}
          />
        </LegalSection>

        <LegalSection title="4. Intellectual Property">
          <LegalParagraph>
            Unless otherwise stated, all website content including:
          </LegalParagraph>
          <LegalList
            items={[
              "Branding",
              "Logos",
              "Visual identity",
              "Design elements",
              "Text",
              "Graphics",
              "Documentation",
              "Original materials",
            ]}
          />
          <LegalParagraph className="mt-4">
            is owned by ZeroAxiis and protected under applicable intellectual property laws.
          </LegalParagraph>
          <LegalParagraph>
            No content may be copied, modified, distributed, or reproduced without permission unless expressly permitted.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="5. Open Source Projects">
          <LegalParagraph>
            Certain ZeroAxiis projects may be distributed under open-source licenses.
          </LegalParagraph>
          <LegalParagraph>
            Such projects remain governed by their respective licenses, which take precedence where applicable.
          </LegalParagraph>
          <LegalParagraph>
            Open-source licenses do not grant rights to use ZeroAxiis trademarks, branding, logos, or proprietary materials unless explicitly stated.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="6. Project Inquiries and Service Requests">
          <LegalParagraph>
            Visitors may submit project inquiries, partnership requests, or service inquiries through our website.
          </LegalParagraph>
          <LegalParagraph>
            Submission of an inquiry:
          </LegalParagraph>
          <LegalList
            items={[
              "Does not create a client relationship",
              "Does not guarantee project acceptance",
              "Does not create contractual obligations",
              "Does not guarantee future engagement",
            ]}
          />
          <LegalParagraph className="mt-4">
            Any formal business relationship will be governed by separate written agreements.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="7. External Links">
          <LegalParagraph>
            Our website may contain links to third-party websites, services, or resources.
          </LegalParagraph>
          <LegalParagraph>
            ZeroAxiis is not responsible for the content, privacy practices, availability, or security of third-party services.
          </LegalParagraph>
          <LegalParagraph>
            Accessing third-party websites is done at your own risk.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="8. Disclaimer of Warranties">
          <LegalParagraph>
            The website and all content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
          </LegalParagraph>
          <LegalParagraph>
            To the fullest extent permitted by law, ZeroAxiis disclaims all warranties, whether express or implied, including warranties of:
          </LegalParagraph>
          <LegalList
            items={[
              "Accuracy",
              "Reliability",
              "Availability",
              "Fitness for a particular purpose",
              "Non-infringement",
            ]}
          />
          <LegalParagraph className="mt-4">
            We do not guarantee uninterrupted access or error-free operation.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="9. Limitation of Liability">
          <LegalParagraph>
            To the maximum extent permitted by law, ZeroAxiis shall not be liable for any:
          </LegalParagraph>
          <LegalList
            items={[
              "Indirect damages",
              "Consequential damages",
              "Special damages",
              "Incidental damages",
              "Business interruption",
              "Loss of data",
              "Loss of profits",
            ]}
          />
          <LegalParagraph className="mt-4">
            arising from the use of or inability to use the website.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="10. Website Modifications">
          <LegalParagraph>
            We reserve the right to modify, suspend, restrict, or discontinue any portion of the website at any time without prior notice.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="11. Termination">
          <LegalParagraph>
            We may restrict or terminate access to the website if we believe a user has violated these Terms or engaged in unlawful, abusive, or harmful conduct.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="12. Governing Law">
          <LegalParagraph>
            These Terms & Conditions shall be governed and interpreted in accordance with the laws of India.
          </LegalParagraph>
          <LegalParagraph>
            Any disputes arising from these Terms shall be subject to the jurisdiction of the competent courts of India.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="13. Changes to These Terms">
          <LegalParagraph>
            We may update these Terms & Conditions from time to time.
          </LegalParagraph>
          <LegalParagraph>
            Continued use of the website following updates constitutes acceptance of the revised Terms.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="14. Contact">
          <LegalParagraph>For legal or general inquiries:</LegalParagraph>
          <LegalParagraph>
            ZeroAxiis<br />
            Email: <a href="mailto:zeroaxiis.support@gmail.com" className="text-accent hover:underline">zeroaxiis.support@gmail.com</a>
          </LegalParagraph>
        </LegalSection>
      </LegalContent>
    </LegalLayout>
  );
}

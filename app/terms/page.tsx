import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { BRAND_NAME, LEGAL_NAME, EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms and conditions that govern your use of the ${BRAND_NAME} website and services.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service | ${BRAND_NAME}`,
    description: `The terms and conditions that govern your use of ${BRAND_NAME}.`,
    url: "/terms",
    type: "website",
  },
};

const UPDATED = "June 18, 2026";

export default function TermsPage() {
  return (
    <LegalShell eyebrow="Legal" title="Terms of Service" updated={UPDATED}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
        website and services of {BRAND_NAME}, operated by {LEGAL_NAME}
        (&ldquo;{BRAND_NAME},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        By accessing our website or engaging our services, you agree to these Terms. If
        you do not agree, please do not use the site.
      </p>

      <h2>Use of our website</h2>
      <p>
        You may use this website for lawful, personal, non-commercial purposes. You
        agree not to misuse the site—including attempting to gain unauthorized access,
        interfering with its operation, scraping content, or using it in any way that
        could damage or impair the site or other users&apos; use of it.
      </p>

      <h2>Consultations, quotes & estimates</h2>
      <p>
        Requesting a consultation does not create a binding contract. Any pricing,
        measurements, or estimates we provide are based on the information available at
        the time and may change after an in-home assessment. A project is confirmed only
        once both parties agree to a written quote or order.
      </p>

      <h2>Products & services</h2>
      <p>
        We make every effort to describe our products and services accurately. Colors,
        fabrics, finishes, and specifications shown on the website are representative and
        may vary from the finished product. Custom products are made to the
        measurements and selections confirmed at the time of order.
      </p>

      <h2>Warranties</h2>
      <p>
        Warranty coverage, where offered, is described in your written quote, order, or
        accompanying manufacturer documentation. Except as expressly stated there, the
        website and its content are provided &ldquo;as is&rdquo; without warranties of any
        kind, to the fullest extent permitted by law.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this website—including text, images, graphics, logos, and
        design—is owned by or licensed to {LEGAL_NAME} and is protected by intellectual
        property laws. You may not reproduce, distribute, or create derivative works from
        it without our prior written permission.
      </p>

      <h2>Third-party links</h2>
      <p>
        Our website may contain links to third-party websites or services that we do not
        control. We are not responsible for the content, policies, or practices of those
        third parties.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {LEGAL_NAME} will not be liable for any
        indirect, incidental, special, or consequential damages arising out of or related
        to your use of the website. Nothing in these Terms limits liability that cannot
        be limited under applicable law.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Florida, without regard to
        its conflict-of-laws rules. Any disputes will be subject to the exclusive
        jurisdiction of the state and federal courts located in Florida.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date above
        reflects the most recent revision, and your continued use of the website after
        changes are posted constitutes acceptance of the updated Terms.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these Terms? Reach us at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or{" "}
        <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>.
      </p>
    </LegalShell>
  );
}

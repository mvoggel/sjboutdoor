import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { BRAND_NAME, LEGAL_NAME, EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND_NAME} collects, uses, and protects the personal information you share with us.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${BRAND_NAME}`,
    description: `How ${BRAND_NAME} collects, uses, and protects your personal information.`,
    url: "/privacy",
    type: "website",
  },
};

const UPDATED = "June 18, 2026";

export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="Legal" title="Privacy Policy" updated={UPDATED}>
      <p>
        {BRAND_NAME} (&ldquo;{BRAND_NAME},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;), operated by {LEGAL_NAME}, respects your privacy. This
        Privacy Policy explains what information we collect when you visit our
        website or contact us, how we use it, and the choices you have. By using
        our site or services, you agree to the practices described here.
      </p>

      <h2>Information we collect</h2>
      <p>We collect information you provide directly and information collected automatically as you use the site.</p>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you request a consultation,
          submit a form, start a chat, call, or email us, we may collect your name,
          phone number, email address, home or project address, and any details you
          share about your project.
        </li>
        <li>
          <strong>Information collected automatically.</strong> Like most websites,
          we automatically collect technical data such as your IP address, browser
          and device type, pages viewed, and referring pages, through cookies and
          similar technologies (including analytics tools such as Google Analytics).
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your inquiries and schedule and perform consultations.</li>
        <li>To prepare quotes, fulfill orders, and provide installation and warranty service.</li>
        <li>To improve our website, products, and customer experience.</li>
        <li>
          To send you updates, appointment reminders, and—where you have opted in—
          marketing communications. You can opt out of marketing at any time.
        </li>
        <li>To comply with legal obligations and protect our rights.</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        We do <strong>not</strong> sell your personal information. We may share it with
        trusted service providers who help us operate our business—such as
        scheduling, customer-relationship, hosting, communications, and analytics
        providers—who are permitted to use it only to provide services to us. We may
        also disclose information when required by law or to protect the safety,
        rights, or property of our customers, the public, or our company.
      </p>

      <h2>Cookies & analytics</h2>
      <p>
        We use cookies and analytics services (such as Google Analytics) to understand
        how visitors use our site so we can improve it. You can control cookies through
        your browser settings; disabling them may affect some site features. To learn
        about Google&apos;s practices and opt-out options, visit Google&apos;s privacy and
        ads pages.
      </p>

      <h2>Data retention & security</h2>
      <p>
        We keep personal information only as long as needed for the purposes described
        above or as required by law. We use reasonable administrative, technical, and
        physical safeguards to protect your information, though no method of
        transmission or storage is completely secure.
      </p>

      <h2>Your choices</h2>
      <p>
        You may request to access, correct, or delete the personal information we hold
        about you, or ask us to stop sending marketing messages, by contacting us using
        the details below. We will respond consistent with applicable law.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Our website is not directed to children under 13, and we do not knowingly
        collect personal information from them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise
        the &ldquo;Last updated&rdquo; date above. Material changes will be posted on this page.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy or your information? Reach us at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or{" "}
        <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>.
      </p>
    </LegalShell>
  );
}

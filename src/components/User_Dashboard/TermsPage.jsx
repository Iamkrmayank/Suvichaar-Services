import React from "react";
import { FileText } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] px-4 py-2">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl w-full border border-gray-300 flex flex-col">
        {/* Heading */}
        <div className="flex items-center justify-center mb-4">
          <FileText className="h-7 w-7 text-[#E6A24B] mr-2" />
          <h1 className="text-2xl font-bold text-[#E6A24B] text-center">
            ContentLabs – Terms & Conditions
          </h1>
        </div>

        <div className="text-center  mb-6">
          <p><strong>Effective Date:</strong> September 18, 2025</p>
          <p><strong>Last Updated:</strong> September 18, 2025</p>
        </div>
        {/* Dates */}
        {/* <div className="py-5">
          <p><strong>Last Updated:</strong> September 18, 2025</p>
          <p><strong>Effective Date:</strong> September 18, 2025</p>

        </div> */}

        {/* Scrollable Terms Content */}
        <div className="leading-relaxed space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-3">
          <p>
            Welcome to ContentLabs ("we," "our," "us"). By creating an account,
            logging in, or using our software platform ("Service"), you agree to
            the following Terms and Conditions ("Terms"). Please read them carefully
            before using the Service.
          </p>

          <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these
            Terms, along with our Privacy Policy. If you do not agree, you must
            not access or use the Service.
          </p>

          <h2 className="text-lg font-semibold">2. Eligibility</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must be at least 18 years old or have the consent of a parent/guardian to use the Service.</li>
            <li>You must provide accurate information when creating an account.</li>
          </ul>

          <h2 className="text-lg font-semibold">3. Description of Services</h2>
          <p>
            ContentLabs provides access to a variety of tools, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>AI-powered content and productivity tools</li>
            <li>Optical Character Recognition (OCR)</li>
            <li>Quiz generator</li>
            <li>Story generator</li>
            <li>YouTube automation and scheduling</li>
            <li>Other automation and creative tools</li>
          </ul>
          <p>You are solely responsible for all content you create, generate, upload, or distribute using our platform.</p>

          <h2 className="text-lg font-semibold">4. User Responsibilities</h2>
          <p>When using the Service, you agree that you will NOT:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the tools for unlawful, harmful, or fraudulent purposes.</li>
            <li>Upload, share, or generate content that is illegal, offensive, defamatory, or infringes on third-party rights.</li>
            <li>Attempt to reverse engineer, hack, or disrupt the Service.</li>
            <li>Misuse automation tools (e.g., spamming, violating YouTube/third-party platform policies).</li>
            <li>Share your account credentials with others or impersonate another person.</li>
          </ul>
          <p>You are solely responsible for all content you create, generate, upload, or distribute using our platform.</p>

          <h2 className="text-lg font-semibold">5. Intellectual Property</h2>
          <p>
            All software, features, design, and content remain our property or that of our licensors.
            You retain ownership of your generated content but grant us a limited license to store, process, and display it for Service functionality.
            You are responsible for ensuring that any content generated using the Service complies with applicable laws and third-party rights.
          </p>

          <h2 className="text-lg font-semibold">6. Third-Party Integrations</h2>
          <p>
            Some tools (e.g., YouTube automation) integrate with third-party services. By using these tools, you also agree to comply with the terms of those platforms (e.g., YouTube API Terms, Google policies). We are not responsible for third-party platform restrictions or actions taken against your account.
          </p>

          <h2 className="text-lg font-semibold">7. Payment & Subscriptions</h2>
          <p>
            Some features may require paid subscriptions or usage fees. Payments are
            non-refundable unless otherwise stated. Pricing and plans may change with
            prior notice.
          </p>

          <h2 className="text-lg font-semibold">8. Limitation of Liability</h2>
          <p>
            We provide the Service on an "as-is" and "as-available" basis. We make no
            guarantees regarding accuracy, reliability, uptime, or suitability for your
            intended purpose. To the maximum extent permitted by law, ContentLabs is
            not liable for indirect, incidental, or consequential damages resulting from
            your use of the Service.
          </p>

          <h2 className="text-lg font-semibold">9. Termination</h2>
          <p>We may suspend or terminate your account immediately if you:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Violate these Terms</li>
            <li>Misuse the Service or harm other users</li>
            <li>Fail to comply with applicable laws or third-party platform rules</li>
          </ul>
          <p>Upon termination, your right to use the Service will cease immediately.</p>

          <h2 className="text-lg font-semibold">10. Modifications to Terms</h2>
          <p>
            We may update these Terms from time to time. The updated version will be posted at{" "}
            <a
              href="https://contentlabs.suvichaar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6A24B] underline"
            >
              contentlabs.suvichaar.org
            </a>{" "}
            with a new effective date. Continued use of the Service constitutes acceptance of the updated Terms.
          </p>

          <h2 className="text-lg font-semibold">11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Disputes will be
            resolved in the courts of [Insert City, India].
          </p>

          <h2 className="text-lg font-semibold">12. Contact Us</h2>
          <p>
            If you have questions about these Terms, contact us at:
            <br />
            <br />
            📧 Email: contentlabs@suvichaar.org <br />
            🌐 Website:{" "}
            <a
              href="https://contentlabs.suvichaar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6A24B] underline"
            >
              contentlabs.suvichaar.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;


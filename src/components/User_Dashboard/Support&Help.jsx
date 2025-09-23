import React from "react";
import { LifeBuoy, Mail, MessageCircle, Search } from "lucide-react";

const SupportPage = () => {
  return (
    <div className="min-h-screen  px-4 py-4 flex justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B]">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <LifeBuoy className="h-8 w-8 text-[#E6A24B] mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Support & Help</h1>
          <p className="text-gray-600 mt-2 text-sm max-w-lg">
            Need assistance? Explore our FAQs, search for help topics, or reach
            out to our support team. We're here to help you!
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#E6A24B] focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="font-medium">🔑 How do I reset my password?</p>
              <p className="ml-5 text-gray-600">
                Go to the login page and click on <strong>"Forgot Password"</strong>.
                You’ll receive an email with a reset link.
              </p>
            </div>
            <div>
              <p className="font-medium">
                📧 I didn’t receive a verification email. What should I do?
              </p>
              <p className="ml-5 text-gray-600">
                Check your spam or junk folder. If not found, request a new
                verification email from your account settings.
              </p>
            </div>
            <div>
              <p className="font-medium">💳 How can I update my billing information?</p>
              <p className="ml-5 text-gray-600">
                Navigate to <strong>Settings → Billing</strong> to update your
                payment method or view invoices.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email Card */}
          <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 flex flex-col items-center text-center">
            <Mail className="h-7 w-7 text-[#E6A24B] mb-2" />
            <h3 className="font-semibold text-gray-800 text-base">Email Support</h3>
            <p className="text-xs text-gray-600 mt-1 mb-2">
              Send us an email and we’ll get back to you within 24 hours.
            </p>
            <a
              href="mailto:support@contentlabs.com"
              className="text-[#E6A24B] text-sm font-medium hover:underline"
            >
              support@contentlabs.com
            </a>
          </div>

          {/* Live Chat Card */}
          <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 flex flex-col items-center text-center">
            <MessageCircle className="h-7 w-7 text-[#E6A24B] mb-2" />
            <h3 className="font-semibold text-gray-800 text-base">Live Chat</h3>
            <p className="text-xs text-gray-600 mt-1 mb-2">
              Need quick help? Start a chat with one of our support agents.
            </p>
            <button className="bg-[#E6A24B] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[#d68d32] transition">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

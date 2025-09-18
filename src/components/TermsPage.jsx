// import React from "react";
// import { FileText } from "lucide-react";

// const TermsPage = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full border border-gray-300">
//         <div className="flex items-center justify-center mb-6">
//           <FileText className="h-8 w-8 text-[#E6A24B] mr-2" />
//           <h1 className="text-3xl font-bold text-center text-[#E6A24B]">
//             Terms & Conditions
//           </h1>
//         </div>

//         <div className="text-center text-gray-700 leading-relaxed space-y-4">
//           <p>
//             Welcome to <strong>Content LABS</strong>. By using our platform, you
//             agree to comply with the following Terms & Conditions.
//           </p>

//           <h2 className="text-lg font-semibold mt-4">1. Use of Service</h2>
//           <p>You agree to use Content LABS responsibly and only for lawful purposes.</p>

//           <h2 className="text-lg font-semibold mt-4">2. Privacy Policy</h2>
//           <p>Your personal data is handled in accordance with our Privacy Policy.</p>

//           <h2 className="text-lg font-semibold mt-4">3. Liability</h2>
//           <p>We are not liable for damages arising from misuse of the platform.</p>

//           <h2 className="text-lg font-semibold mt-4">4. Updates</h2>
//           <p>We may update these terms anytime. You’ll be notified of significant changes.</p>

//           <p className="mt-6 italic text-gray-500">
//             This page is for informational purposes only.  
//             To use our platform, you must have already accepted these terms.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsPage;


// import React from "react";
// import { FileText } from "lucide-react";

// const TermsPage = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
//       <div className="bg-white shadow-lg rounded-2xl p-10 max-w-4xl w-full border border-gray-300">
//         {/* Heading */}
//         <div className="flex items-center justify-center mb-8">
//           <FileText className="h-9 w-9 text-[#E6A24B] mr-2" />
//           <h1 className="text-3xl font-bold text-[#E6A24B] text-center">
//             Terms & Conditions
//           </h1>
//         </div>

//         {/* Content */}
//         <div className="text-gray-700 leading-relaxed space-y-6">
//           <p>
//             Welcome to <strong>Content LABS</strong>. These Terms & Conditions
//             govern your access to and use of our platform. By registering for an
//             account or using our services, you agree to comply with and be bound
//             by the following terms.
//           </p>

//           <section>
//             <h2 className="text-xl font-semibold mb-2">1. Use of Services</h2>
//             <p>
//               You agree to use Content LABS in a lawful and responsible manner.
//               Any misuse, including but not limited to unauthorized access,
//               distribution of harmful content, or infringement of intellectual
//               property rights, is strictly prohibited.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-xl font-semibold mb-2">2. Privacy Policy</h2>
//             <p>
//               Your personal information is collected and processed in accordance
//               with our Privacy Policy. By using our services, you consent to the
//               collection and use of your data as described therein.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-xl font-semibold mb-2">3. Limitation of Liability</h2>
//             <p>
//               Content LABS is provided on an "as is" and "as available" basis.
//               We do not guarantee uninterrupted access or error-free operation.
//               We are not liable for any direct, indirect, incidental, or
//               consequential damages arising from your use of the platform.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-xl font-semibold mb-2">4. Updates to Terms</h2>
//             <p>
//               We may revise these Terms & Conditions from time to time. Any
//               significant changes will be communicated to you. Continued use of
//               the platform after updates constitutes your acceptance of the
//               revised terms.
//             </p>
//           </section>

//           <p className="mt-8 italic text-gray-500 text-sm">
//             Note: This page is for reference only. You have already accepted
//             these Terms & Conditions when registering with Content LABS.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsPage;

import React from "react";
import { FileText } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 max-w-2xl w-full border border-gray-300">
        {/* Heading */}
        <div className="flex items-center justify-center mb-6">
          <FileText className="h-7 w-7 text-[#E6A24B] mr-2" />
          <h1 className="text-2xl font-bold text-[#E6A24B] text-center">
            Terms & Conditions
          </h1>
        </div>

        {/* Content */}
        <div className="text-gray-700 leading-relaxed space-y-5 text-sm">
          <p>
            Welcome to <strong>Content LABS</strong>. These Terms & Conditions
            govern your access to and use of our platform. By registering for an
            account or using our services, you agree to comply with and be bound
            by the following terms.
          </p>

          <section>
            <h2 className="text-lg font-semibold mb-1">1. Use of Services</h2>
            <p>
              You agree to use Content LABS in a lawful and responsible manner.
              Any misuse, including unauthorized access, distribution of harmful
              content, or infringement of intellectual property rights, is
              strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">2. Privacy Policy</h2>
            <p>
              Your personal information is collected and processed in accordance
              with our Privacy Policy. By using our services, you consent to the
              collection and use of your data as described therein.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">3. Limitation of Liability</h2>
            <p>
              Content LABS is provided on an "as is" and "as available" basis.
              We do not guarantee uninterrupted access or error-free operation.
              We are not liable for any direct, indirect, incidental, or
              consequential damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">4. Updates to Terms</h2>
            <p>
              We may revise these Terms & Conditions from time to time. Any
              significant changes will be communicated to you. Continued use of
              the platform after updates constitutes your acceptance of the
              revised terms.
            </p>
          </section>

          <p className="mt-6 italic text-gray-500 text-xs">
            Note: This page is for reference only. You have already accepted
            these Terms & Conditions when registering with Content LABS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

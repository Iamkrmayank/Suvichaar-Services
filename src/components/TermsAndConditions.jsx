// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { doc, updateDoc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function TermsAndConditions() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleAccept = async () => {
//     try {
//       setLoading(true);
//       const user = auth.currentUser;

//       if (user) {
//         const userRef = doc(db, "Users", user.uid);
//         await updateDoc(userRef, { acceptedTerms: true });

//         navigate("/dashboard"); // Redirect once accepted
//       }
//     } catch (err) {
//       console.error("Error accepting terms:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDecline = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full border border-gray-300">
//         <h1 className="text-3xl font-bold text-center mb-6 text-[#E6A24B]">
//           Terms & Conditions
//         </h1>
//         <div className="overflow-y-auto max-h-[400px] pr-2 text-gray-700 leading-relaxed">
//           <p className="mb-4">
//             Welcome to <strong>Content LABS</strong>. By using our platform, you
//             agree to comply with and be bound by the following Terms &
//             Conditions. Please read them carefully.
//           </p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">1. Use of Service</h2>
//           <p className="mb-3">
//             You agree to use Content LABS responsibly and only for lawful
//             purposes. Misuse of the platform is strictly prohibited.
//           </p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">2. Privacy Policy</h2>
//           <p className="mb-3">
//             Your personal data is collected and handled in accordance with our
//             Privacy Policy. We ensure the protection of your data and do not
//             share it without consent.
//           </p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">3. Liability</h2>
//           <p className="mb-3">
//             Content LABS is not liable for any damages arising from the use or
//             inability to use the platform.
//           </p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">4. Modifications</h2>
//           <p className="mb-3">
//             We reserve the right to update these terms at any time. Users will
//             be notified of significant changes.
//           </p>

//           <p className="mt-6">
//             By clicking <strong>Accept</strong>, you acknowledge that you have
//             read, understood, and agree to be bound by these Terms &
//             Conditions.
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-8">
//           <button
//             onClick={handleDecline}
//             className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
//           >
//             Decline
//           </button>
//           <button
//             onClick={handleAccept}
//             disabled={loading}
//             className="px-6 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] transition"
//           >
//             {loading ? "Processing..." : "Accept"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TermsAndConditions;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { doc, updateDoc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function TermsAndConditions() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleAccept = async () => {
//     try {
//       setLoading(true);
//       const user = auth.currentUser;
//       if (!user) {
//         navigate("/"); // fallback if no user
//         return;
//       }

//       const userRef = doc(db, "Users", user.uid);
//       await updateDoc(userRef, { acceptedTerms: true });
//       navigate("/dashboard"); // ✅ allow only after accepting
//     } catch (err) {
//       console.error("Error accepting terms:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDecline = async () => {
//     await signOut(auth);
//     navigate("/"); // ✅ send home
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full border border-gray-200">
//         <h1 className="text-3xl font-bold text-center mb-6 text-[#E6A24B]">
//           Terms & Conditions
//         </h1>

//         {/* Scrollable Terms Text */}
//         <div className="overflow-y-auto max-h-[400px] pr-3 text-gray-700 leading-relaxed">
//           <p className="mb-4">
//             Welcome to <strong>Content LABS</strong>. By using our platform, you
//             agree to comply with the following Terms & Conditions.
//           </p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">1. Use of Service</h2>
//           <p>You agree to use Content LABS responsibly and only for lawful purposes.</p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">2. Privacy Policy</h2>
//           <p>Your personal data is handled in accordance with our Privacy Policy.</p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">3. Liability</h2>
//           <p>We are not liable for damages arising from misuse of the platform.</p>

//           <h2 className="text-lg font-semibold mt-4 mb-2">4. Updates</h2>
//           <p>We may update these terms anytime. You’ll be notified of significant changes.</p>

//           <p className="mt-6">
//             By clicking <strong>Accept</strong>, you confirm you agree to these terms.
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
//           <button
//             onClick={handleDecline}
//             className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
//           >
//             Decline
//           </button>
//           <button
//             onClick={handleAccept}
//             disabled={loading}
//             className="px-6 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] transition disabled:opacity-70"
//           >
//             {loading ? "Processing..." : "Accept"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TermsAndConditions;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { doc, updateDoc } from "firebase/firestore";

// const TermsAndConditions = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleAccept = async () => {
//     try {
//       setLoading(true);
//       const user = auth.currentUser;
//       if (!user) return;

//       await updateDoc(doc(db, "Users", user.uid), {
//         acceptedTerms: true,
//       });

//       navigate("/dashboard"); // ✅ go to dashboard after accepting
//     } catch (err) {
//       console.error("Error accepting terms:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
//         <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
//         <div className="h-64 overflow-y-auto border p-4 rounded mb-6 text-gray-700 text-sm">
//           <p>
//             Welcome to ContentLabs! Before using our platform, please read and
//             accept the following terms and conditions.
//           </p>
//           <p className="mt-3">
//             1. You agree not to misuse the platform. <br />
//             2. All content remains the property of its respective owners. <br />
//             3. You are responsible for the activity on your account. <br />
//             4. We may update these terms at any time. <br />
//             5. Continued use of the platform means you agree to the updated
//             terms.
//           </p>
//           <p className="mt-3">
//             By clicking "Accept", you confirm that you have read and agree to
//             these Terms & Conditions.
//           </p>
//         </div>
//         <button
//           onClick={handleAccept}
//           disabled={loading}
//           className="w-full bg-[#E6A24B] text-white py-2 rounded-lg hover:bg-[#d68d32] transition-all duration-300 disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Accept & Continue"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TermsAndConditions;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase_config/config";
import { doc, updateDoc } from "firebase/firestore";
import { ShieldCheck, FileText, AlertCircle } from "lucide-react";
import { getDoc } from "firebase/firestore";
const TermsAndConditions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleAccept = async () => {
  //   try {
  //     setLoading(true);
  //     const user = auth.currentUser;
  //     if (!user) return;

  //     await updateDoc(doc(db, "Users", user.uid), {
  //       acceptedTerms: true,
  //     });

  //     navigate("/dashboard",{ replace: true });
  //   } catch (err) {
  //     console.error("Error accepting terms:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   const handleAccept = async () => {
  //   try {
  //     setLoading(true);
  //     const user = auth.currentUser;
  //     if (!user) return;

  //     const userRef = doc(db, "Users", user.uid);

  //     // ✅ update Firestore
  //     await updateDoc(userRef, { acceptedTerms: true });

  //     // ✅ fetch the updated data to ensure it's written
  //     const snap = await getDoc(userRef);
  //     if (snap.exists() && snap.data().acceptedTerms) {
  //       // now we are sure Firestore has acceptedTerms = true
  //       navigate("/dashboard", { replace: true });
  //     }
  //   } catch (err) {
  //     console.error("Error accepting terms:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAccept = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, "Users", user.uid), {
        acceptedTerms: true,
      });

      // just navigate, let DashboardLayout fetch fresh details
      navigate("/dashboard", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Error accepting terms:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full text-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="h-16 w-16 text-[#E6A24B] mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Please read carefully before continuing
          </p>
        </div>

        {/* Terms Text */}
        <div className="h-72 overflow-y-auto border border-gray-200 p-6 rounded-lg text-gray-700 text-base leading-relaxed shadow-inner text-left">
          <p className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-[#E6A24B] mr-2" />
            Welcome to <span className="font-semibold ml-1">ContentLabs</span>!
            By using our platform, you agree to the following terms:
          </p>

          <ul className="space-y-3 pl-6 list-disc">
            <li>
              <AlertCircle className="inline-block h-5 w-5 text-[#B7D4E9] mr-2" />
              You agree not to misuse the platform.
            </li>
            <li>
              <AlertCircle className="inline-block h-5 w-5 text-[#B7D4E9] mr-2" />
              All content remains the property of its respective owners.
            </li>
            <li>
              <AlertCircle className="inline-block h-5 w-5 text-[#B7D4E9] mr-2" />
              You are responsible for all activity on your account.
            </li>
            <li>
              <AlertCircle className="inline-block h-5 w-5 text-[#B7D4E9] mr-2" />
              We may update these terms at any time.
            </li>
            <li>
              <AlertCircle className="inline-block h-5 w-5 text-[#B7D4E9] mr-2" />
              Continued use of the platform means acceptance of updates.
            </li>
          </ul>

          <p className="mt-6 text-gray-600 text-center">
            By clicking <span className="font-semibold">Accept</span>, you confirm that you have
            read and agree to these Terms & Conditions.
          </p>
        </div>

        {/* Accept Button */}
        <button
          onClick={handleAccept}
          disabled={loading}
          className="mt-8 w-full bg-[#E6A24B] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#d68d32] transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Accept & Continue"}
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
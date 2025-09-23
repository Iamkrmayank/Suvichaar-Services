// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShieldCheck } from "lucide-react";
// import { auth, db } from "../../firebase_config/config";
// import { signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1 = login, 2 = OTP
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const navigate = useNavigate();

//   // Step 1: Admin login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       const userEmail = userCred.user.email;

//       // ✅ Check if email exists in Admins collection
//       const q = query(collection(db, "Admins"), where("email", "==", userEmail));
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         alert("You are not an admin!");
//         return;
//       }

//       // ✅ Get admin phone number
//       const adminData = querySnapshot.docs[0].data();
//       const phoneNumber = adminData.phone;

//       // ✅ Setup invisible reCAPTCHA
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//         size: "invisible",
//       });

//       // ✅ Send OTP
//       const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
//       setConfirmationResult(result);
//       setStep(2);
//       alert("OTP sent to " + phoneNumber);
//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       await confirmationResult.confirm(otp);
//       alert("✅ Admin verified successfully!");
//       navigate("/admin-dashboard");
//     } catch (error) {
//       console.error(error);
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] px-4">
//       <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full border border-gray-300">
//         <div className="flex flex-col items-center mb-6">
//           <ShieldCheck className="w-12 h-12 text-blue-600 mb-2" />
//           <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
//           <p className="text-sm text-gray-500">Secure access for administrators</p>
//         </div>

//         {step === 1 && (
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 placeholder="admin@example.com"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
//             >
//               Login
//             </button>
//             <div id="recaptcha-container"></div>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleVerifyOtp} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 placeholder="Enter 6-digit OTP"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
//             >
//               Verify OTP
//             </button>
//           </form>
//         )}

//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-500">
//             Not an admin?{" "}
//             <a href="/login" className="text-blue-600 hover:underline font-medium">
//               Go to User Login
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShieldCheck } from "lucide-react";
// import { auth, db } from "../../firebase_config/config"; // your firebase config
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState("email"); // "email" → "otp"
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Setup reCAPTCHA once
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible", // invisible reCAPTCHA
//           callback: (response) => {
//             console.log("reCAPTCHA solved ✅");
//           },
//         },
//         auth // IMPORTANT: Pass auth instance
//       );
//     }
//   };

//   // ✅ Step 1: Check if email belongs to an admin
//   const handleCheckAdmin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const q = query(collection(db, "Admins"), where("email", "==", email));
//       const snapshot = await getDocs(q);

//       if (!snapshot.empty) {
//         const adminData = snapshot.docs[0].data();
//         console.log("✅ Admin found:", adminData);

//         // Setup reCAPTCHA
//         setupRecaptcha();
//         const appVerifier = window.recaptchaVerifier;

//         // Send OTP to admin phone
//         const confirmationResult = await signInWithPhoneNumber(
//           auth,
//           adminData.phone,
//           appVerifier
//         );
//         window.confirmationResult = confirmationResult;

//         alert("📩 OTP sent to " + adminData.phone);
//         setStep("otp");
//       } else {
//         alert("❌ This email is not an admin!");
//       }
//     } catch (err) {
//       console.error("Error during admin check:", err);
//       alert("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Step 2: Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await window.confirmationResult.confirm(otp);
//       console.log("✅ Admin authenticated:", result.user);

//       navigate("/admin-dashboard"); // redirect to admin dashboard
//     } catch (err) {
//       console.error("❌ Invalid OTP:", err);
//       alert("Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] px-4">
//       <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full border border-gray-300">
//         {/* Logo + Title */}
//         <div className="flex flex-col items-center mb-6">
//           <ShieldCheck className="w-12 h-12 text-blue-600 mb-2" />
//           <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
//           <p className="text-sm text-gray-500">Secure access with OTP</p>
//         </div>

//         {/* Step 1: Enter Admin Email */}
//         {step === "email" && (
//           <form onSubmit={handleCheckAdmin} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Admin Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 placeholder="admin@example.com"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </form>
//         )}

//         {/* Step 2: Enter OTP */}
//         {step === "otp" && (
//           <form onSubmit={handleVerifyOtp} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 placeholder="Enter OTP"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </form>
//         )}

//         {/* Back to user login */}
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-500">
//             Not an admin?{" "}
//             <a
//               href="/login"
//               className="text-blue-600 hover:underline font-medium"
//             >
//               Go to User Login
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Invisible reCAPTCHA */}
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default AdminLogin;


// import React, { useState } from "react";
// import { auth } from "../../firebase_config/config";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const AdminLogin = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState("phone");

//   // Setup reCAPTCHA
//   // const setupRecaptcha = () => {
//   //   if (!window.recaptchaVerifier) {
//   //     window.recaptchaVerifier = new RecaptchaVerifier(
//   //       "recaptcha-container",
//   //       { size: "invisible" },
//   //       auth
//   //     );
//   //   }
//   // };

//   // Setup reCAPTCHA
// const setupRecaptcha = () => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container", // 👈 note: auth goes first, then container id
//       {
//         size: "invisible",
//         callback: (response) => {
//           console.log("reCAPTCHA solved:", response);
//         },
//       }
//     );
//   }
// };


//   // Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setupRecaptcha();

//     try {
//       const appVerifier = window.recaptchaVerifier;
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         phone,
//         appVerifier
//       );
//       window.confirmationResult = confirmationResult;
//       alert("OTP sent!");
//       setStep("otp");
//     } catch (err) {
//       console.error("OTP send error:", err);
//       alert(err.message);
//     }
//   };

//   // Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await window.confirmationResult.confirm(otp);
//       console.log("✅ OTP Verified:", result.user);
//       alert("OTP Verified!");
//     } catch (err) {
//       console.error("OTP verify error:", err);
//       alert("Invalid OTP!");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold">Test OTP</h2>

//       {step === "phone" && (
//         <form onSubmit={handleSendOtp} className="space-y-3">
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="+918555882595"
//             className="border p-2 w-full"
//           />
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2">
//             Send OTP
//           </button>
//         </form>
//       )}

//       {step === "otp" && (
//         <form onSubmit={handleVerifyOtp} className="space-y-3">
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             className="border p-2 w-full"
//           />
//           <button type="submit" className="bg-green-600 text-white px-4 py-2">
//             Verify OTP
//           </button>
//         </form>
//       )}

//       {/* Required for invisible reCAPTCHA */}
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default AdminLogin;

// PhoneAuth.js
import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../firebase_config/config.js'; // Import the auth instance

const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Function to set up reCAPTCHA verifier
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // The invisible reCAPTCHA will automatically fire upon form submission.
      },
      'expired-callback': () => {
        // Response expired.
      }
    });
  };

  // Function to handle sending the OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setUpRecaptcha();
      const verifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmationResult(result);
      alert('OTP sent successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Please check the number and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (confirmationResult) {
        const result = await confirmationResult.confirm(otp);
        setUser(result.user);
        alert('Phone number verified successfully!');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Firebase Phone OTP Authentication</h2>
      
      {!user && !confirmationResult && (
        <form onSubmit={handleSendOtp}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number (e.g., +15551234567)"
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
          <div id="recaptcha-container"></div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}

      {!user && confirmationResult && (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}

      {user && (
        <div>
          <h3>User Logged In!</h3>
          <p>Phone Number: {user.phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
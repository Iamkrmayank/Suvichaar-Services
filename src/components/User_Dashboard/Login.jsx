// import React, { useEffect, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import { googleAuth, emailLogin } from "../firebase_config/authService";
// import LoadingScreen from "./Loading";
// import logo from "/ContentLabs.png";
// const Login = () => {
//   const [formVisible, setFormVisible] = useState(false);
//   const [error, setError] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => setFormVisible(true), 100);
//   }, []);

//   // const handleGoogleLogin = async () => {
//   //   try {
//   //     const userData = await googleAuth();
//   //     console.log("User Logged In:", userData);
//   //     navigate("/dashboard");
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError("Google Sign-In failed");
//   //   }
//   // };

//   // const handleNormalSignIn = async (e) => {
//   //   e.preventDefault();
//   //   const email = e.target.email.value;
//   //   const password = e.target.password.value;

//   //   try {
//   //     await emailLogin(email, password);
//   //     navigate("/");
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError(err.message || "Invalid email or password");
//   //   }
//   //   e.target.reset();
//   // };


//   const handleGoogleLogin = async () => {
//     try {
//       const userData = await googleAuth();
//       console.log("User Logged In:", userData);

//       if (userData.acceptedTerms) {
//         navigate("/dashboard");
//       } else {
//         navigate("/terms"); // 👈 force terms first
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Google Sign-In failed");
//     }
//   };

//   const handleNormalSignIn = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       setLoading(true);
//       const userData = await emailLogin(email, password);

//       if (userData.acceptedTerms) {
//         navigate("/dashboard");
//       } else {
//         navigate("/terms"); // 👈 force terms first
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }

//     e.target.reset();
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center 
//       bg-gradient-to-brpx-4">
//       {loading && <LoadingScreen text="Logging you in..." />}

//       {/* <div className="min-h-screen flex items-center justify-center 
//       bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] px-4"> */}

//       <div
//         className={`relative bg-white text-black shadow-lg rounded-2xl p-10 max-w-md w-full border border-[#B7D4E9]
//         ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
//       >
//         {/* <div className="flex items-center justify-center h-16  mb-4 relative">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-16 w-auto -mr-6 -ml-6" // negative margin-right pulls it closer
//           />
//           <span className=" ml-2 text-xl font-bold text-black">
//             Content{" "}
//             <span className="text-white bg-[#E6A24B] rounded px-1">LABS</span>
//           </span>
//         </div> */}
//         <div className="flex items-center justify-center h-14  mb-6 relative">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-20 w-auto" // negative margin-right pulls it closer
//           />
//         </div>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleNormalSignIn} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email Address</label>
//             <input
//               required
//               type="email"
//               name="email"
//               placeholder="Enter Your Email"
//               className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               type={passwordVisible ? "text" : "password"}
//               name="password"
//               placeholder="Enter your Password"
//               className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//               className="absolute right-2 top-8 text-gray-400 hover:text-[#E6A24B]"
//             >
//               {passwordVisible ? (
//                 <AiOutlineEyeInvisible className="h-5 w-5" />
//               ) : (
//                 <AiOutlineEye className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#E6A24B] text-white py-2 rounded-lg hover:bg-[#d68d32] transition-all duration-300"
//           >
//             Login
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="mt-8 flex items-center justify-between">
//           <span className="border-b w-1/4 border-gray-300"></span>
//           <span className="text-gray-500 text-sm">OR</span>
//           <span className="border-b w-1/4 border-gray-300"></span>
//         </div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogleLogin}
//           className="mt-6 w-full flex items-center justify-center bg-white border border-[#B7D4E9] py-2 rounded-lg shadow-sm hover:bg-[#B7D4E9]/20"
//         >
//           <FcGoogle className="h-6 w-6 mr-3" /> Continue with Google
//         </button>

//         <p className="text-center text-gray-600 text-sm mt-6">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-[#df8815] hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useEffect, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import { googleAuth, emailLogin } from "../../firebase_config/authService";
// // import { collection, query, where, getDocs } from "firebase/firestore";
// // import { db } from "../../firebase_config/config";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../firebase_config/config";

// import LoadingScreen from "./Loading";
// import logo from "/ContentLabs.png";

// const Login = () => {
//   const [formVisible, setFormVisible] = useState(false);
//   const [error, setError] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showResetDialog, setShowResetDialog] = useState(false);
//   const [resetEmail, setResetEmail] = useState("");
//   const [resetError, setResetError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => setFormVisible(true), 100);
//   }, []);

//   // const handleForgotPassword = async () => {
//   //   if (!resetEmail) {
//   //     setResetError("Please enter your email.");
//   //     return;
//   //   }
//   //   try {
//   //     // 🔎 Check if email exists in Firestore
//   //     const usersRef = collection(db, "Users");
//   //     const q = query(usersRef, where("email", "==", resetEmail));
//   //     const snap = await getDocs(q);

//   //     if (snap.empty) {
//   //       setResetError("❌ No user found with this email.");
//   //       return;
//   //     }

//   //     // ✅ Email exists → send reset link
//   //     await sendResetPassword(resetEmail);
//   //     alert("✅ Password reset link sent! Please check your email.");
//   //     setShowResetDialog(false);
//   //     setResetEmail("");
//   //     setResetError("");
//   //   } catch (err) {
//   //     console.error(err);
//   //     setResetError(err.message || "Failed to send reset email.");
//   //   }
//   // };


  
// const handleForgotPassword = async () => {
//   if (!resetEmail) {
//     setResetError("Please enter your email.");
//     return;
//   }

//   try {
//     // ✅ Secure: do not check if user exists
//     await sendPasswordResetEmail(auth, resetEmail);

//     alert("✅ If this email is registered, a reset link has been sent. Please check your inbox.");
//     setShowResetDialog(false);
//     setResetEmail("");
//     setResetError("");
//   } catch (err) {
//     console.error(err);
//     // Show only generic message
//     setResetError("Failed to send reset link. Please try again later.");
//   }
// };

//   const handleGoogleLogin = async () => {
//     try {
//       const userData = await googleAuth();
//       if (userData.acceptedTerms) {
//         navigate("/dashboard");
//       } else {
//         navigate("/terms");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Google Sign-In failed");
//     }
//   };

//   const handleNormalSignIn = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       setLoading(true);
//       const userData = await emailLogin(email, password);

//       if (userData.acceptedTerms) {
//         navigate("/dashboard");
//       } else {
//         navigate("/terms");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }

//     e.target.reset();
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-brpx-4">
//       {loading && <LoadingScreen text="Logging you in..." />}

//       <div
//         className={`relative bg-white text-black shadow-lg rounded-2xl p-10 max-w-md w-full border border-[#B7D4E9]
//         ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
//       >
//         <div className="flex items-center justify-center h-14 mb-6 relative">
//           <img src={logo} alt="Logo" className="h-20 w-auto" />
//         </div>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleNormalSignIn} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Email Address
//             </label>
//             <input
//               required
//               type="email"
//               name="email"
//               placeholder="Enter Your Email"
//               className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-gray-700 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type={passwordVisible ? "text" : "password"}
//               name="password"
//               placeholder="Enter your Password"
//               className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//               className="absolute right-2 top-8 text-gray-400 hover:text-[#E6A24B]"
//             >
//               {passwordVisible ? (
//                 <AiOutlineEyeInvisible className="h-5 w-5" />
//               ) : (
//                 <AiOutlineEye className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* Forgot Password Link */}
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={() => setShowResetDialog(true)}
//               className="text-sm text-[#E6A24B] hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#E6A24B] text-white py-2 rounded-lg hover:bg-[#d68d32] transition-all duration-300"
//           >
//             Login
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="mt-8 flex items-center justify-between">
//           <span className="border-b w-1/4 border-gray-300"></span>
//           <span className="text-gray-500 text-sm">OR</span>
//           <span className="border-b w-1/4 border-gray-300"></span>
//         </div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogleLogin}
//           className="mt-6 w-full flex items-center justify-center bg-white border border-[#B7D4E9] py-2 rounded-lg shadow-sm hover:bg-[#B7D4E9]/20"
//         >
//           <FcGoogle className="h-6 w-6 mr-3" /> Continue with Google
//         </button>

//         <p className="text-center text-gray-600 text-sm mt-6">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-[#df8815] hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>


//       {/* Reset Password Dialog */}
//       {showResetDialog && (
//         <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-2xl p-6 w-96 border-2 border-[#E6A24B]">
//             <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
//             <p className="text-gray-600 mb-4">
//               Enter your registered email to receive a reset link.
//             </p>
//             <input
//               type="email"
//               value={resetEmail}
//               onChange={(e) => setResetEmail(e.target.value)}
//               placeholder="Your email"
//               className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:outline-none mb-2"
//             />
//             {resetError && <p className="text-red-500 text-sm mb-2">{resetError}</p>}
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => {
//                   setShowResetDialog(false);
//                   setResetEmail("");
//                   setResetError("");
//                 }}
//                 className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleForgotPassword}
//                 className="px-4 py-2 rounded-lg bg-[#E6A24B] text-white hover:bg-[#d68d32]"
//               >
//                 Send Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Login;





import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth, emailLogin } from "../../firebase_config/authService";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase_config/config";

import LoadingScreen from "./Loading";
import logo from "/ContentLabs.png";

const Login = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFormVisible(true), 100);
  }, []);

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("✅ If this email is registered, a reset link has been sent.");
      setShowResetDialog(false);
      setResetEmail("");
      setResetError("");
    } catch (err) {
      console.error(err);
      setResetError("Failed to send reset link. Please try again later.");
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     const userData = await googleAuth();

  //     if (userData.isAdmin) {
  //       console.log("✅ Admin login detected");
  //       navigate("/admin");
  //       return;
  //     }

  //     if (userData.acceptedTerms) {
  //       navigate("/dashboard");
  //     } else {
  //       navigate("/terms");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError("Google Sign-In failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    const userData = await googleAuth();

    // 🔑 Save to localStorage for AdminRoute
    localStorage.setItem("userData", JSON.stringify(userData));

    if (userData.isAdmin) {
      // console.log("✅ Admin login detected");
      navigate("/admin");
      return;
    }

    if (userData.acceptedTerms) {
      navigate("/dashboard");
    } else {
      navigate("/terms");
    }
  } catch (err) {
    console.error(err);
    setError("Google Sign-In failed");
  } finally {
    setLoading(false);
  }
};



  // const handleNormalSignIn = async (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;

  //   try {
  //     setLoading(true);
  //     const userData = await emailLogin(email, password);

  //     if (userData.isAdmin) {
  //       console.log("✅ Admin login detected");
  //       navigate("/admin");
  //       return;
  //     }

  //     if (userData.acceptedTerms) {
  //       navigate("/dashboard");
  //     } else {
  //       navigate("/terms");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message || "Invalid email or password");
  //   } finally {
  //     setLoading(false);
  //   }

  //   e.target.reset();
  // };

  const handleNormalSignIn = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    setLoading(true);
    const userData = await emailLogin(email, password);

    // 🔑 Save to localStorage for AdminRoute
    localStorage.setItem("userData", JSON.stringify(userData));

    if (userData.isAdmin) {
      // console.log("✅ Admin login detected");
      navigate("/admin");
      return;
    }

    if (userData.acceptedTerms) {
      navigate("/dashboard");
    } else {
      navigate("/terms");
    }
  } catch (err) {
    console.error(err);
    setError(err.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }

  e.target.reset();
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      {loading && <LoadingScreen text="Logging you in..." />}

      <div
        className={`relative bg-white text-black shadow-lg rounded-2xl p-10 max-w-md w-full border border-[#B7D4E9]
        ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
      >
        <div className="flex items-center justify-center h-14 mb-6 relative">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleNormalSignIn} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-8 text-gray-400 hover:text-[#E6A24B] transition"
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible className="h-5 w-5" />
              ) : (
                <AiOutlineEye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowResetDialog(true)}
              className="text-sm text-[#E6A24B] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E6A24B] text-white py-2 rounded-lg hover:bg-[#d68d32] transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center justify-between">
          <span className="border-b w-1/4 border-gray-300"></span>
          <span className="text-gray-500 text-sm">OR</span>
          <span className="border-b w-1/4 border-gray-300"></span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center bg-white border border-[#B7D4E9] py-2 rounded-lg shadow-sm hover:bg-[#B7D4E9]/20"
        >
          <FcGoogle className="h-6 w-6 mr-3" /> Continue with Google
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#df8815] hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Reset Password Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 border-2 border-[#E6A24B]">
            <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
            <p className="text-gray-600 mb-4">
              Enter your registered email to receive a reset link.
            </p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:outline-none mb-2"
            />
            {resetError && (
              <p className="text-red-500 text-sm mb-2">{resetError}</p>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowResetDialog(false);
                  setResetEmail("");
                  setResetError("");
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                className="px-4 py-2 rounded-lg bg-[#E6A24B] text-white hover:bg-[#d68d32]"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

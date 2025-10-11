import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth, emailLogin } from "../../firebase_config/authService";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase_config/config";

import LoadingScreen from "./Loading";
import logo from "/ContentLabs.png";

const Login = ({ isDialog = false, onClose, onSwitchToSignup, onSuccess }) => {
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

  useEffect(() => {
    // Get readerId from URL (e.g. ?readerId=amp-xyz123)
    const params = new URLSearchParams(window.location.search);
    const readerId = params.get("readerId");

    if (readerId) {
      localStorage.setItem("readerId", readerId);
      console.log("AMP Reader ID captured:", readerId);
    }
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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const userData = await googleAuth();
      localStorage.setItem("userData", JSON.stringify(userData));

      const readerId = localStorage.getItem("readerId");
      if (readerId) {
        const userRef = doc(db, "Users", userData.uid);
        await setDoc(userRef, { readerId }, { merge: true });
        console.log("Stored AMP Reader ID:", readerId);
      }

      if (userData.isAdmin) {
        navigate("/admin");
        return;
      }

      if (isDialog) {
        // If inside dialog, call onSuccess & close dialog
        if (onSuccess) onSuccess(userData);
        if (onClose) onClose();
        return; // Prevent navigation
      }

      if (userData.acceptedTerms) navigate("/dashboard");
      else navigate("/terms");
    } catch (err) {
      console.error(err);
      setError("Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNormalSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const userData = await emailLogin(email, password);
      localStorage.setItem("userData", JSON.stringify(userData));

      const readerId = localStorage.getItem("readerId");
      if (readerId) {
        const userRef = doc(db, "Users", userData.uid);
        await setDoc(userRef, { readerId }, { merge: true });
        console.log("Stored AMP Reader ID:", readerId);
      }

      if (onSuccess) onSuccess(userData);
      if (onClose) onClose();

      if (!isDialog) {
        if (userData.isAdmin) navigate("/admin");
        else if (userData.acceptedTerms) navigate("/dashboard");
        else navigate("/terms");
      }
      // if (userData.isAdmin) navigate("/admin");
      // else if (userData.acceptedTerms) navigate("/dashboard");
      // else navigate("/terms");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }

    e.target.reset();
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-3 sm:px-6 py-6">
    <div className={`${isDialog ? '' : 'min-h-screen bg-gradient-to-br'} flex items-center justify-center px-3 sm:px-6 py-6`}>

      {loading && <LoadingScreen text="Logging you in..." />}

      <div
        className={`relative bg-white text-black shadow-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md border border-[#B7D4E9]
        ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <img src={logo} alt="Logo" className="h-12 sm:h-16 md:h-20 w-auto" />
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 text-xs sm:text-sm">{error}</p>
        )}

        <form onSubmit={handleNormalSignIn} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 text-sm sm:text-base focus:border-[#E6A24B] outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              className="w-full border-b border-[#B7D4E9] bg-transparent text-black px-2 py-1 text-sm sm:text-base focus:border-[#E6A24B] outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-8 text-gray-400 hover:text-[#E6A24B]"
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible className="h-4 sm:h-5 w-4 sm:w-5" />
              ) : (
                <AiOutlineEye className="h-4 sm:h-5 w-4 sm:w-5" />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowResetDialog(true)}
              className="text-xs sm:text-sm text-[#E6A24B] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E6A24B] text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-base hover:bg-[#d68d32] transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 sm:mt-8 flex items-center justify-between">
          <span className="border-b w-1/4 border-gray-300"></span>
          <span className="text-gray-500 text-xs sm:text-sm">OR</span>
          <span className="border-b w-1/4 border-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 sm:mt-6 w-full flex items-center justify-center bg-white border border-[#B7D4E9] py-2 rounded-lg text-sm sm:text-base shadow-sm hover:bg-[#B7D4E9]/20"
        >
          <FcGoogle className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" /> Continue with Google
        </button>

        {/* <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#df8815] hover:underline">
            Sign up
          </a>
        </p> */}

        <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
          Don't have an account?{" "}
          {isDialog ? (
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-[#df8815] hover:underline"
            >
              Sign up
            </button>
          ) : (
            <a href="/signup" className="text-[#df8815] hover:underline">
              Sign up
            </a>
          )}
        </p>
      </div>

      {/* Reset Password Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-xs flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm border-2 border-[#E6A24B]">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Reset Password</h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-4">
              Enter your registered email to receive a reset link.
            </p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:outline-none mb-2 text-xs sm:text-sm"
            />
            {resetError && (
              <p className="text-red-500 text-xs sm:text-sm mb-2">{resetError}</p>
            )}
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={() => {
                  setShowResetDialog(false);
                  setResetEmail("");
                  setResetError("");
                }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#E6A24B] text-white hover:bg-[#d68d32] text-xs sm:text-sm"
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
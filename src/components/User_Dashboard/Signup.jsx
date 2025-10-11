import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth, emailSignup } from "../../firebase_config/authService";
import LoadingScreen from "./Loading";
import logo from "/ContentLabs_2.png";

const Signup = ({ isDialog = false, onClose, onSwitchToLogin, onSuccess }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFormVisible(true), 100);
  }, []);

  // --- Simple validators ---
  const validateName = (name) => /^[a-zA-Z\s]{1,50}$/.test(name);
  const validatePassword = (pw) =>
    pw.length >= 6 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const userData = await googleAuth();

      localStorage.setItem("userData", JSON.stringify(userData));

      if (isDialog) {
        // If inside dialog, call onSuccess & close dialog
        if (onSuccess) onSuccess(userData);
        if (onClose) onClose();
        return; // Prevent navigation
      }

      if (userData.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/terms");
      }
    } catch (err) {
      console.error(err);
      setError("Google Sign-Up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNormalSignup = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateName(firstName) || !validateName(lastName)) {
      setError("Names must be letters only and under 50 characters.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters, include one uppercase letter and one number."
      );
      setLoading(false);
      return;
    }

    try {
      const userData = await emailSignup(firstName, lastName, email, password);

      localStorage.setItem("userData", JSON.stringify(userData));

      setSuccess(
        "✅ Verification email sent! Please check your inbox before logging in."
      );
      e.target.reset();
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-3 sm:px-6 ">
      {loading && <LoadingScreen text="Creating your account..." />}

      <div
        className={`relative bg-white text-black shadow-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md border border-gray-300
        ${formVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
          } transform transition-all duration-500 ease-out`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <img src={logo} alt="Logo" className="h-12 sm:h-16 md:h-20 w-auto" />
        </div>

        <p className="text-gray-600 text-center text-sm sm:text-base mb-4 sm:mb-6">
          Sign up to get started
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 sm:p-3 rounded-md mb-4 text-center text-xs sm:text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 sm:p-3 rounded-md mb-4 text-center text-xs sm:text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleNormalSignup} className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
                First Name
              </label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm sm:text-base focus:border-[#E6A24B] outline-none"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
                Last Name
              </label>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm sm:text-base focus:border-[#E6A24B] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm sm:text-base focus:border-[#E6A24B] outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">
              Password
            </label>
            <input
              required
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Create a Password"
              className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm sm:text-base focus:border-[#E6A24B] outline-none"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E6A24B] text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-base hover:bg-[#d68d32] transition-all duration-300 disabled:opacity-50"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 sm:mt-8 flex items-center justify-between">
          <span className="border-b w-1/4 border-gray-300"></span>
          <span className="text-gray-500 text-xs sm:text-sm">OR</span>
          <span className="border-b w-1/4 border-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="mt-4 sm:mt-6 w-full flex items-center justify-center bg-white border border-gray-400 py-2 rounded-lg text-sm sm:text-base shadow-sm hover:bg-[#B7D4E9]/20 disabled:opacity-50"
        >
          <FcGoogle className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" /> Continue with Google
        </button>

        {/* <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#df8815] hover:underline">
            Login
          </a>
        </p> */}
        <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
          Already have an account?{" "}
          {isDialog ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#df8815] hover:underline"
            >
              Login
            </button>
          ) : (
            <a href="/login" className="text-[#df8815] hover:underline">
              Login
            </a>
          )}
        </p>

      </div>
    </div>
  );
};

export default Signup;

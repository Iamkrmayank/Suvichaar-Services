import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth, emailLogin } from "../firebase_config/authService";

const Login = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFormVisible(true), 100);
  }, []);

  const handleGoogleLogin = async () => {
  try {
    const userData = await googleAuth(); // now returns Firestore data
    console.log("User Logged In:", userData); // no more undefined
    navigate("/");
  } catch (err) {
    console.error(err);
    setError("Google Sign-In failed");
  }
};

  const handleNormalSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await emailLogin(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    }
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 px-4">
      <div
        className={`relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full border border-gray-700
        ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
      >
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-6">Login to your Account</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleNormalSignIn} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-1">Email Address</label>
            <input required type="email" name="email" placeholder="Enter Your Email"
              className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400"/>
          </div>

          <div className="relative">
            <label className="block text-gray-300 font-medium mb-1">Password</label>
            <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Enter your Password"
              className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400"/>
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-8 text-gray-400 hover:text-cyan-400">
              {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5"/> : <AiOutlineEye className="h-5 w-5"/>}
            </button>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:bg-gradient-to-l transition-all duration-300">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center justify-between">
          <span className="border-b w-1/4 border-gray-600"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="border-b w-1/4 border-gray-600"></span>
        </div>

        {/* Google Login */}
        <button onClick={handleGoogleLogin} className="mt-6 w-full flex items-center justify-center bg-gray-700 border border-gray-600 py-2 rounded-lg shadow-md hover:bg-gray-600">
          <FcGoogle className="h-6 w-6 mr-3"/> Continue with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account? <a href="/signup" className="text-cyan-400 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

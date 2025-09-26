
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase_config/config"; // your firebase auth
import logo from "/ContentLabs_2.png";
import logoGif from "/contentlabsGif2.gif?url";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (auth.currentUser) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 max-w-7xl w-full">
        
        {/* Left section */}
        <div className="flex flex-col text-center md:text-left w-full md:w-1/2 px-2 md:px-0">
          
          {/* Logo */}
          <div className="flex justify-center md:justify-start mb-6">
            <img
              src={logo}
              alt="Main Logo"
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto"
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-gray-800 mb-4 leading-snug">
            Welcome to Content LABS 🚀 <br />
            Automate All Your Document Work
          </h1>

          {/* GIF (mobile only) */}
          <div className="block md:hidden w-56 sm:w-64 h-56 sm:h-64 mx-auto mb-6">
            <img
              src={logoGif}
              alt="GIF Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 leading-relaxed">
            To access your dashboard, please sign up or log in using your
            account. Once you’re signed in, you’ll be redirected to your
            personalized dashboard where you can start working with Content LABS.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="self-center md:self-start bg-[#E6A24B] hover:bg-[#d68d32] text-base sm:text-lg md:text-xl font-medium py-3 sm:py-3 md:py-4 px-6 sm:px-8 md:px-10 rounded-lg shadow-md transition-all duration-300 text-white"
          >
            Get Started
          </button>
        </div>

        {/* Right section (GIF for medium+ screens) */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
          <img
            src={logoGif}
            alt="GIF Illustration"
            className="w-full h-auto max-h-[22rem] sm:max-h-[28rem] lg:max-h-[36rem] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

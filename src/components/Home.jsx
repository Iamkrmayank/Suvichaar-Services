import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase_config/config"; // 👈 import your firebase auth
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
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB] px-6">
    <div className="min-h-screen flex flex-col items-center justify-center  px-6">
      
      {/* Text + GIF side by side */}
      <div className="flex flex-row md:flex-row items-center md:items-center md:justify-center gap-16 max-w-6xl w-full">
        
        {/* Left side (Logo + Text + Button) */}
        <div className="flex flex-col text-center md:text-left max-w-l">
          
          {/* Main Logo on top */}
          <div className=" flex justify-start md:justify-start ">
            <img src={logo} alt="Main Logo" className="h-24 md:h-32 w-auto" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-semibold text-gray-800 my-3">
            Welcome to Content LABS 🚀 <br />
            Automate All Your Document Work
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-4">
            To access your dashboard, please sign up or log in using your
            account. Once you’re signed in, you’ll be redirected to your
            personalized dashboard where you can start working with Content LABS.
          </p>

          {/* Button */}
          <button
            onClick={handleGetStarted}
            className="self-center md:self-start bg-[#E6A24B] hover:bg-[#d68d32] text-white text-lg font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Right side (Bigger GIF) */}
        <div className="w-80 h-80 md:w-[36rem] md:h-[36rem] flex-shrink-0">
          <img
            src={logoGif}
            alt="GIF Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

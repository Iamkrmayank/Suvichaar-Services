import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase_config/config";
import logo from "/ContentLabs_2.png";
import logoGif from "/contentlabsGif2.gif?url";
import { Services } from "./Services";
import { Process } from "./Process";
import { DataPrivacy } from "./DataPrivacy";
import IndustrySection from "./IndustrySection";
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
        <div className="min-h-screen flex flex-col justify-between">

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12  flex-1 bg-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 max-w-7xl w-full">

                    {/* Left section */}
                    <div className="flex flex-col text-center md:text-left w-full md:w-1/2 px-2 md:px-0">
                        <div className="flex justify-center md:justify-start mb-6">
                            <img src={logo} alt="Main Logo" className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                            Welcome to Content LABS 🚀 <br />
                            Automate All Your Document Work
                        </h1>
                        <div className="block md:hidden w-56 sm:w-64 h-56 sm:h-64 mx-auto mb-6">
                            <img src={logoGif} alt="GIF Illustration" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6">
                            Transform your documents with cutting-edge AI technology. From OCR and translation to story generation and intelligent summarization, Contentlabs delivers precision and innovation for every document processing need.
                        </p>


                        <button
                            onClick={handleGetStarted}
                            className="self-center md:self-start bg-[#E6A24B] hover:bg-[#d68d32] text-base sm:text-lg md:text-xl font-medium py-3 px-6 rounded-lg shadow-md text-white"
                        >
                            Get Started
                        </button>

                    </div>

                    {/* Right section */}
                    <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
                        <img src={logoGif} alt="GIF Illustration" className="w-full h-auto max-h-[36rem] object-contain" />
                    </div>
                </div>

                <section id="process" className="py-24 sm:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-10xl">
                            <div className="bg-[#F9F5F0] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-4 border border-[#E6A24B]/20">

                                {/* YouTube Video */}
                                {/* <div className=" aspect-video rounded-2xl overflow-hidden bg-black w-210 h-118 sm:w-100 sm:h-50">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/5hQXHqYnSeU?autoplay=1&mute=1&loop=1&playlist=5hQXHqYnSeU&controls=1&modestbranding=1&rel=0"
                                        title="Contentlabs AI Video"
                                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div> */}

                                <div className="aspect-video rounded-2xl overflow-hidden bg-black 
                w-[302px] h-[170px] 
                sm:w-[320px] sm:h-[180px] 
                md:w-[480px] md:h-[270px] 
                lg:w-[800px] lg:h-[450px] 
                xl:w-[1000px] xl:h-[562px]">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/5hQXHqYnSeU?autoplay=1&mute=1&loop=1&playlist=5hQXHqYnSeU&controls=1&modestbranding=1&rel=0"
                                        title="Contentlabs AI Video"
                                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>
                <Services />
                <DataPrivacy />
                <IndustrySection/>
                <Process />
            </div>
        </div>
    );
};

export default Home;

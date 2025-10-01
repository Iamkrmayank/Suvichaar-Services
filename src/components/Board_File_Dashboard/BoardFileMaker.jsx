import React, { useState, useEffect, useRef } from "react";
import { X, Menu, FileText, File, User, LogOut, ArrowLeft, ScanText, Repeat, } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import {
    googleAuth,
    emailSignup,
    emailLogin,
    logout,
} from "../../firebase_config/authService.js"; // Replace with your actual file path

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase_config/config.js";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import OcrCoreService from "./OcrCoreService.jsx";
import OcrAdvanceService from "./OcrAdvanceService.jsx";


const BoardFileMaker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("index");
    const [pdfUrl, setPdfUrl] = useState("/pdfjs/web/viewer.html?file=/document.pdf");
    const [boardfileData, setBoardfileData] = useState(null);
    const [showUploadOverlay, setShowUploadOverlay] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const [authEmail, setAuthEmail] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
    const [authFirstName, setAuthFirstName] = useState("");
    const [authLastName, setAuthLastName] = useState("");

    const [currentUser, setCurrentUser] = useState(null);

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const profileRef = useRef(null);


    const [showBoardfileModal, setShowBoardfileModal] = useState(false);
    const [selectedBoardfile, setSelectedBoardfile] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [modalError, setModalError] = useState("");
    const [expandedIndex, setExpandedIndex] = useState(null);


    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);


    const [snapImage, setSnapImage] = useState(null);
    const [showSnapPopup, setShowSnapPopup] = useState(false);


    const boardfileInputRef = useRef(null);
    const pdfInputRef = useRef(null);


    const [uploadedPdfFile, setUploadedPdfFile] = useState(null);

    // OCR CORE
    const [creditStatusOcrCore, setCreditStatusOcrCore] = useState(null);

    // OCR Advanced
    const [creditStatusOcrAdvanced, setCreditStatusOcrAdvanced] = useState(null);

    const OCR_CORE_SERVICE_ID = "CL_SER_1";
    const OCR_ADVANCE_SERVICE_ID = "CL_SER_2";

    // NEW: story state
    const [storyUrl, setStoryUrl] = useState(null);
    const [storyType, setStoryType] = useState(null);



    // chat related 
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you today?" },
    ]);
    const [inputMessage, setInputMessage] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            // Scroll smoothly to the bottom
            messagesEndRef.current.scrollTo({
                top: messagesEndRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);


    const handleCapture = (image) => {
        setSnapImage(image);
        setShowSnapPopup(true);
    };

    // === STORY HELPERS ===
    const openStory = (link, type) => {
        setStoryUrl(link);
        setStoryType(type || "vertical");
        setIsOpen(true);
    };

    const closeStory = () => {
        setStoryUrl(null);
        setStoryType(null);
    };

    const generateStory = (title) => {
        console.log(`AI would generate a story for: ${title}`);
    };

    const generateQuiz = (title) => {
        console.log(`AI would generate a quiz for: ${title}`);
    };



    // Send message handler
    const handleSendMessage = (e) => {
        e.preventDefault(); // ✅ stops page jump
        if (!inputMessage.trim()) return;

        const userMessage = { sender: "user", text: inputMessage.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");

        // Simulate bot reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Thanks for your question! 🚀" },
            ]);
        }, 1000);
    };



    // Initialize auth state
    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            if (userData && userData.uid) {
                setIsLoggedIn(true);
                setCurrentUser(userData);
                setAuthEmail(userData.email);
            }
        } catch {
            console.warn("No valid user data found in localStorage on load.");
        }
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoggedIn) {
                setShowAuthModal(true);
            }
        }, 25000);
        return () => clearTimeout(timer);
    }, [isLoggedIn]);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileRef]);

    useEffect(() => {
        if (currentUser) {
            fetchUserAndCredits(currentUser);
        } else {
            setCreditStatusOcrCore(null);
            setCreditStatusOcrAdvanced(null);
        }
    }, [currentUser]);

    const fetchUserAndCredits = async (user) => {
        try {
            if (!user || !user.uid) {
                console.log("User not logged in or invalid user object");
                return;
            }

            const creditRefOcrCore = doc(db, "Credits", user.uid, "UserCredits", OCR_CORE_SERVICE_ID);
            const creditSnapOcrCore = await getDoc(creditRefOcrCore);
            const creditRefOcrAdvance = doc(db, "Credits", user.uid, "UserCredits", OCR_ADVANCE_SERVICE_ID);
            const creditSnapOcrAdvance = await getDoc(creditRefOcrAdvance);

            if (creditSnapOcrCore.exists()) {
                setCreditStatusOcrCore(creditSnapOcrCore.data());
            } else {
                setCreditStatusOcrCore(null);
            }

            if (creditSnapOcrAdvance.exists()) {
                setCreditStatusOcrAdvanced(creditSnapOcrAdvance.data());
            } else {
                setCreditStatusOcrAdvanced(null);
            }
        } catch (error) {
            console.error("Error fetching user credits:", error);
        }
    };

    const handleAuthSuccess = (userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        setAuthEmail(userData.email || "");
        setShowAuthModal(false);
        setIsOpen(false);

        setAuthEmail("");
        setAuthPassword("");
        setAuthFirstName("");
        setAuthLastName("");

        localStorage.setItem("userData", JSON.stringify(userData));
    };

    const handleAuthAction = async (e) => {
        if (e) e.preventDefault();
        setAuthLoading(true);
        setAuthError("");
        try {
            let userData;
            if (authMode === "login") {
                if (!authEmail || !authPassword) throw new Error("Please enter both email and password.");
                userData = await emailLogin(authEmail, authPassword);
            } else {
                if (!authFirstName || !authLastName || !authEmail || authPassword.length < 6) {
                    throw new Error("Please fill in all fields (password must be at least 6 characters).");
                }
                userData = await emailSignup(authFirstName, authLastName, authEmail, authPassword);
            }
            handleAuthSuccess(userData);
        } catch (err) {
            let message = err.message || "An unexpected error occurred.";
            if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password")) {
                message = "Invalid email or password.";
            } else if (message.includes("auth/email-already-in-use")) {
                message = "This email is already registered. Try logging in.";
            } else if (message.includes("auth/user-not-found")) {
                message = "No account found for this email.";
            }
            setAuthError(message);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setAuthLoading(true);
        setAuthError("");
        try {
            const userData = await googleAuth();
            handleAuthSuccess(userData);
        } catch (err) {
            setAuthError(err.message || "Google sign-in failed. Please try again.");
        } finally {
            setAuthLoading(false);
        }
    };

    const performLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        setCurrentUser(null);
        setAuthEmail("");
        setAuthPassword("");
        setAuthFirstName("");
        setAuthLastName("");
        setBoardfileData(null);
        setPdfUrl("/pdfjs/web/viewer.html?file=/document.pdf");
        setIsOpen(false);
        setActiveTab("index");
        setShowUploadOverlay(true);
        setShowProfileDropdown(false);
        setShowConfirm(false);
        setShowAuthModal(true);
        setAuthError("");
        localStorage.removeItem("userData");
    };

    // File readers
    const readFileAsText = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });


    const handleBoardfileModalContinue = async () => {
        try {
            setModalError(""); // reset previous error

            if (!selectedBoardfile || !selectedPdf) {
                setModalError("Please select both a Boardfile (JSON) and a PDF to continue.");
                return;
            }

            const text = await readFileAsText(selectedBoardfile);
            const data = JSON.parse(text);
            setBoardfileData(data);

            const url = URL.createObjectURL(selectedPdf);
            setPdfUrl(`/pdfjs/web/viewer.html?file=${encodeURIComponent(url)}`);
            setUploadedPdfFile(selectedPdf);

            setShowBoardfileModal(false);
            setShowUploadOverlay(false);
        } catch (err) {
            console.error("Error processing files:", err);
            setModalError("Invalid JSON file or PDF. Please try again.");
        }
    };

    const closeBoardfileModal = () => {
        setSelectedBoardfile(null);
        setSelectedPdf(null);
        setShowBoardfileModal(false);
    };


    const handlePdfUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setActiveTab("contentlabs-ai");
        setPdfUrl(`/pdfjs/web/viewer.html?file=${encodeURIComponent(url)}`);
        setUploadedPdfFile(file);
        setShowUploadOverlay(false);
    };

    // Inside BoardFileMaker (ScreenSnap.jsx)

    const [showCropHelp, setShowCropHelp] = useState(false);
    const [loadingCapture, setLoadingCapture] = useState(false);
    const [cropImg, setCropImg] = useState(null);

    

    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data.type === "PAGE_CROP") {
                setShowCropHelp(false);       // hide instruction
                setLoadingCapture(true);      // show loading
                // simulate small delay to mimic processing
                setTimeout(() => {
                    setCropImg(e.data.img);
                    setShowSnapPopup(true);
                    setLoadingCapture(false);   // hide loading when ready
                }, 1000); // ⏳ adjust delay if needed
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);


    const enableCrop = () => {
        const iframe = document.querySelector("iframe[title='PDF Viewer']");
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage({ type: "ENABLE_CROP" }, "*");
            setIsOpen(false); // hide menu
            setShowCropHelp(true); // show instruction
        }
    };


    return (

        <div className="relative w-full h-screen bg-gray-100 font-inter">
            {/* PDF Viewer */}
            <iframe title="PDF Viewer" src={pdfUrl} className="absolute top-0 left-0 w-full h-full border-none" />

            {/* Upload Overlay */}
            {showUploadOverlay && (
                <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <label className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-transform transform hover:-translate-y-1">
                            <File className="w-12 h-12 text-orange-500 mb-3" />
                            <span className="font-semibold text-lg text-gray-800 mb-2">Upload PDF</span>
                            <span className="text-sm text-gray-500 mb-4">Load a PDF directly into the viewer</span>
                            <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
                        </label>
                        <label
                            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                            onClick={() => setShowBoardfileModal(true)}
                        >
                            <FileText className="w-12 h-12 text-orange-600 mb-3" />
                            <span className="font-semibold text-lg text-gray-800 mb-2">Upload Boardfile and PDF</span>
                            <span className="text-sm text-gray-500 mb-4">Load a JSON boardfile with PDF</span>
                        </label>

                    </div>
                </div>
            )}

            {/* Hamburger */}
            {!showUploadOverlay && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full shadow-xl z-50 hover:scale-105 transition-transform"
                >
                    <Menu size={26} />
                </button>
            )}

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-all duration-300 z-50 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"} 
        ${storyUrl
                        ? storyType === "horizontal"
                            ? "w-[95%] md:w-[700px] lg:w-[900px]"
                            : "w-[80%] md:w-[450px]"
                        : "w-[80%] md:w-[450px]"}`}
            >
                {/* Header */}
                {!storyUrl ? (
                    <div className="flex justify-between items-center p-4 bg-orange-500 text-white flex-shrink-0">
                        <h2 className="text-lg font-semibold">Dashboard</h2>

                        <div className="flex gap-3 items-center relative" ref={profileRef}>
                            {!isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
                                        className="px-3 py-1 bg-white/20 text-xs font-medium rounded-full hover:bg-white/30 transition"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}
                                        className="px-3 py-1 bg-white/30 text-xs font-medium rounded-full hover:bg-white/40 transition"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="p-1 rounded-full bg-white/30 hover:bg-white/50 transition border border-white"
                                    >
                                        {currentUser?.photoURL ? (
                                            <img
                                                src={currentUser.photoURL}
                                                alt={currentUser.displayName || "User"}
                                                className="w-7 h-7 rounded-full object-cover"
                                            />
                                        ) : (
                                            <User size={20} className="text-orange-700" />
                                        )}
                                    </button>

                                    {/* 📸 Snap Button */}
                                    {/* <button
                                        onClick={captureScreen}
                                        className="p-1 rounded-full bg-white/30 hover:bg-white/50 transition border border-white"
                                        title="Take Screenshot"
                                    >
                                        📸
                                    </button> */}

                                    <button
                                        onClick={enableCrop}
                                        className="p-1 transition"
                                        title="Enable Crop Mode"
                                    >
                                        <img src="./capture.png" alt="" className="h-10 w-10" />
                                    </button>



                                    {showProfileDropdown && (
                                        <div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100">
                                            <div className="px-4 py-2 text-sm text-gray-700 border-b truncate">
                                                Welcome {currentUser?.displayName || currentUser?.email || "User"}
                                            </div>
                                            <button
                                                onClick={() => { setShowProfileDropdown(false); setShowConfirm(true); }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                                            >
                                                <LogOut size={16} className="mr-2" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* ❌ Close drawer button */}
                            <button onClick={() => setIsOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                    </div>
                ) : (
                    <div className="flex items-center justify-between bg-orange-500 text-white p-3 flex-shrink-0">
                        <button
                            onClick={closeStory}
                            className="flex items-center gap-2 text-sm font-medium hover:text-gray-200 transition"
                        >
                            <ArrowLeft size={18} /> Back to Index
                        </button>
                        <button onClick={() => setIsOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                )}

                {/* Tabs */}
                {!storyUrl && (
                    <div className="flex border-b flex-shrink-0">
                        {boardfileData && (
                            <button
                                onClick={() => setActiveTab("index")}
                                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === "index"
                                    ? "border-b-2 border-orange-500 text-orange-600 bg-gray-50"
                                    : "text-gray-500 hover:text-orange-600 hover:bg-gray-100"
                                    }`}
                            >
                                Index
                            </button>
                        )}

                        <button
                            onClick={() => setActiveTab("contentlabs-ai")}
                            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === "contentlabs-ai"
                                ? "border-b-2 border-orange-500 text-orange-600 bg-gray-50"
                                : "text-gray-500 hover:text-orange-600 hover:bg-gray-100"
                                }`}
                        >
                            Contentlabs AI
                        </button>

                        <button
                            onClick={() => setActiveTab("boardfile")}
                            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === "boardfile"
                                ? "border-b-2 border-orange-500 text-orange-600 bg-gray-50"
                                : "text-gray-500 hover:text-orange-600 hover:bg-gray-100"
                                }`}
                        >
                            Boardfile
                        </button>

                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50">

                    {activeTab === "index" && boardfileData && (
                        <>
                            {!storyUrl ? (
                                <div className="p-5 space-y-5">
                                    <h3 className="font-bold text-xl text-orange-700 border-b pb-2 mb-4">📖 Story Index</h3>
                                    <div className="space-y-4">
                                        {boardfileData.stories?.map((story, idx) => {
                                            const isOpen = expandedIndex === idx;

                                            // Determine which buttons exist
                                            const hasStoryBtn = !!story.storyLink || story.title;
                                            const hasQuizBtn = !!story.quizLink || story.title;

                                            return (
                                                <div
                                                    key={idx}
                                                    className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition flex flex-col"
                                                >
                                                    {/* Header with toggle */}
                                                    <button
                                                        onClick={() => setExpandedIndex(isOpen ? null : idx)}
                                                        className="w-full text-left flex justify-between items-center font-semibold text-lg text-gray-800"
                                                    >
                                                        {story.title || "Untitled"}
                                                        <span
                                                            className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                                        >
                                                            ▼
                                                        </span>
                                                    </button>

                                                    {/* Smooth Expand/Collapse */}
                                                    <div
                                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] mt-2" : "max-h-0"
                                                            }`}
                                                    >
                                                        {isOpen && (
                                                            <div className="space-y-3 mt-2">
                                                                {/* Image Section */}
                                                                {story.image ? (
                                                                    <>
                                                                        <img
                                                                            src={story.image}
                                                                            alt={story.title}
                                                                            className="rounded-lg w-full h-48 object-cover"
                                                                            loading="lazy"
                                                                        />
                                                                        <button
                                                                            onClick={() => {
                                                                                setLightboxImages([{ src: story.image }]);
                                                                                setLightboxIndex(0);
                                                                                setLightboxOpen(true);
                                                                            }}
                                                                            className="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition shadow-md"
                                                                        >
                                                                            View Full Image
                                                                        </button>
                                                                    </>
                                                                ) : null}

                                                                {/* Buttons Section */}
                                                                {(hasStoryBtn || hasQuizBtn) && (
                                                                    <div
                                                                        className={`flex gap-3 mt-4 flex-col sm:flex-row ${!hasStoryBtn || !hasQuizBtn ? "justify-start" : ""
                                                                            }`}
                                                                    >
                                                                        {hasStoryBtn && (
                                                                            <button
                                                                                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition shadow-md"
                                                                                onClick={() =>
                                                                                    story.storyLink
                                                                                        ? openStory(story.storyLink, story.type)
                                                                                        : generateStory(story.title)
                                                                                }
                                                                            >
                                                                                {story.storyLink ? "Open Story" : "Generate Story"}
                                                                            </button>
                                                                        )}

                                                                        {hasQuizBtn && (
                                                                            <button
                                                                                className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-black transition shadow-md"
                                                                                onClick={() =>
                                                                                    story.quizLink
                                                                                        ? openStory(story.quizLink, story.type)
                                                                                        : generateQuiz(story.title)
                                                                                }
                                                                            >
                                                                                {story.quizLink ? "Open Quiz" : "Generate Quiz"}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Lightbox for full image view */}
                                    {lightboxOpen && (
                                        <Lightbox
                                            open={lightboxOpen}
                                            close={() => setLightboxOpen(false)}
                                            slides={lightboxImages}
                                            index={lightboxIndex}
                                            plugins={[Zoom]}
                                        />
                                    )}
                                </div>
                            ) : (
                                <iframe
                                    src={storyUrl}
                                    title="Story/Quiz Viewer"
                                    className="w-full h-full border-none"
                                />
                            )}
                        </>
                    )}


                    {activeTab === "contentlabs-ai" && !storyUrl && (
                        <div className="space-y-4 p-5 relative">
                            <h3 className="font-bold text-xl text-orange-700 mb-4">AI Services</h3>

                            {/* ✅ Chat Start Button */}
                            <div className="p-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <button
                                    onClick={() => setShowChat(true)}
                                    className="w-full px-6 py-4 rounded-2xl font-bold text-black text-lg bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                                >
                                    🚀 Start AI Chat &nbsp;&nbsp;
                                </button>
                            </div>


                            {/* ✅ Existing OCR Services */}
                            <OcrCoreService
                                uploadedPdfFile={uploadedPdfFile}
                                creditStatus={creditStatusOcrCore}
                                setCreditStatus={setCreditStatusOcrCore}
                            />
                            <OcrAdvanceService
                                uploadedPdfFile={uploadedPdfFile}
                                creditStatus={creditStatusOcrAdvanced}
                                setCreditStatus={setCreditStatusOcrAdvanced}
                            />

                            {/* ✅ Other AI tools */}
                            <div className="space-y-4">
                                {/* Story Generation */}
                                <div className="bg-white shadow-md rounded-xl p-5 flex flex-col border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-50 to-orange-100">
                                            <FileText className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Story Generation</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Automatically generate engaging stories and narratives from raw text, ideas, or structured data.
                                    </p>
                                    <button
                                        disabled
                                        className="w-full px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 cursor-not-allowed"
                                    >
                                        Coming Soon...
                                    </button>
                                </div>

                                {/* Quiz Generation */}
                                <div className="bg-white shadow-md rounded-xl p-5 flex flex-col border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-50 to-orange-100">
                                            <Repeat className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Quiz Generation</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Transform documents, lectures, or articles into interactive quizzes for learning and training.
                                    </p>
                                    <button
                                        disabled
                                        className="w-full px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 cursor-not-allowed"
                                    >
                                        Coming Soon...
                                    </button>
                                </div>

                                {/* Summarization */}
                                <div className="bg-white shadow-md rounded-xl p-5 flex flex-col border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-50 to-orange-100">
                                            <ScanText className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Summarization</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Condense long articles, research papers, or documents into concise and meaningful summaries.
                                    </p>
                                    <button
                                        disabled
                                        className="w-full px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 cursor-not-allowed"
                                    >
                                        Coming Soon...
                                    </button>
                                </div>

                                {/* Intelligent Translation */}
                                <div className="bg-white shadow-md rounded-xl p-5 flex flex-col border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-50 to-orange-100">
                                            <User className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Intelligent Translation</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Translate text across multiple languages while preserving context, tone, and cultural nuances.
                                    </p>
                                    <button
                                        disabled
                                        className="w-full px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 cursor-not-allowed"
                                    >
                                        Coming Soon...
                                    </button>
                                </div>

                                {/* PPTX Generator */}
                                <div className="bg-white shadow-md rounded-xl p-5 flex flex-col border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-50 to-orange-100">
                                            <File className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">PPTX Generator</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Generate professional PowerPoint presentations from text, outlines, or uploaded documents.
                                    </p>
                                    <button
                                        disabled
                                        className="w-full px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 cursor-not-allowed"
                                    >
                                        Coming Soon...
                                    </button>
                                </div>
                            </div>

                            {showChat && (
                                <div className="fixed inset-0 z-50 flex flex-col p-5 backdrop-blur-sm bg-white/90 shadow-2xl  border border-orange-200">
                                    {/* Chat Header */}
                                    <div className="flex justify-between items-center p-3 border-b border-orange-200 mb-3 flex-shrink-0">
                                        <h4 className="font-bold text-orange-700 text-lg">Ask Your Doubts</h4>
                                        <button
                                            onClick={() => setShowChat(false)}
                                            className="text-sm text-red-500 hover:text-red-700 font-semibold transition"
                                        >
                                            <X size={24} strokeWidth={4} />
                                        </button>

                                    </div>

                                    <div
                                        className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/70 rounded-xl border border-orange-100 shadow-inner scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50"
                                        ref={messagesEndRef} // ✅ place it here
                                    >
                                        {messages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`p-3 rounded-2xl max-w-[75%] ${msg.sender === "user"
                                                        ? "bg-orange-100 text-gray-900 animate-slide-in-right"
                                                        : "bg-gray-100 text-gray-800 animate-slide-in-left"
                                                        } shadow-md`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                    {/* Input Box */}
                                    <form
                                        onSubmit={handleSendMessage}
                                        className="flex gap-3 mt-4 flex-shrink-0 items-center"
                                    >
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            placeholder="Type your question..."
                                            className="flex-1 p-3 rounded-2xl border border-orange-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent transition placeholder-gray-400 text-sm"
                                        />
                                        <button
                                            type="submit"
                                            className="px-5 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 shadow-lg hover:scale-105 transition-transform duration-200"
                                        >
                                            Send
                                        </button>
                                    </form>
                                </div>
                            )}

                        </div>
                    )}

                    {activeTab === "boardfile" && !storyUrl && (
                        <div className="space-y-4 p-5">
                            <h3 className="font-bold text-xl text-orange-700 mb-4">📂 Board File</h3>

                            {/* Always show upload buttons */}
                            <label className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition">
                                <File className="w-6 h-6 text-orange-500" />
                                <span>Upload PDF</span>
                                <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
                            </label>

                            <label
                                className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition"
                                onClick={() => setShowBoardfileModal(true)}
                            >
                                <FileText className="w-6 h-6 text-orange-600" />
                                <span>Upload Boardfile and PDF</span>
                            </label>

                            {/* Show Generate button ONLY if PDF uploaded but no boardfile */}
                            <div className="flex flex-col items-center justify-center h-full space-y-4 mt-4">
                                {!boardfileData && (<p className="text-gray-600">No Board File uploaded yet.</p>)}
                                <button
                                    onClick={() => alert("🚀 Generate Board File logic here")}
                                    className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700"
                                >
                                    Generate Board File
                                </button>
                            </div>
                        </div>
                    )}


                </div>
            </div>



            {showBoardfileModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm flex flex-col gap-5 border border-orange-300 transform transition-all duration-300 hover:scale-105">
                        <h3 className="text-lg font-bold text-orange-600 text-center">Upload Files</h3>

                        {/* Hidden inputs */}
                        <input
                            type="file"
                            accept=".json"
                            ref={boardfileInputRef}
                            className="hidden"
                            onChange={(e) => setSelectedBoardfile(e.target.files[0])}
                        />
                        <input
                            type="file"
                            accept=".pdf"
                            ref={pdfInputRef}
                            className="hidden"
                            onChange={(e) => setSelectedPdf(e.target.files[0])}
                        />

                        {/* Upload Buttons */}
                        <button
                            onClick={() => boardfileInputRef.current.click()}
                            className="w-full py-3 rounded-xl shadow-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Add Boardfile (JSON)
                        </button>

                        <button
                            onClick={() => pdfInputRef.current.click()}
                            className="w-full py-3 rounded-xl shadow-lg text-white font-semibold bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Add PDF
                        </button>

                        {/* Error Message */}
                        {modalError && (
                            <p className="text-red-600 text-center text-sm mt-1 font-medium">
                                {modalError}
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-between gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setShowBoardfileModal(false);
                                    setSelectedBoardfile(null);
                                    setSelectedPdf(null);
                                    setModalError(""); // reset error
                                }}
                                className="flex-1 py-2 rounded-xl shadow text-gray-700 bg-gray-100 hover:bg-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBoardfileModalContinue}
                                className="flex-1 py-2 rounded-xl shadow-lg text-white font-semibold bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                Continue
                            </button>
                        </div>

                        {/* Selected File Info */}
                        <div className="text-sm text-gray-600 mt-2">
                            {selectedBoardfile && <p>📄 Boardfile: {selectedBoardfile.name}</p>}
                            {selectedPdf && <p>📑 PDF: {selectedPdf.name}</p>}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            {showConfirm && (
                <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border-2 border-orange-500">
                        <h2 className="text-xl font-semibold text-orange-700 mb-2">Confirm Logout</h2>
                        <p className="mb-6 text-gray-700">Are you sure you want to log out?</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button onClick={performLogout} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition w-full sm:w-auto">
                                Yes, Logout
                            </button>
                            <button onClick={() => setShowConfirm(false)} className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition w-full sm:w-auto">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm z-10">
                        <div className="flex flex-col items-center mb-4">
                            <div className="h-10 w-auto text-orange-600 mb-2">
                                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-orange-700">{authMode === "login" ? "Log In Required" : "Sign Up to Continue"}</h3>
                        </div>
                        <p className="text-gray-600 mb-4 text-center text-sm">
                            Your trial period has ended. Please {authMode === "login" ? "log in" : "sign up"} to continue viewing the content.
                        </p>
                        {authError && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center text-xs">{authError}</div>}
                        <form onSubmit={handleAuthAction} className="space-y-4">
                            {authMode === "signup" && (
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                                        <input required type="text" value={authFirstName} onChange={(e) => setAuthFirstName(e.target.value)} className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-sm font-medium mb-1">Last Name</label>
                                        <input required type="text" value={authLastName} onChange={(e) => setAuthLastName(e.target.value)} className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm" />
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                                <input required type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                                <input required type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 text-sm" />
                            </div>
                            <button type="submit" disabled={authLoading} className="w-full bg-orange-500 text-white py-3 rounded-lg text-sm">
                                {authLoading ? (authMode === "login" ? "Logging In..." : "Signing Up...") : authMode === "login" ? "Log In" : "Sign Up"}
                            </button>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <span className="border-b w-1/4"></span>
                            <span className="text-gray-500 text-xs">OR</span>
                            <span className="border-b w-1/4"></span>
                        </div>
                        <button onClick={handleGoogleLogin} disabled={authLoading} className="mt-4 w-full flex items-center justify-center border py-2 rounded-lg">
                            <FcGoogle className="h-5 w-5 mr-2" /> Continue with Google
                        </button>
                        <p className="text-center text-gray-600 text-xs mt-4">
                            {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-orange-500 hover:underline font-semibold">
                                {authMode === "login" ? "Sign Up" : "Log In"}
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {showSnapPopup && (snapImage || cropImg) && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">

                    {/* Close button */}
                    <button
                        onClick={() => {
                            setShowSnapPopup(false);
                            setCropImg(null);
                            setSnapImage(null);
                        }}
                        className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                    >
                        <X size={22} className="text-gray-700" />
                    </button>

                    <div className="flex gap-6 max-w-6xl w-full">
                        {/* Left: Image Preview */}
                        <div className="flex-1 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-3 flex items-center justify-center border border-white/30">
                            <img
                                src={cropImg || snapImage}
                                alt="Captured"
                                className="rounded-lg max-h-[75vh] object-contain border border-white/40 shadow-lg"
                            />
                        </div>

                        {/* Right: Services Container */}
                        <div className="flex-1 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col justify-center border border-white/30">
                            <h3 className="font-bold text-lg text-white mb-5 text-center">
                                ⚡ Available Services
                            </h3>

                            <div className="flex flex-col gap-3">
                                <button className="w-full px-4 py-2.5 rounded-lg font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-[1.03] transition shadow-md">
                                    Save Image
                                </button>
                                <button className="w-full px-4 py-2.5 rounded-lg font-medium bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-[1.03] transition shadow-md">
                                    OCR Service
                                </button>
                                <button className="w-full px-4 py-2.5 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-[1.03] transition shadow-md">
                                    Summarize
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showCropHelp && (
                <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl px-6 py-4 text-center max-w-md">
                        <h3 className="font-bold text-orange-600 text-lg mb-2">Crop Mode Enabled</h3>
                        <p className="text-gray-700 text-sm">
                            👉 Hold <b>SHIFT</b> and drag on the PDF to select the area you want to capture.
                        </p>
                        <button
                            onClick={() => setShowCropHelp(false)}
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
            {loadingCapture && (
                <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <svg
                            className="animate-spin h-12 w-12 text-orange-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
                            />
                        </svg>
                        <p className="mt-4 text-white text-sm">Processing your capture...</p>
                    </div>
                </div>
            )}


        </div>


    );
};

export default BoardFileMaker;
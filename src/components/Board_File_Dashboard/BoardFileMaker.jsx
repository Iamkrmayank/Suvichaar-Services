import React, { useState, useEffect, useRef } from "react";
import { X, Menu, FileText, File, User, LogOut, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import {
  googleAuth,
  emailSignup,
  emailLogin,
  logout,
} from "../../firebase_config/authService.js"; // Replace with your actual file path

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase_config/config.js";

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
    setPdfUrl(`/pdfjs/web/viewer.html?file=${encodeURIComponent(url)}`);
    setUploadedPdfFile(file);
    setShowUploadOverlay(false);
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
                      <img src={currentUser.photoURL} alt={currentUser.displayName || "User"} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <User size={20} className="text-orange-700" />
                    )}
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
            {["index", "contentlabs-ai", "boardfile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab
                  ? "border-b-2 border-orange-500 text-orange-600 bg-gray-50"
                  : "text-gray-500 hover:text-orange-600 hover:bg-gray-100"
                  }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
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
                    {boardfileData.stories?.map((story, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition flex flex-col"
                      >
                        <h4 className="font-semibold text-lg text-gray-800 mb-2">{story.title}</h4>
                        {story.image ? (
                          <img
                            src={story.image}
                            alt={story.title}
                            className="mt-2 rounded-lg w-full h-auto object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="mt-2 text-sm text-gray-500 italic p-3 border rounded-lg bg-gray-50">
                            No image available
                          </div>
                        )}
                        <div className="flex gap-3 mt-4 flex-col sm:flex-row">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <iframe src={storyUrl} title="Story/Quiz Viewer" className="w-full h-full border-none" />
              )}
            </>
          )}

          {activeTab === "contentlabs-ai" && !storyUrl && (
            <div className="space-y-4 p-5">
              <h3 className="font-bold text-xl text-orange-700 mb-4">AI Services</h3>
              <OcrCoreService uploadedPdfFile={uploadedPdfFile} creditStatus={creditStatusOcrCore} setCreditStatus={setCreditStatusOcrCore} />
              <OcrAdvanceService uploadedPdfFile={uploadedPdfFile} creditStatus={creditStatusOcrAdvanced} setCreditStatus={setCreditStatusOcrAdvanced} />
            </div>
          )}

          {activeTab === "boardfile" && !storyUrl && (
            <div className="space-y-4 p-5">
              <h3 className="font-bold text-xl text-orange-700 mb-4">📂 Upload Files</h3>
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
    </div>
  );
};

export default BoardFileMaker;

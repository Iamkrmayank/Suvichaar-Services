import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import { auth, db } from "../firebase_config/config";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Uploader() {
  const [file, setFile] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Load user details from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            setUserDetails({
              email: user.email,
              displayName: user.displayName || "",
              photoURL: user.photoURL || "",
            });
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserDetails(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white p-6 relative">
      {/* Top-right Profile/Login Section */}
      <div className="absolute top-5 right-5">
        {userDetails ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 focus:outline-none overflow-hidden flex items-center justify-center"
            >
              {userDetails?.photoURL ? (
                <img
                  src={userDetails.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-gray-700 text-xl font-bold text-white">
                  {userDetails?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700"
                >
                  Logout
                </button>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center">
          PDF → DOCX with Suvichaar Document Intelligence
        </h1>

        {/* Settings */}
        {/* <details className="mb-6 bg-gray-700 rounded-lg px-4 py-2 border border-gray-600">
          <summary className="cursor-pointer font-semibold">Settings</summary>
          <div className="mt-2 text-sm text-gray-300">
            No additional settings available yet.
          </div>
        </details> */}

        {/* File Uploader */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-200">Drag and drop file here</p>
          <p className="text-sm text-gray-400">Limit 200MB per file • PDF</p>

          <label className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg cursor-pointer text-sm font-semibold">
            Browse files
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* File Preview */}
        {file && (
          <div className="mt-4 text-sm text-gray-200">
            <span className="font-semibold">Selected file:</span> {file.name}
          </div>
        )}

        {/* Upload Button */}
        <button
          disabled={!file}
          className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition ${
            file
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {file ? "Upload PDF to begin" : "Upload a PDF to begin"}
        </button>

        {/* Instructions */}
        <div className="mt-6 text-xs text-gray-400">
          • Per-user page balances persist across reloads. <br />
          • Admin creates users, sets tenant/profile & pages, and can top-up anytime. <br />
          • Each extracted page deducts 1 page from your balance.
        </div>
      </div>
    </div>
  );
}

export default Uploader;

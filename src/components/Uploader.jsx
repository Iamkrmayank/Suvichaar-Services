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
            setUserDetails({ uid: user.uid, ...docSnap.data() });
          } else {
            setUserDetails({
              uid: user.uid,
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
    <div
      className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] text-black p-6 relative"
    >
      {/* ✅ Top-right Profile/Login Section */}
      <div className="absolute top-5 right-5">
        {userDetails ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-12 h-12 rounded-full border border-[#E6A24B] hover:border-black 
              focus:outline-none overflow-hidden flex items-center justify-center bg-white"
            >
              {userDetails?.photoURL ? (
                <img
                  src={userDetails.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center 
                  bg-[#E6A24B] text-xl font-bold text-white">
                  {userDetails?.firstName?.charAt(0)?.toUpperCase() ||
                    userDetails?.displayName?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-[#B7D4E9] rounded-lg shadow-lg">
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 text-black hover:bg-[#E6A24B]/20"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-black hover:bg-[#E6A24B]/20"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="ml-2 px-4 py-2 bg-[#B7D4E9] text-black rounded-lg hover:bg-[#9cc4e3]">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-[#B7D4E9]">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#E6A24B]">
          PDF → DOCX with Content LABS Intelligence
        </h1>

        {/* File Uploader */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[#B7D4E9] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#E6A24B] transition"
        >
          <Upload className="w-12 h-12 text-[#B7D4E9] mb-3" />
          <p className="text-gray-700">Drag and drop file here</p>
          <p className="text-sm text-gray-500">Limit 200MB per file • PDF</p>

          <label className="mt-5 bg-[#E6A24B] hover:bg-[#d68d32] px-5 py-2 rounded-lg cursor-pointer text-sm font-semibold text-white">
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
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">Selected file:</span> {file.name}
          </div>
        )}

        {/* Upload Button */}
        <button
          disabled={!file}
          className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition ${
            file
              ? "bg-[#E6A24B] text-white hover:bg-[#d68d32]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {file ? "Upload PDF to begin" : "Upload a PDF to begin"}
        </button>

        {/* Instructions */}
        <div className="mt-6 text-xs text-gray-500">
          • Per-user page balances persist across reloads. <br />
          • Admin creates users, sets tenant/profile & pages, and can top-up anytime. <br />
          • Each extracted page deducts 1 page from your balance.
        </div>
      </div>
    </div>
  );
}

export default Uploader;

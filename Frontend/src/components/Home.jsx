import { Link } from "react-router-dom";
import { auth, db } from "../firebase_config/config";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          // If Firestore document exists, use it
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log("✅ Loaded User Data from Firestore:", docSnap.data());
          } else {
            // Fallback: construct minimal user info
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
    console.log("User photoURL:", userDetails?.photoURL);

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserDetails(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
      <div className="absolute top-5 right-5">
        {userDetails ? (
          <div className="relative">
            {/* Profile Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 focus:outline-none overflow-hidden flex items-center justify-center"
            >
              {userDetails?.photoURL ? (
                <img
                  src={userDetails.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  // className="w-12 h-12 rounded-full border ..."

                />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-gray-700 text-xl font-bold text-white">
                  {userDetails?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
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

      <h1 className="text-3xl font-bold">
        Welcome{" "}
        {userDetails
          ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
          : "Guest"}
      </h1>
      <p className="text-gray-300">This is the home page.</p>
    </div>
  );
}

export default Home;

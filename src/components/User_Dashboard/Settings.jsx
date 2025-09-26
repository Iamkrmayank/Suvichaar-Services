
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase_config/config";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function Settings() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [resetCooldown, setResetCooldown] = useState(0); // seconds cooldown

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const providerId = currentUser.providerData[0]?.providerId;
        setIsGoogleUser(providerId === "google.com");

        if (providerId !== "google.com") {
          const docRef = doc(db, "Users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
          } else {
            const [f, l] = currentUser.displayName?.split(" ") || ["", ""];
            setFirstName(f);
            setLastName(l);
          }
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // simple validation: letters, numbers, spaces only + max length 50
  const validateName = (name) => /^[a-zA-Z0-9\s]{0,50}$/.test(name);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!validateName(firstName) || !validateName(lastName)) {
      setMessage("⚠️ Names can only contain letters, numbers, spaces (max 50 chars).");
      return;
    }

    try {
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, { firstName, lastName });

      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to update profile. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    if (resetCooldown > 0) return; // prevent spamming

    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage("📩 Password reset email sent! Check your inbox.");
      setResetCooldown(30); // start 30s cooldown
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to send password reset email.");
    }
  };

  // countdown for resetCooldown
  useEffect(() => {
    if (resetCooldown > 0) {
      const timer = setInterval(() => {
        setResetCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resetCooldown]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 text-gray-800">
        <p>You must be logged in to access settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
          Settings
        </h1>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-[#E6A24B]">
            {message}
          </p>
        )}

        {isGoogleUser ? (
          <div className="p-4 sm:p-6 bg-gradient-to-r from-yellow-100 to-amber-50 rounded-xl border border-amber-200 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Google Account Detected
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              You signed in with Google. Profile details and password settings
              must be managed through your Google Account.
            </p>
          </div>
        ) : (
          <>
            {/* Edit Profile */}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Profile
              </h2>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E6A24B] focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E6A24B] focus:outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#E6A24B] text-white py-2 rounded-lg hover:bg-[#d68d32] transition-all"
              >
                Save Changes
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <span className="border-b flex-1 border-gray-300"></span>
              <span className="text-gray-400 text-sm px-4">OR</span>
              <span className="border-b flex-1 border-gray-300"></span>
            </div>

            {/* Password Reset */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Reset Password
              </h2>
              <button
                onClick={handlePasswordReset}
                disabled={resetCooldown > 0}
                className={`w-full py-2 rounded-lg transition-all ${
                  resetCooldown > 0
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-[#E6A24B] text-white hover:bg-[#d68d32]"
                }`}
              >
                {resetCooldown > 0
                  ? `Wait ${resetCooldown}s`
                  : "Send Password Reset Email"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Settings;
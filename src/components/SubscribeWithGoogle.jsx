
import React, { useState } from "react";
import { googleAuth } from "../firebase_config/authService"; // adjust path
import { getAuth } from "firebase/auth";
import { db } from "../firebase_config/config";
import { doc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const SubscribeWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setMessage("");

      // ✅ Step 1: Sign in with Google
      const userData = await googleAuth();
      const user = userData.user || userData;

      // ✅ Step 2: Get readerId from URL
      const params = new URLSearchParams(window.location.search);
      const readerId = params.get("readerId");
      if (!readerId) throw new Error("Missing readerId in query params");

      // ✅ Step 3: Get ID token for backend verification
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      // ✅ Step 4: Call backend to activate subscription
      const res = await fetch(
        `https://us-central1-YOUR_PROJECT.cloudfunctions.net/subscribe?readerId=${readerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Subscription failed");

      // ✅ Step 5: Update Firestore locally
      await setDoc(
        doc(db, "Users", user.uid),
        { readerId, subscriptionStatus: "active" },
        { merge: true }
      );

      setMessage("✅ Subscription activated successfully!");
      setTimeout(() => window.close(), 1500); // close popup
    } catch (err) {
      console.error("Subscription error:", err);
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Subscribe with Google</h1>
        <p className="text-gray-600 mb-6">
          Sign in with your Google account to activate your subscription.
        </p>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`mt-4 w-full flex items-center justify-center bg-white border border-[#B7D4E9] py-2 rounded-lg text-sm sm:text-base shadow-sm transition ${
            loading ? "cursor-not-allowed bg-gray-200" : "hover:bg-[#B7D4E9]/20"
          }`}
        >
          <FcGoogle className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" />
          {loading ? "Connecting..." : "Continue with Google"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SubscribeWithGoogle;

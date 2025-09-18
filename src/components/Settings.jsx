// import { useState, useEffect } from "react";
// import { auth, db } from "../firebase_config/config";
// import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
// import { doc, updateDoc, getDoc } from "firebase/firestore";

// function Settings() {
//   const [user, setUser] = useState(null);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         const docRef = doc(db, "Users", currentUser.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setFirstName(data.firstName || "");
//           setLastName(data.lastName || "");
//         } else {
//           // For Google users without Firestore doc
//           const [f, l] = currentUser.displayName?.split(" ") || ["", ""];
//           setFirstName(f);
//           setLastName(l);
//         }
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     try {
//       await updateProfile(user, { displayName: `${firstName} ${lastName}` });
//       const docRef = doc(db, "Users", user.uid);
//       await updateDoc(docRef, { firstName, lastName });

//       setMessage("✅ Profile updated successfully!");
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Failed to update profile.");
//     }
//   };

//   const handlePasswordReset = async () => {
//     if (!user?.email) return;
//     try {
//       await sendPasswordResetEmail(auth, user.email);
//       setMessage("📩 Password reset email sent! Check your inbox.");
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Failed to send password reset email.");
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
//         <p>You must be logged in to access settings.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transition duration-300">
//         <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

//         {message && <p className="mb-4 text-cyan-400 text-center">{message}</p>}

//         {/* Edit Profile */}
//         <form onSubmit={handleProfileUpdate} className="space-y-4">
//           <h2 className="text-xl font-semibold">Edit Profile</h2>
//           <div>
//             <label className="block text-gray-300">First Name</label>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-400 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-300">Last Name</label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-400 focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
//           >
//             Save Changes
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="my-6 flex items-center justify-between">
//           <span className="border-b w-1/4 border-gray-600"></span>
//           <span className="text-gray-400 text-sm">OR</span>
//           <span className="border-b w-1/4 border-gray-600"></span>
//         </div>

//         {/* Password Reset */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
//           <button
//             onClick={handlePasswordReset}
//             className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition-all"
//           >
//             Send Password Reset Email
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;


import { useState, useEffect } from "react";
import { auth, db } from "../firebase_config/config";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function Settings() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // detect if signed in with Google
        const providerId = currentUser.providerData[0]?.providerId;
        setIsGoogleUser(providerId === "google.com");

        // Only load Firestore data for email/password users
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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, { firstName, lastName });

      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to update profile.");
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage("📩 Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to send password reset email.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        <p>You must be logged in to access settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Settings
        </h1>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-blue-600">
            {message}
          </p>
        )}

        {isGoogleUser ? (
          <div className="p-6 bg-gradient-to-r from-yellow-100 to-amber-50 rounded-xl border border-amber-200 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Google Account Detected
            </h2>
            <p className="text-gray-600">
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
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Save Changes
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center justify-between">
              <span className="border-b w-1/4 border-gray-300"></span>
              <span className="text-gray-400 text-sm">OR</span>
              <span className="border-b w-1/4 border-gray-300"></span>
            </div>

            {/* Password Reset */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Reset Password
              </h2>
              <button
                onClick={handlePasswordReset}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Send Password Reset Email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Settings;

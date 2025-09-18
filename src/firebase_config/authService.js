// import {
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   sendEmailVerification,
//   signInWithEmailAndPassword,
//   signOut,
//   applyActionCode,
//   sendPasswordResetEmail,
//   confirmPasswordReset,
// } from "firebase/auth";

// import { auth, googleProvider, db } from "./config";
// import { doc, setDoc,getDoc } from "firebase/firestore";

// /**
//  * Google Signup / Login (⚡ No Firestore, only Firebase Auth)
//  */
// /**
//  * Google Signup / Login (⚡ With Firestore)
//  */

// // export const googleAuth = async () => {
// //   const result = await signInWithPopup(auth, googleProvider);
// //   const user = result.user;

// //   // Check Firestore for existing user
// //   const userRef = doc(db, "Users", user.uid);
// //   const docSnap = await getDoc(userRef);

// //   if (!docSnap.exists()) {
// //     // Save first-time Google user to Firestore
// //     const [firstName, lastName = ""] = user.displayName
// //       ? user.displayName.split(" ")
// //       : ["", ""];
// //     await setDoc(userRef, {
// //       email: user.email,
// //       firstName,
// //       lastName,
// //       displayName: user.displayName || "",
// //       photoURL: user.photoURL,
// //       provider: "google",
// //       createdAt: new Date(),
// //     });
// //   }

// //   // Return Firestore data
// //   const finalSnap = await getDoc(userRef);
// //   return finalSnap.data();
// // };


// // /**
// //  * Email/Password Signup
// //  */
// // export const emailSignup = async (firstName, lastName, email, password) => {
// //   const userCred = await createUserWithEmailAndPassword(auth, email, password);

// //   await updateProfile(userCred.user, {
// //     displayName: `${firstName} ${lastName}`,
// //     photoURL: "https://via.placeholder.com/150", // fallback avatar
// //   });

// //   // Save user data in Firestore (only for email users)
// //   await setDoc(doc(db, "Users", userCred.user.uid), {
// //     email,
// //     firstName,
// //     lastName,
// //     photoURL: "https://via.placeholder.com/150",
// //     createdAt: new Date(),
// //   });

// //   await sendEmailVerification(userCred.user, {
// //     url: "http://localhost:5173/verify-email",
// //     handleCodeInApp: true,
// //   });

// //   return userCred.user;
// // };

// // /**
// //  * Email/Password Login
// //  */
// // export const emailLogin = async (email, password) => {
// //   const userCred = await signInWithEmailAndPassword(auth, email, password);
// //   if (!userCred.user.emailVerified) {
// //     await signOut(auth);
// //     throw new Error("Please verify your email before logging in.");
// //   }
// //   return userCred.user;
// // };

// // --- GOOGLE AUTH ---


// export const googleAuth = async () => {
//   const result = await signInWithPopup(auth, googleProvider);
//   const user = result.user;

//   const userRef = doc(db, "Users", user.uid);
//   const docSnap = await getDoc(userRef);

//   if (!docSnap.exists()) {
//     const [firstName, lastName = ""] = user.displayName
//       ? user.displayName.split(" ")
//       : ["", ""];
//     await setDoc(userRef, {
//       email: user.email,
//       firstName,
//       lastName,
//       displayName: user.displayName || "",
//       photoURL: user.photoURL,
//       provider: "google",
//       createdAt: new Date(),
//       acceptedTerms: false,   // 👈 always start false
//     });
//   }

//   // Always return Firestore user data
//   const finalSnap = await getDoc(userRef);
//   return finalSnap.data();
// };


// // --- EMAIL SIGNUP ---
// export const emailSignup = async (firstName, lastName, email, password) => {
//   const userCred = await createUserWithEmailAndPassword(auth, email, password);

//   await updateProfile(userCred.user, {
//     displayName: `${firstName} ${lastName}`,
//     photoURL: "https://via.placeholder.com/150",
//   });

//   const userRef = doc(db, "Users", userCred.user.uid);
//   await setDoc(userRef, {
//     email,
//     firstName,
//     lastName,
//     photoURL: "https://via.placeholder.com/150",
//     createdAt: new Date(),
//     acceptedTerms: false,  // 👈 required
//   });

//   await sendEmailVerification(userCred.user, {
//     url: "http://localhost:5173/verify-email",
//     handleCodeInApp: true,
//   });

//   return (await getDoc(userRef)).data();
// };


// // --- EMAIL LOGIN ---
// export const emailLogin = async (email, password) => {
//   const userCred = await signInWithEmailAndPassword(auth, email, password);

//   if (!userCred.user.emailVerified) {
//     await signOut(auth);
//     throw new Error("Please verify your email before logging in.");
//   }

//   const userRef = doc(db, "Users", userCred.user.uid);
//   const snap = await getDoc(userRef);
//   return snap.data();  // 👈 return Firestore data, not just Firebase user
// };



// /**
//  * Logout
//  */
// export const logout = async () => {
//   return await signOut(auth);
// };

// /**
//  * Verify Email Code
//  */
// export const verifyEmailCode = async (actionCode) => {
//   await applyActionCode(auth, actionCode);
// };

// /**
//  * Reset Password
//  */
// export const sendResetPassword = async (email) => {
//   await sendPasswordResetEmail(auth, email, {
//     url: "http://localhost:5173/login",
//   });
// };

// export const confirmResetPassword = async (oobCode, newPassword) => {
//   await confirmPasswordReset(auth, oobCode, newPassword);
// };


import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  applyActionCode,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

import { auth, googleProvider, db } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

// --- GOOGLE AUTH ---
export const googleAuth = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const userRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const [firstName, lastName = ""] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    await setDoc(userRef, {
      email: user.email,
      firstName,
      lastName,
      displayName: user.displayName || "",
      photoURL: user.photoURL,
      provider: "google",
      createdAt: new Date(),
      acceptedTerms: false,   // 👈 ensure terms not accepted by default
    });
  }

  // Always return Firestore data
  const finalSnap = await getDoc(userRef);
  return finalSnap.data();
};

// --- EMAIL SIGNUP ---
export const emailSignup = async (firstName, lastName, email, password) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(userCred.user, {
    displayName: `${firstName} ${lastName}`,
    photoURL: "https://via.placeholder.com/150",
  });

  const userRef = doc(db, "Users", userCred.user.uid);
  await setDoc(userRef, {
    email,
    firstName,
    lastName,
    photoURL: "https://via.placeholder.com/150",
    createdAt: new Date(),
    acceptedTerms: false,   // 👈 ensure terms not accepted by default
  });

  await sendEmailVerification(userCred.user, {
    url: "http://localhost:5173/login",
    handleCodeInApp: true,
  });

  return (await getDoc(userRef)).data();
};

// --- EMAIL LOGIN ---
export const emailLogin = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  if (!userCred.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email before logging in.");
  }

  const userRef = doc(db, "Users", userCred.user.uid);
  const snap = await getDoc(userRef);
  return snap.data();  // 👈 return Firestore data instead of Firebase user
};

// --- LOGOUT ---
export const logout = async () => {
  return await signOut(auth);
};

// --- VERIFY EMAIL CODE ---
export const verifyEmailCode = async (actionCode) => {
  await applyActionCode(auth, actionCode);
};

// --- RESET PASSWORD ---
export const sendResetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email, {
    url: "http://localhost:5173/login",
  });
};

export const confirmResetPassword = async (oobCode, newPassword) => {
  await confirmPasswordReset(auth, oobCode, newPassword);
};

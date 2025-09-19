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
// import { doc, setDoc, getDoc, collection ,query, orderBy, limit} from "firebase/firestore";

// // --- Default Credits for all services ---
// const DEFAULT_CREDITS = [
//   {
//     serviceId: "CL_SER_1",

//     total: 100,
//     used: 0,
//     available: 100,
//     equivalent: "100 pages",
//   },
//   {
//     serviceId: "CL_SER_2",
//     total: 50,
//     used: 0,
//     available: 50,
//     equivalent: "50 pages",
//   },
// ];

// // const generateCustomUserId = async () => {
// //   const usersRef = collection(db, "Users");
// //   const q = query(usersRef, orderBy("customId", "desc"), limit(1));
// //   const snapshot = await getDocs(q);

// //   if (!snapshot.empty) {
// //     const lastId = snapshot.docs[0].data().customId;
// //     const lastNum = parseInt(lastId.split("_")[2]); // e.g. CL_USR_1001 → 1001
// //     return `CL_USR_${lastNum + 1}`;
// //   }
// //   return "CL_USR_1001"; // First ID if no users
// // };

// // --- Helper: give default credits per service ---
// const giveDefaultCredits = async (userId) => {
//   for (const credit of DEFAULT_CREDITS) {
//     const creditRef = doc(
//       collection(db, "Credits", userId, "UserCredits"),
//       credit.serviceId
//     );
//     await setDoc(creditRef, credit);
//   }
// };

// // --- GOOGLE AUTH ---
// export const googleAuth = async () => {
//   const result = await signInWithPopup(auth, googleProvider);
//   const user = result.user;

//   const userRef = doc(db, "Users", user.uid);
//   const docSnap = await getDoc(userRef);
//   const accountId = await generateCustomUserId();
//   if (!docSnap.exists()) {
//     const [firstName, lastName = ""] = user.displayName
//       ? user.displayName.split(" ")
//       : ["", ""];
//     await setDoc(userRef, {
//       accountId,
//       email: user.email,
//       firstName,
//       lastName,
//       displayName: user.displayName || "",
//       photoURL: user.photoURL,
//       provider: "google",
//       createdAt: new Date(),
//       acceptedTerms: false,
//     });



//     // ✅ Add default credits for new user
//     await giveDefaultCredits(user.uid);
//   }

//   const finalSnap = await getDoc(userRef);
//   return finalSnap.data();
// };

// // --- EMAIL SIGNUP ---
// export const emailSignup = async (firstName, lastName, email, password) => {
//   const userCred = await createUserWithEmailAndPassword(auth, email, password);

//   // ✅ update Firebase Auth profile
//   await updateProfile(userCred.user, {
//     displayName: `${firstName} ${lastName}`,
//     photoURL: "" // keep empty so we can fallback to initials
//   });

//   const userRef = doc(db, "Users", userCred.user.uid);
//   const accountId = await generateCustomUserId();
//   await setDoc(userRef, {
//     accountId,
//     email,
//     firstName,
//     lastName,
//     displayName: `${firstName} ${lastName}`,
//     photoURL: "",
//     createdAt: new Date(),
//     acceptedTerms: false,
//   });

//   // ✅ Add default credits for new user
//   await giveDefaultCredits(userCred.user.uid);

//   await sendEmailVerification(userCred.user, {
//     url: "http://localhost:5173/login",
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
//   return snap.data();
// };

// // --- LOGOUT ---
// export const logout = async () => {
//   return await signOut(auth);
// };

// // --- VERIFY EMAIL CODE ---
// export const verifyEmailCode = async (actionCode) => {
//   await applyActionCode(auth, actionCode);
// };

// // --- RESET PASSWORD ---
// export const sendResetPassword = async (email) => {
//   await sendPasswordResetEmail(auth, email, {
//     url: "http://localhost:5173/login",
//   });
// };

// export const confirmResetPassword = async (oobCode, newPassword) => {
//   await confirmPasswordReset(auth, oobCode, newPassword);
// };

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
//   fetchSignInMethodsForEmail
// } from "firebase/auth";

// import { auth, googleProvider, db } from "./config";
// import { 
//   doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs 
// } from "firebase/firestore"; // ✅ added getDocs

// // --- Default Credits for all services ---
// const DEFAULT_CREDITS = [
//   {
//     serviceId: "CL_SER_1",
//     total: 100,
//     used: 0,
//     available: 100,
//     equivalent: "100 pages",
//   },
//   {
//     serviceId: "CL_SER_2",
//     total: 50,
//     used: 0,
//     available: 50,
//     equivalent: "50 pages",
//   },
// ];

// // --- Generate custom userId ---
// const generateCustomUserId = async () => {
//   const usersRef = collection(db, "Users");
//   const q = query(usersRef, orderBy("accountId", "desc"), limit(1)); // ✅ use accountId
//   const snapshot = await getDocs(q);

//   if (!snapshot.empty) {
//     const lastId = snapshot.docs[0].data().accountId; // ✅ consistent with storage
//     const parts = lastId.split("_");
//     const lastNum = parseInt(parts[2] || "1000", 10); // ✅ safe parsing
//     return `CL_USR_${lastNum + 1}`;
//   }
//   return "CL_USR_1001"; // First ID if no users
// };

// // --- Helper: give default credits per service ---
// const giveDefaultCredits = async (userId) => {
//   for (const credit of DEFAULT_CREDITS) {
//     const creditRef = doc(
//       collection(db, "Credits", userId, "UserCredits"),
//       credit.serviceId
//     );
//     await setDoc(creditRef, credit);
//   }
// };

// // --- GOOGLE AUTH ---
// // export const googleAuth = async () => {
// //   const result = await signInWithPopup(auth, googleProvider);
// //   const user = result.user;

// //   const userRef = doc(db, "Users", user.uid);
// //   const docSnap = await getDoc(userRef);
// //   const accountId = await generateCustomUserId();
// //   if (!docSnap.exists()) {
// //     const [firstName, lastName = ""] = user.displayName
// //       ? user.displayName.split(" ")
// //       : ["", ""];
// //     await setDoc(userRef, {
// //       accountId,
// //       email: user.email,
// //       firstName,
// //       lastName,
// //       displayName: user.displayName || "",
// //       photoURL: user.photoURL,
// //       provider: "google",
// //       createdAt: new Date(),
// //       acceptedTerms: false,
// //     });

// //     // ✅ Add default credits for new user
// //     await giveDefaultCredits(user.uid);
// //   }

// //   const finalSnap = await getDoc(userRef);
// //   return finalSnap.data();
// // };

// // --- GOOGLE AUTH ---
// // export const googleAuth = async () => {
// //   const result = await signInWithPopup(auth, googleProvider);
// //   const user = result.user;

// //   // ✅ Check if already registered with Email/Password
// //   const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
// //   if (signInMethods.includes("password") && !signInMethods.includes("google.com")) {
// //     await signOut(auth);
// //     throw new Error("This email is already registered with Email/Password. Please login using Email.");
// //   }

// //   const userRef = doc(db, "Users", user.uid);
// //   const docSnap = await getDoc(userRef);
// //   const accountId = await generateCustomUserId();
// //   if (!docSnap.exists()) {
// //     const [firstName, lastName = ""] = user.displayName
// //       ? user.displayName.split(" ")
// //       : ["", ""];
// //     await setDoc(userRef, {
// //       accountId,
// //       email: user.email,
// //       firstName,
// //       lastName,
// //       displayName: user.displayName || "",
// //       photoURL: user.photoURL,
// //       provider: "google",
// //       createdAt: new Date(),
// //       acceptedTerms: false,
// //     });

// //     await giveDefaultCredits(user.uid);
// //   }

// //   const finalSnap = await getDoc(userRef);
// //   return finalSnap.data();
// // };

// export const googleAuth = async () => {
//   const result = await signInWithPopup(auth, googleProvider);
//   const user = result.user;

//   // ✅ Check if email already exists with Email/Password
//   const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

//   if (signInMethods.includes("password") && signInMethods.includes("google.com")) {
//     // Both providers linked already → allow login
//   } else if (signInMethods.includes("password") && !signInMethods.includes("google.com")) {
//     // Email/Password exists → block Google login
//     await signOut(auth);
//     throw new Error("This email is already registered with Email/Password. Please login using Email.");
//   }

//   // ✅ Continue with Google user creation
//   const userRef = doc(db, "Users", user.uid);
//   const docSnap = await getDoc(userRef);
//   const accountId = await generateCustomUserId();

//   if (!docSnap.exists()) {
//     const [firstName, lastName = ""] = user.displayName
//       ? user.displayName.split(" ")
//       : ["", ""];

//     await setDoc(userRef, {
//       accountId,
//       email: user.email,
//       firstName,
//       lastName,
//       displayName: user.displayName || "",
//       photoURL: user.photoURL,
//       provider: "google",
//       createdAt: new Date(),
//       acceptedTerms: false,
//     });

//     await giveDefaultCredits(user.uid);
//   }

//   const finalSnap = await getDoc(userRef);
//   return finalSnap.data();
// };


// // --- EMAIL SIGNUP ---
// // export const emailSignup = async (firstName, lastName, email, password) => {
// //   const userCred = await createUserWithEmailAndPassword(auth, email, password);

// //   // ✅ update Firebase Auth profile
// //   await updateProfile(userCred.user, {
// //     displayName: `${firstName} ${lastName}`,
// //     photoURL: "" // keep empty so we can fallback to initials
// //   });

// //   const userRef = doc(db, "Users", userCred.user.uid);
// //   const accountId = await generateCustomUserId();
// //   await setDoc(userRef, {
// //     accountId,
// //     email,
// //     firstName,
// //     lastName,
// //     displayName: `${firstName} ${lastName}`,
// //     photoURL: "",
// //     createdAt: new Date(),
// //     acceptedTerms: false,
// //   });

// //   // ✅ Add default credits for new user
// //   await giveDefaultCredits(userCred.user.uid);

// //   await sendEmailVerification(userCred.user, {
// //     url: "http://localhost:5173/login",
// //     handleCodeInApp: true,
// //   });

// //   return (await getDoc(userRef)).data();
// // };

// // --- EMAIL SIGNUP ---
// export const emailSignup = async (firstName, lastName, email, password) => {
//   // ✅ Check if already registered with Google
//   const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//   if (signInMethods.includes("google.com")) {
//     throw new Error("This email is already registered with Google. Please login using Google.");
//   }

//   const userCred = await createUserWithEmailAndPassword(auth, email, password);

//   await updateProfile(userCred.user, {
//     displayName: `${firstName} ${lastName}`,
//     photoURL: ""
//   });

//   const userRef = doc(db, "Users", userCred.user.uid);
//   const accountId = await generateCustomUserId();
//   await setDoc(userRef, {
//     accountId,
//     email,
//     firstName,
//     lastName,
//     displayName: `${firstName} ${lastName}`,
//     photoURL: "",
//     createdAt: new Date(),
//     acceptedTerms: false,
//     provider: "email", // ✅ mark provider
//   });

//   await giveDefaultCredits(userCred.user.uid);

//   await sendEmailVerification(userCred.user, {
//     url: "http://localhost:5173/login",
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
//   return snap.data();
// };

// // --- LOGOUT ---
// export const logout = async () => {
//   return await signOut(auth);
// };

// // --- VERIFY EMAIL CODE ---
// export const verifyEmailCode = async (actionCode) => {
//   await applyActionCode(auth, actionCode);
// };

// // --- RESET PASSWORD ---
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
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth, googleProvider, db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

// --- Default Credits for all services ---
const DEFAULT_CREDITS = [
  {
    serviceId: "CL_SER_1",
    total: 100,
    used: 0,
    available: 100,
    equivalent: "100 pages",
  },
  {
    serviceId: "CL_SER_2",
    total: 50,
    used: 0,
    available: 50,
    equivalent: "50 pages",
  },
];

// --- Generate custom userId ---
const generateCustomUserId = async () => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, orderBy("accountId", "desc"), limit(1));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const lastId = snapshot.docs[0].data().accountId;
    const parts = lastId.split("_");
    const lastNum = parseInt(parts[2] || "1000", 10);
    return `CL_USR_${lastNum + 1}`;
  }
  return "CL_USR_1001";
};

// --- Helper: give default credits per service ---
const giveDefaultCredits = async (userId) => {
  for (const credit of DEFAULT_CREDITS) {
    const creditRef = doc(
      collection(db, "Credits", userId, "UserCredits"),
      credit.serviceId
    );
    await setDoc(creditRef, credit);
  }
};

// --- Finalize Google user creation ---
const finalizeGoogleUser = async (user) => {
  const userRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(userRef);
  const accountId = await generateCustomUserId();

  if (!docSnap.exists()) {
    const [firstName, lastName = ""] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];

    await setDoc(userRef, {
      accountId,
      email: user.email,
      firstName,
      lastName,
      displayName: user.displayName || "",
      photoURL: user.photoURL,
      provider: "google",
      createdAt: new Date(),
      acceptedTerms: false,
    });

    await giveDefaultCredits(user.uid);
  }

  const finalSnap = await getDoc(userRef);
  return finalSnap.data();
};

// --- GOOGLE AUTH ---
export const googleAuth = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // ✅ Check if email already exists with Email/Password
  const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

  if (signInMethods.includes("password") && !signInMethods.includes("google.com")) {
    // Email/Password exists but no Google → block Google login
    await signOut(auth);
    throw new Error(
      "This email is already registered with Email/Password. Please login using Email."
    );
  }

  // If Google is already linked or new → continue
  return finalizeGoogleUser(user);
};

// --- EMAIL SIGNUP ---
export const emailSignup = async (firstName, lastName, email, password) => {
  // ✅ Check if already registered with Google
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  if (signInMethods.includes("google.com")) {
    throw new Error(
      "This email is already registered with Google. Please login using Google."
    );
  }

  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(userCred.user, {
    displayName: `${firstName} ${lastName}`,
    photoURL: "",
  });

  const userRef = doc(db, "Users", userCred.user.uid);
  const accountId = await generateCustomUserId();
  await setDoc(userRef, {
    accountId,
    email,
    firstName,
    lastName,
    displayName: `${firstName} ${lastName}`,
    photoURL: "",
    createdAt: new Date(),
    acceptedTerms: false,
    provider: "email",
  });

  await giveDefaultCredits(userCred.user.uid);

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
  return snap.data();
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

// // src/firebase_config/authService.js
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
//   fetchSignInMethodsForEmail,
// } from "firebase/auth";

// import { auth, googleProvider, db } from "./config";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   collection,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   where,
// } from "firebase/firestore";

// /* ---------------- Defaults ---------------- */
// const DEFAULT_CREDITS = [
//   { serviceId: "CL_SER_1", total: 100, used: 0, available: 100 },
//   { serviceId: "CL_SER_2", total: 50, used: 0, available: 50 },
// ];

// /* ---------------- Helpers ---------------- */
// const generateCustomUserId = async () => {
//   const usersRef = collection(db, "Users");
//   const q = query(usersRef, orderBy("accountId", "desc"), limit(1));
//   const snapshot = await getDocs(q);

//   if (!snapshot.empty) {
//     const lastId = snapshot.docs[0].data().accountId || "CL_USR_1000";
//     const parts = lastId.split("_");
//     const lastNum = parseInt(parts[2] || "1000", 10);
//     return `CL_USR_${lastNum + 1}`;
//   }
//   return "CL_USR_1001";
// };

// const giveDefaultCredits = async (userId) => {
//   for (const credit of DEFAULT_CREDITS) {
//     const q = query(
//       collection(db, "Services"),
//       where("id", "==", credit.serviceId)
//     );
//     const snap = await getDocs(q);

//     let equivalent = "";
//     if (!snap.empty) {
//       equivalent = snap.docs[0].data().equivalent || "";
//     }

//     const creditRef = doc(
//       collection(db, "Credits", userId, "UserCredits"),
//       credit.serviceId
//     );
//     await setDoc(creditRef, {
//       ...credit,
//       equivalent,
//       isActive: true,
//     });
//   }
// };

// const buildUserResponse = async (firebaseUser, firestoreData = {}) => {
//   const tokenResult = await firebaseUser.getIdTokenResult(true);

//   const userData = {
//     uid: firebaseUser.uid,
//     email: firebaseUser.email,
//     displayName: firebaseUser.displayName || firestoreData?.displayName || "",
//     photoURL: firebaseUser.photoURL || firestoreData?.photoURL || "",
//     acceptedTerms: firestoreData?.acceptedTerms || false,
//     isAdmin: !!tokenResult?.claims?.admin,
//   };

//   try {
//     localStorage.setItem("userData", JSON.stringify(userData));
//   } catch (err) {
//     console.warn("Could not write userData to localStorage:", err);
//   }

//   return userData;
// };

// /* ---------------- Google Auth ---------------- */
// const finalizeGoogleUser = async (user) => {
//   const userRef = doc(db, "Users", user.uid);
//   const docSnap = await getDoc(userRef);

//   if (!docSnap.exists()) {
//     const [firstName, lastName = ""] = user.displayName
//       ? user.displayName.split(" ")
//       : ["", ""];
//     const accountId = await generateCustomUserId();

//     await setDoc(userRef, {
//       accountId,
//       email: user.email,
//       firstName,
//       lastName,
//       displayName: user.displayName || "",
//       photoURL: user.photoURL || "",
//       provider: "google",
//       createdAt: new Date(),
//       acceptedTerms: false,
//     });

//     await giveDefaultCredits(user.uid);
//   }

//   return (await getDoc(userRef)).data();
// };

// export const googleAuth = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     // Collision check
//     try {
//       const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
//       if (
//         signInMethods.includes("password") &&
//         !signInMethods.includes("google.com")
//       ) {
//         await signOut(auth);
//         throw new Error(
//           "This email is already registered with password. Please use email login."
//         );
//       }
//     } catch (innerErr) {
//       console.warn("fetchSignInMethodsForEmail warning:", innerErr);
//     }

//     const firestoreUser = await finalizeGoogleUser(user);
//     return await buildUserResponse(user, firestoreUser);
//   } catch (err) {
//     console.error("googleAuth error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error("Google sign-in failed. Please try again.");
//   }
// };

// /* ---------------- Email Signup ---------------- */
// export const emailSignup = async (firstName, lastName, email, password) => {
//   try {
//     const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//     if (
//       signInMethods.includes("google.com") &&
//       !signInMethods.includes("password")
//     ) {
//       throw new Error(
//         "This email is already registered with Google. Try the Google sign-in option."
//       );
//     }

//     const userCred = await createUserWithEmailAndPassword(auth, email, password);

//     await updateProfile(userCred.user, {
//       displayName: `${firstName} ${lastName}`,
//       photoURL: "",
//     });

//     const userRef = doc(db, "Users", userCred.user.uid);
//     const accountId = await generateCustomUserId();

//     await setDoc(userRef, {
//       accountId,
//       email,
//       firstName,
//       lastName,
//       displayName: `${firstName} ${lastName}`,
//       photoURL: "",
//       createdAt: new Date(),
//       acceptedTerms: false,
//       provider: "email",
//     });

//     await giveDefaultCredits(userCred.user.uid);

//     await sendEmailVerification(userCred.user, {
//       url: "http://localhost:5173/login",
//       handleCodeInApp: true,
//     });

//     const dbData = (await getDoc(userRef)).data();
//     return await buildUserResponse(userCred.user, dbData);
//   } catch (err) {
//     console.error("emailSignup error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error("Signup failed. Please try again or use a different email.");
//   }
// };

// /* ---------------- Email Login (fixed) ---------------- */
// export const emailLogin = async (email, password) => {
//   try {
//     const userCred = await signInWithEmailAndPassword(auth, email, password);

//     if (!userCred.user.emailVerified) {
//       await signOut(auth);
//       throw new Error("Please verify your email before logging in.");
//     }

//     const userRef = doc(db, "Users", userCred.user.uid);
//     let firestoreUser = (await getDoc(userRef)).data();

//     // 🔥 FIX: create missing Users doc (for old accounts)
//     if (!firestoreUser) {
//       const accountId = await generateCustomUserId();
//       await setDoc(userRef, {
//         accountId,
//         email: userCred.user.email,
//         displayName: userCred.user.displayName || "",
//         photoURL: userCred.user.photoURL || "",
//         provider: "email",
//         createdAt: new Date(),
//         acceptedTerms: false,
//       });
//       await giveDefaultCredits(userCred.user.uid);
//       firestoreUser = (await getDoc(userRef)).data();
//     }

//     return await buildUserResponse(userCred.user, firestoreUser);
//   } catch (err) {
//     console.error("emailLogin error:", err);
//     throw err instanceof Error ? err : new Error("Invalid email or password.");
//   }
// };

// /* ---------------- Logout ---------------- */
// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (err) {
//     console.error("signOut error:", err);
//   } finally {
//     try {
//       localStorage.removeItem("userData");
//     } catch (err) {
//       console.warn("Could not remove userData from localStorage:", err);
//     }
//   }
// };

// /* ---------------- Verify Email Code ---------------- */
// export const verifyEmailCode = async (actionCode) => {
//   try {
//     return await applyActionCode(auth, actionCode);
//   } catch (err) {
//     console.error("verifyEmailCode error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error("Invalid or expired verification code.");
//   }
// };

// /* ---------------- Reset Password ---------------- */
// export const sendResetPassword = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email, {
//       url: "http://localhost:5173/login",
//     });
//   } catch (err) {
//     console.error("sendResetPassword error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error(
//         "If this email is registered, a reset link has been sent."
//       );
//   }
// };

// export const confirmResetPassword = async (oobCode, newPassword) => {
//   try {
//     await confirmPasswordReset(auth, oobCode, newPassword);
//   } catch (err) {
//     console.error("confirmResetPassword error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error(
//         "Failed to reset password. The link may be invalid or expired."
//       );
//   }
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
//   fetchSignInMethodsForEmail,
// } from "firebase/auth";

// import { auth, googleProvider, db } from "./config";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   collection,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   where,
// } from "firebase/firestore";

// /* ---------------- Defaults ---------------- */
// const DEFAULT_CREDITS = [
//   { serviceId: "CL_SER_1", total: 100, used: 0, available: 100 },
//   { serviceId: "CL_SER_2", total: 50, used: 0, available: 50 },
// ];

// /* ---------------- Helpers ---------------- */
// const generateCustomUserId = async () => {
//   const usersRef = collection(db, "Users");
//   const q = query(usersRef, orderBy("accountId", "desc"), limit(1));
//   const snapshot = await getDocs(q);

//   if (!snapshot.empty) {
//     const lastId = snapshot.docs[0].data().accountId || "CL_USR_1000";
//     const parts = lastId.split("_");
//     const lastNum = parseInt(parts[2] || "1000", 10);
//     return `CL_USR_${lastNum + 1}`;
//   }
//   return "CL_USR_1001";
// };

// const giveDefaultCredits = async (userId) => {
//   for (const credit of DEFAULT_CREDITS) {
//     const q = query(
//       collection(db, "Services"),
//       where("id", "==", credit.serviceId)
//     );
//     const snap = await getDocs(q);

//     let equivalent = "";
//     if (!snap.empty) {
//       equivalent = snap.docs[0].data().equivalent || "";
//     }

//     const creditRef = doc(
//       collection(db, "Credits", userId, "UserCredits"),
//       credit.serviceId
//     );
//     await setDoc(creditRef, {
//       ...credit,
//       equivalent,
//       isActive: true,
//     });
//   }
// };

// const buildUserResponse = async (firebaseUser, firestoreData = {}) => {
//   const tokenResult = await firebaseUser.getIdTokenResult(true);

//   const userData = {
//     uid: firebaseUser.uid,
//     email: firebaseUser.email,
//     displayName: firebaseUser.displayName || firestoreData?.displayName || "",
//     photoURL: firebaseUser.photoURL || firestoreData?.photoURL || "",
//     acceptedTerms: firestoreData?.acceptedTerms || false,
//     isAdmin: !!tokenResult?.claims?.admin,
//   };

//   try {
//     localStorage.setItem("userData", JSON.stringify(userData));
//   } catch (err) {
//     console.warn("Could not write userData to localStorage:", err);
//   }

//   return userData;
// };

// /* ---------------- Google Auth ---------------- */
// const finalizeGoogleUser = async (user) => {
//   const userRef = doc(db, "Users", user.uid);
//   const docSnap = await getDoc(userRef);

//   if (!docSnap.exists()) {
//     const [firstName, lastName = ""] = user.displayName
//       ? user.displayName.split(" ")
//       : ["", ""];
//     const accountId = await generateCustomUserId();

//     await setDoc(userRef, {
//       accountId,
//       email: user.email,
//       firstName,
//       lastName,
//       displayName: user.displayName || "",
//       photoURL: user.photoURL || "",
//       provider: "google",
//       createdAt: new Date(),
//       acceptedTerms: false,
//     });

//     await giveDefaultCredits(user.uid);
//   }

//   return (await getDoc(userRef)).data();
// };

// export const googleAuth = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     // Collision check
//     try {
//       const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
//       if (
//         signInMethods.includes("password") &&
//         !signInMethods.includes("google.com")
//       ) {
//         await signOut(auth);
//         throw new Error(
//           "This email is already registered with password. Please use email login."
//         );
//       }
//     } catch (innerErr) {
//       console.warn("fetchSignInMethodsForEmail warning:", innerErr);
//     }

//     const firestoreUser = await finalizeGoogleUser(user);
//     return await buildUserResponse(user, firestoreUser);
//   } catch (err) {
//     console.error("googleAuth error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error("Google sign-in failed. Please try again.");
//   }
// };

// /* ---------------- Email Signup ---------------- */
// export const emailSignup = async (firstName, lastName, email, password) => {
//   try {
//     const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//     if (
//       signInMethods.includes("google.com") &&
//       !signInMethods.includes("password")
//     ) {
//       throw new Error(
//         "This email is already registered with Google. Try the Google sign-in option."
//       );
//     }

//     const userCred = await createUserWithEmailAndPassword(auth, email, password);

//     await updateProfile(userCred.user, {
//       displayName: `${firstName} ${lastName}`,
//       photoURL: "",
//     });

//     const userRef = doc(db, "Users", userCred.user.uid);
//     const accountId = await generateCustomUserId();

//     await setDoc(userRef, {
//       accountId,
//       email,
//       firstName,
//       lastName,
//       displayName: `${firstName} ${lastName}`,
//       photoURL: "",
//       createdAt: new Date(),
//       acceptedTerms: false,
//       provider: "email",
//     });

//     await giveDefaultCredits(userCred.user.uid);

//     // ✅ FIXED: correct ActionCodeSettings
//     const actionCodeSettings = {
//       url: "http://localhost:5173/login",
//       handleCodeInApp: true,
//     };
//     await sendEmailVerification(userCred.user, actionCodeSettings);

//     const dbData = (await getDoc(userRef)).data();
//     return await buildUserResponse(userCred.user, dbData);
//   } catch (err) {
//     console.error("emailSignup error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error("Signup failed. Please try again or use a different email.");
//   }
// };

// /* ---------------- Email Login (fixed) ---------------- */
// export const emailLogin = async (email, password) => {
//   try {
//     const userCred = await signInWithEmailAndPassword(auth, email, password);

//     if (!userCred.user.emailVerified) {
//       await signOut(auth);
//       throw new Error("Please verify your email before logging in.");
//     }

//     const userRef = doc(db, "Users", userCred.user.uid);
//     let firestoreUser = (await getDoc(userRef)).data();

//     // 🔥 FIX: create missing Users doc (for old accounts)
//     if (!firestoreUser) {
//       const accountId = await generateCustomUserId();
//       await setDoc(userRef, {
//         accountId,
//         email: userCred.user.email,
//         displayName: userCred.user.displayName || "",
//         photoURL: userCred.user.photoURL || "",
//         provider: "email",
//         createdAt: new Date(),
//         acceptedTerms: false,
//       });
//       await giveDefaultCredits(userCred.user.uid);
//       firestoreUser = (await getDoc(userRef)).data();
//     }

//     return await buildUserResponse(userCred.user, firestoreUser);
//   } catch (err) {
//     console.error("emailLogin error:", err);
//     throw err instanceof Error ? err : new Error("Invalid email or password.");
//   }
// };

// /* ---------------- Logout ---------------- */
// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (err) {
//     console.error("signOut error:", err);
//   } finally {
//     try {
//       localStorage.removeItem("userData");
//     } catch (err) {
//       console.warn("Could not remove userData from localStorage:", err);
//     }
//   }
// };

// /* ---------------- Verify Email Code ---------------- */
// export const verifyEmailCode = async (actionCode) => {
//   try {
//     return await applyActionCode(auth, actionCode);
//   } catch (err) {
//     console.error("verifyEmailCode error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error("Invalid or expired verification code.");
//   }
// };

// /* ---------------- Reset Password ---------------- */
// export const sendResetPassword = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email, {
//       url: "http://localhost:5173/login",
//     });
//   } catch (err) {
//     console.error("sendResetPassword error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error(
//           "If this email is registered, a reset link has been sent."
//         );
//   }
// };

// export const confirmResetPassword = async (oobCode, newPassword) => {
//   try {
//     await confirmPasswordReset(auth, oobCode, newPassword);
//   } catch (err) {
//     console.error("confirmResetPassword error:", err);
//     throw err instanceof Error
//       ? err
//       : new Error(
//           "Failed to reset password. The link may be invalid or expired."
//         );
//   }
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
  where,
} from "firebase/firestore";

/* ---------------- Defaults ---------------- */
const DEFAULT_CREDITS = [
  { serviceId: "CL_SER_1", total: 100, used: 0, available: 100 },
  { serviceId: "CL_SER_2", total: 50, used: 0, available: 50 },
];

/* ---------------- Helpers ---------------- */
const generateCustomUserId = async () => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, orderBy("accountId", "desc"), limit(1));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const lastId = snapshot.docs[0].data().accountId || "CL_USR_1000";
    const parts = lastId.split("_");
    const lastNum = parseInt(parts[2] || "1000", 10);
    return `CL_USR_${lastNum + 1}`;
  }
  return "CL_USR_1001";
};

const giveDefaultCredits = async (userId) => {
  for (const credit of DEFAULT_CREDITS) {
    const q = query(
      collection(db, "Services"),
      where("id", "==", credit.serviceId)
    );
    const snap = await getDocs(q);

    let equivalent = "";
    if (!snap.empty) {
      equivalent = snap.docs[0].data().equivalent || "";
    }

    const creditRef = doc(
      collection(db, "Credits", userId, "UserCredits"),
      credit.serviceId
    );
    await setDoc(creditRef, {
      ...credit,
      equivalent,
      isActive: true,
    });
  }
};

const buildUserResponse = async (firebaseUser, firestoreData = {}) => {
  const tokenResult = await firebaseUser.getIdTokenResult(true);

  const userData = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || firestoreData?.displayName || "",
    photoURL: firebaseUser.photoURL || firestoreData?.photoURL || "",
    acceptedTerms: firestoreData?.acceptedTerms || false,
    isAdmin: !!tokenResult?.claims?.admin,
  };

  try {
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (err) {
    console.warn("Could not write userData to localStorage:", err);
  }

  return userData;
};

/* ---------------- Google Auth ---------------- */
const finalizeGoogleUser = async (user) => {
  const userRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const [firstName, lastName = ""] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const accountId = await generateCustomUserId();

    await setDoc(userRef, {
      accountId,
      email: user.email,
      firstName,
      lastName,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      provider: "google",
      createdAt: new Date(),
      acceptedTerms: false,
    });

    await giveDefaultCredits(user.uid);
  }

  return (await getDoc(userRef)).data();
};

export const googleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Collision check
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
      if (
        signInMethods.includes("password") &&
        !signInMethods.includes("google.com")
      ) {
        await signOut(auth);
        throw new Error(
          "This email is already registered with password. Please use email login."
        );
      }
    } catch (innerErr) {
      console.warn("fetchSignInMethodsForEmail warning:", innerErr);
    }

    const firestoreUser = await finalizeGoogleUser(user);
    return await buildUserResponse(user, firestoreUser);
  } catch (err) {
    console.error("googleAuth error:", err);
    throw err instanceof Error
      ? err
      : new Error("Google sign-in failed. Please try again.");
  }
};

/* ---------------- Email Signup ---------------- */
export const emailSignup = async (firstName, lastName, email, password) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (
      signInMethods.includes("google.com") &&
      !signInMethods.includes("password")
    ) {
      throw new Error(
        "This email is already registered with Google. Try the Google sign-in option."
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

    // ✅ FIXED: Removed handleCodeInApp (not needed for email verification)
    const actionCodeSettings = {
      url: "http://localhost:5173/login", // make sure this is in your Firebase authorized domains
    };
    await sendEmailVerification(userCred.user, actionCodeSettings);

    const dbData = (await getDoc(userRef)).data();
    return await buildUserResponse(userCred.user, dbData);
  } catch (err) {
    console.error("emailSignup error:", err);
    throw err instanceof Error
      ? err
      : new Error("Signup failed. Please try again or use a different email.");
  }
};

/* ---------------- Email Login (fixed) ---------------- */
export const emailLogin = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    if (!userCred.user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }

    const userRef = doc(db, "Users", userCred.user.uid);
    let firestoreUser = (await getDoc(userRef)).data();

    // 🔥 FIX: create missing Users doc (for old accounts)
    if (!firestoreUser) {
      const accountId = await generateCustomUserId();
      await setDoc(userRef, {
        accountId,
        email: userCred.user.email,
        displayName: userCred.user.displayName || "",
        photoURL: userCred.user.photoURL || "",
        provider: "email",
        createdAt: new Date(),
        acceptedTerms: false,
      });
      await giveDefaultCredits(userCred.user.uid);
      firestoreUser = (await getDoc(userRef)).data();
    }

    return await buildUserResponse(userCred.user, firestoreUser);
  } catch (err) {
    console.error("emailLogin error:", err);
    throw err instanceof Error ? err : new Error("Invalid email or password.");
  }
};

/* ---------------- Logout ---------------- */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("signOut error:", err);
  } finally {
    try {
      localStorage.removeItem("userData");
    } catch (err) {
      console.warn("Could not remove userData from localStorage:", err);
    }
  }
};

/* ---------------- Verify Email Code ---------------- */
export const verifyEmailCode = async (actionCode) => {
  try {
    return await applyActionCode(auth, actionCode);
  } catch (err) {
    console.error("verifyEmailCode error:", err);
    throw err instanceof Error
      ? err
      : new Error("Invalid or expired verification code.");
  }
};

/* ---------------- Reset Password ---------------- */
export const sendResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:5173/login",
    });
  } catch (err) {
    console.error("sendResetPassword error:", err);
    throw err instanceof Error
      ? err
      : new Error(
          "If this email is registered, a reset link has been sent."
        );
  }
};

export const confirmResetPassword = async (oobCode, newPassword) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (err) {
    console.error("confirmResetPassword error:", err);
    throw err instanceof Error
      ? err
      : new Error(
          "Failed to reset password. The link may be invalid or expired."
        );
  }
};

// // src/components/PrivateRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase_config/config"; // adjust path

// const PrivateRoute = ({ children }) => {
//   const [user, loading] = useAuthState(auth);

//   if (loading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return user ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase_config/config";
// import { doc, getDoc } from "firebase/firestore";

// const PrivateRoute = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
//   const [accepted, setAccepted] = useState(null);

//   useEffect(() => {
//     const checkTerms = async () => {
//       if (user) {
//         const snap = await getDoc(doc(db, "Users", user.uid));
//         setAccepted(snap.exists() ? snap.data().acceptedTerms || false : false);
//       }
//     };
//     checkTerms();
//   }, [user]);

//   if (loading || accepted === null) return <p>Loading...</p>;

//   // if (!user) return <Navigate to="/login" />;
//   if (!user) return <Navigate to="/" />;

//   if (!accepted) return <Navigate to="/terms" />;

//   return children;
// };

// export default PrivateRoute;

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase_config/config";
// import { doc, getDoc } from "firebase/firestore";

// const PrivateRoute = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
//   const [accepted, setAccepted] = useState(null);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const checkTerms = async () => {
//       if (user) {
//         const snap = await getDoc(doc(db, "Users", user.uid));
//         setAccepted(snap.exists() ? snap.data().acceptedTerms || false : false);
//       }
//       setChecking(false);
//     };

//     if (!loading) {
//       checkTerms();
//     }
//   }, [user, loading]);

//   // Wait until Firebase auth + Firestore check are done
//   if (loading || checking) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   // 🚫 Not logged in → send to login (or "/" if you prefer home)
//   if (!user) return <Navigate to="/" replace />;

//   // 📄 User logged in but didn’t accept → force terms
//   if (!accepted) return <Navigate to="/terms" replace />;

//   // ✅ User logged in & accepted → allow route
//   return children;
// };

// export default PrivateRoute;


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase_config/config";
import { doc, getDoc } from "firebase/firestore";
import LoadingScreen from "./Loading";
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [accepted, setAccepted] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkTerms = async () => {
      if (user) {
        const snap = await getDoc(doc(db, "Users", user.uid));
        if (snap.exists()) {
          setAccepted(snap.data().acceptedTerms || false);
        } else {
          setAccepted(false);
        }
      }
      setChecking(false);
    };

    if (!loading) checkTerms();
  }, [user, loading]);

  // Still checking user or terms
  if (loading || checking) {
    // return <div className="flex justify-center items-center h-screen">Loading...</div>;
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Not logged in → send to home/login
  if (!user) return <Navigate to="/" replace />;

  // Logged in but not accepted terms → force terms page
  if (!accepted) return <Navigate to="/terms" replace />;

  // Logged in & accepted → allow dashboard
  return children;
};

export default PrivateRoute;

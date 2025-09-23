import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase_config/config";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const tokenResult = await firebaseUser.getIdTokenResult(true);

        const userRef = doc(db, "Users", firebaseUser.uid);
        const dbData = (await getDoc(userRef)).data();

        const data = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName:
            firebaseUser.displayName || dbData?.displayName || "",
          photoURL: firebaseUser.photoURL || dbData?.photoURL || "",
          acceptedTerms: dbData?.acceptedTerms || false,
          isAdmin: !!tokenResult.claims.admin,
        };

        setUserDetails(data);
        localStorage.setItem("userData", JSON.stringify(data));
      } else {
        setUserDetails(null);
        localStorage.removeItem("userData");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

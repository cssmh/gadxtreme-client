import app from "./firebase.config";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { clearCookie, setToken } from "../Api/auth";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  
  const changePassword = (newPass) => {
    return updatePassword(auth.currentUser, newPass);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    await clearCookie();
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const userEmail = currentUser?.email || user?.email;
      try {
        if (userEmail) {
          await setToken(userEmail);
        } else {
          await clearCookie();
        }
      } catch (error) {
        console.log("Error during state change", error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  const authInfo = {
    user,
    createUser,
    updateProfileInfo,
    login,
    logOut,
    loading,
    changePassword,
    googleLogin,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;

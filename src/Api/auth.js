import { getAuth, signOut } from "firebase/auth";
import app from "../Shared/firebase.config";
import axiosSecure from ".";
const auth = getAuth(app);

export const saveUser = async (user) => {
  const currentUser = {
    name: user?.displayName || "anonymous",
    email: user?.email,
    photo: user?.photoURL || import.meta.env.VITE_Default_URL,
    timestamp: [user.metadata?.createdAt, user.reloadUserInfo?.lastLoginAt],
  };
  const { data } = await axiosSecure.put("/add-user", currentUser);
  return data;
};

export const userLogout = async () => {
  return await signOut(auth);
};

export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  return data;
};

export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  return data;
};

export const updateRole = async (email, role) => {
  const { data } = await axiosSecure.patch(`/user-update/${email}`, { role });
  return data;
};

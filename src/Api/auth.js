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
  const { data } = await axiosSecure.put("/api/add-user", currentUser);
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

export const getAllUsers = async (searchTerm) => {
  const { data } = await axiosSecure(`/api/all-users?search=${searchTerm}`);
  return data;
};

export const getRole = async (email) => {
  const { data } = await axiosSecure(`/api/get-role/${email}`);
  return data;
};

export const updateRole = async (email, role) => {
  const { data } = await axiosSecure.patch(`/api/user-update/${email}`, { role });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosSecure.delete(`/user/${id}`);
  return data;
};

export const sslPay = async (order) => {
  const { data } = await axiosSecure.post("/payment-gateway", order);
  return data;
};

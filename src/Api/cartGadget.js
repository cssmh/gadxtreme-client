import axiosSecure from ".";

export const postCart = async (cartInfo) => {
  const { data } = await axiosSecure.post("/api/cart", cartInfo);
  return data;
};

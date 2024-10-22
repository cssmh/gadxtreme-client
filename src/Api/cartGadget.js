import axiosSecure from ".";

export const postCart = async (cartInfo) => {
  const { data } = await axiosSecure.post("/api/cart", cartInfo);
  return data;
};

export const myCart = async (email) => {
  const { data } = await axiosSecure(`/api/my-cart?email=${email}`);
  return data;
};

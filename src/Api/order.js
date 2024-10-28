import axiosSecure from ".";

export const placeOrder = async (orderInfo) => {
  const { data } = await axiosSecure.post("/api/place-order", orderInfo);
  return data;
};

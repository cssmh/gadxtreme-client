import axiosSecure from ".";

export const placeOrder = async (orderInfo) => {
  const { data } = await axiosSecure.post("/api/place-order", orderInfo);
  return data;
};

export const getMyOrder = async (email) => {
  const { data } = await axiosSecure(`/api/my-orders?email=${email}`);
  return data;
};

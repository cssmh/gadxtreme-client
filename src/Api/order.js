import axiosSecure from ".";

export const placeOrder = async (orderInfo) => {
  const { data } = await axiosSecure.post("/api/place-order", orderInfo);
  return data;
};

export const getMyOrder = async (email) => {
  const { data } = await axiosSecure(`/api/my-orders?email=${email}`);
  return data;
};

export const getMyReview = async (email) => {
  const { data } = await axiosSecure(`/api/my-review/${email}`);
  return data;
};

export const getMyPendingReview = async (email) => {
  const { data } = await axiosSecure(`/api/my-pending-review/${email}`);
  return data;
};

export const getOrderDetails = async (id) => {
  const { data } = await axiosSecure(`/api/order/${id}`);
  return data;
};
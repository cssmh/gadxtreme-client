import axiosSecure from ".";

export const placeOrder = async (orderInfo) => {
  const { data } = await axiosSecure.post("/api/place-order", orderInfo);
  return data;
};

export const getMyOrder = async (email) => {
  const { data } = await axiosSecure(`/api/my-orders?email=${email}`);
  return data;
};

export const getMyReview = async () => {
  const { data } = await axiosSecure("/api/my-review");
  return data;
};

export const getOrderDetails = async (id) => {
  const { data } = await axiosSecure(`/api/order/${id}`);
  return data;
};

export const getAllOrders = async () => {
  const { data } = await axiosSecure("/api/all-orders");
  return data;
};

export const markOrderDelivered = async (id) => {
  const { data } = await axiosSecure.patch(`/api/orders/${id}/deliver`);
  return data;
};

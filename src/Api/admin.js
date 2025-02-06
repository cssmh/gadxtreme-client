import axiosSecure from "."; 

export const allCart = async () => {
  const { data } = await axiosSecure("/api/all-carts");
  return data;
};

export const postGadget = async (gadInfo) => {
  const { data } = await axiosSecure.post("/api/product", gadInfo);
  return data;
};

export const updateGadget = async (id, updatedDocs) => {
  const { data } = await axiosSecure.put(`/api/product/${id}`, updatedDocs);
  return data;
};

export const totalCounts = async () => {
    const { data } = await axiosSecure("/api/total-counts");
    return data;
};

export const getAllOrders = async () => {
  const { data } = await axiosSecure("/api/all-orders");
  return data;
};

export const deleteOrder = async (id) => {
    const { data } = await axiosSecure.delete(`/api/orders/${id}`);
    return data;
};

export const markOrderDelivered = async (id) => {
  const { data } = await axiosSecure.patch(`/api/orders/${id}/deliver`);
  return data;
};

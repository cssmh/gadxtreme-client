import axiosSecure from ".";

export const postCart = async (cartInfo) => {
  const { data } = await axiosSecure.put("/api/cart", cartInfo);
  return data;
};

export const myDashboard = async (email) => {
  const { data } = await axiosSecure(`/api/my-dashboard?email=${email}`);
  return data;
};

export const myCart = async (email) => {
  const { data } = await axiosSecure(`/api/my-cart?email=${email}`);
  return data;
};

export const deleteMyCart = async (id) => {
  const { data } = await axiosSecure.delete(`/api/cart/${id}`);
  return data;
};

export const updateMyCart = async (id, quantity) => {
  const { data } = await axiosSecure.put(`/api/cart/${id}`, quantity);
  return data;
};

export const addReview = async (id, review) => {
  const { data } = await axiosSecure.put(`/api/add-review/${id}`, {
    reviewText: review,
  });
  return data;
};

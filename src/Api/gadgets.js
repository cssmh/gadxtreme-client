import axiosSecure from ".";

export const postGadget = async (gadInfo) => {
  const { data } = await axiosSecure.post("/api/product", gadInfo);
  return data;
};

export const getAllGadget = async () => {
  const { data } = await axiosSecure("/api/products");
  return data;
};

export const getGadget = async (id) => {
  const { data } = await axiosSecure(`/api/product/${id}`);
  return data;
};

export const updateGadget = async (id, updatedDocs) => {
  const { data } = await axiosSecure.put(`/api/product/${id}`, updatedDocs);
  return data;
};

export const deleteGadget = async (id) => {
  const { data } = await axiosSecure.delete(`/api/product/${id}`);
  return data;
};

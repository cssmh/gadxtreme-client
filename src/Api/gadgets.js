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

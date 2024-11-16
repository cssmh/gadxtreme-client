import axiosSecure from ".";

export const postGadget = async (gadInfo) => {
  const { data } = await axiosSecure.post("/api/product", gadInfo);
  return data;
};

export const getAllGadget = async () => {
  const { data } = await axiosSecure("/api/all-products");
  return data;
};

export const getNewArrival = async () => {
  const { data } = await axiosSecure("/api/new-arrival");
  return data;
};

export const getPopularGadget = async (skip, limit) => {
  const api = `/api/popular-gadget?skip=${skip}&limit=${limit}`;
  const { data } = await axiosSecure(api);
  return data;
};

export const getCategoryGadget = async (category, page, limit) => {
  const api = `/api/products/${category}?page=${page}&limit=${limit}`;
  const { data } = await axiosSecure(api);
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

export const getSearchGadget = async (search) => {
  const { data } = await axiosSecure(`/api/search-products?search=${search}`);
  return data;
};

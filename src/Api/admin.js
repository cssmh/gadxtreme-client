import axiosSecure from "."; 

export const totalCounts = async () => {
    const { data } = await axiosSecure("/api/total-counts");
    return data;
};

export const deleteOrrder = async (id) => {
    const { data } = await axiosSecure.delete(`/api/orders/${id}`);
    return data;
};
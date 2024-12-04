import axiosSecure from "."; 

export const totalCounts = async () => {
    const { data } = await axiosSecure("/api/total-counts");
    return data;
};
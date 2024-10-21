import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getMyFoods } from "../api/Foods";

const useMyFoods = () => {
  const { loading, user } = useAuth();
  const {
    data: myFoods = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myFoods", user?.email],
    queryFn: async () => {
      return await getMyFoods(user?.email);
    },
    enabled: !loading && !!user?.email,
  });
  return { isLoading, myFoods, refetch, user };
};

export default useMyFoods;

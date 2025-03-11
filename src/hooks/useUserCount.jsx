import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { myDashboard } from "../Api/cartGadget";

const useUserCount = () => {
  const { loading, user } = useAuth();
  const { isLoading, data = {}, refetch } = useQuery({
    queryKey: ["userCount", user?.email],
    queryFn: () => myDashboard(user?.email),
    enabled: !loading && !!user?.email,
  });
  return { user, isLoading, data, refetch };
};

export default useUserCount;

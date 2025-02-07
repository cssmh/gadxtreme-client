import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getRole } from "../Api/auth";

const useAdmin = () => {
  const { loading, user } = useAuth();
  const { data: role = " ", isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: () => getRole(user?.email),
    enabled: !loading && !!user?.email,
  });

  const isLoading = loading || roleLoading;
  const isAdmin = role === "admin";
  return { isAdmin, isLoading };
};

export default useAdmin;

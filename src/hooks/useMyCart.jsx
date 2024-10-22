import { useQuery } from "@tanstack/react-query";
import { myCart } from "../Api/cartGadget";
import useAuth from "./useAuth";

const useMyCart = () => {
  const { loading, user } = useAuth();
  const {
    data: myCartData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myCart", user?.email],
    queryFn: () => myCart(user?.email),
    enabled: !loading && !!user?.email,
  });
  return { isLoading, myCartData, refetch };
};

export default useMyCart;

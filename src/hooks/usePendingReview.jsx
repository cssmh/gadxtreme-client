import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getMyPendingReview } from "../Api/order";

const usePendingReview = () => {
  const { loading, user } = useAuth();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingReviews"],
    queryFn: () => getMyPendingReview(user?.email),
    enabled: !loading && !!user,
  });

  const pending = data?.result;
  const total = data?.total;
  return { pending, total, isLoading, refetch };
};

export default usePendingReview;

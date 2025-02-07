import { useQuery } from "@tanstack/react-query";

const useFetchData = (queryKey, queryFn) => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn,
  });

  return { data, isLoading, refetch };
};

export default useFetchData;

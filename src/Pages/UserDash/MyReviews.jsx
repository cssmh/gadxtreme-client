import { useQuery } from "@tanstack/react-query";
import { getMyReview } from "../../Api/order";
import BigLoader from "../../Component/Loaders/BigLoader";
import useAuth from "../../hooks/useAuth";

const MyReviews = () => {
  const { loading, user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: () => getMyReview(user?.email),
    enabled: !loading && !!user,
  });

  if (isLoading) return <BigLoader size="96" />;

  return (
    <div className="max-w-4xl 2xl:max-w-[74%] mx-auto p-2 md:p-5">
      <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-center text-gray-900 mb-3">
        My <span className="text-[#00a9e1]">Reviews</span>
      </h1>
      {data?.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          You haven&apos;t reviewed any orders yet.
        </div>
      ) : (
        <>
          {data?.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg"
              // transition duration-300 ease-in-out transform hover:scale-105
            >
              <div className="flex justify-between mb-3">
                <div>
                  {order?.cartItems?.map((item, index) => (
                    <p
                      key={index}
                      className="font-medium text-sm 2xl:text-base mb-1"
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
                <span className="font-medium text-sm 2xl:text-base">
                  {new Date(order.orderPlaced).toLocaleDateString("en-GB")}{" "}
                  {new Date(order.orderPlaced).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="text-lg 2xl:text-xl font-semibold text-gray-900">
                {order.name}
              </div>
              <div className="text-gray-700 text-base 2xl:text-lg mb-4">
                <p className="font-medium">Review:</p>
                <p>{order.customerReview}</p>
                <span className="text-xs 2xl:text-sm">
                  {new Date(order.reviewAdded).toLocaleDateString("en-GB")}{" "}
                  {new Date(order.reviewAdded).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm 2xl:text-base text-gray-500">
                <span>
                  Status:{" "}
                  <span className="font-semibold text-gray-700">
                    {order.status}
                  </span>
                </span>
                <span>
                  Amount:{" "}
                  <span className="font-semibold text-gray-700">
                    ${order.totalAmount}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MyReviews;

import { useQuery } from "@tanstack/react-query";
import { getMyReview } from "../../Api/order";
import BigLoader from "../../Component/BigLoader";

const MyReviews = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => await getMyReview(),
  });
  console.log(data);
  if (isLoading) return <BigLoader size="96" />;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        My Reviews
      </h1>

      {data.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          You haven&apos;t reviewed any orders yet.
        </div>
      ) : (
        <div>
          {data.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <p className="font-medium text-sm mb-1">
                {order?.cartItems[0]?.name}
              </p>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold text-gray-900">
                  {order.name}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.orderPlaced).toLocaleDateString()}
                </div>
              </div>
              <div className="text-gray-700 text-base mb-4">
                <p className="font-medium">Review:</p>

                <p>{order.customerReview}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
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
        </div>
      )}
    </div>
  );
};

export default MyReviews;

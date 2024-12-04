import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyOrder } from "../../Api/order";
import SmallLoader from "../SmallLoader";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { loading, user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => await getMyOrder(user?.email),
    enabled: !loading && !!user?.email,
  });

  if (isLoading) return <SmallLoader size="68" />;

  return (
    <div className="px-4 py-2 max-w-6xl 2xl:max-w-[85%] mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
      <p className="text-gray-600 mb-3">
        Manage your orders. Click on an order to see more details.
      </p>
      {data.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow hover:shadow-md border border-gray-200 transition-all"
            >
              <div className="p-4 border-b bg-gray-100">
                <Link
                  to={`/order-details/${order._id}`}
                  className="text-lg font-bold text-teal-600 hover:underline"
                >
                  {order._id}
                </Link>
                <p className="text-sm text-gray-600">
                  Placed on:{" "}
                  {new Date(order.orderPlaced).toLocaleDateString("en-GB")},
                  {new Date(order.orderPlaced).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {order.paidAt && (
                  <p className="text-sm text-green-600">
                    Paid: {new Date(order.paidAt).toLocaleDateString("en-GB")}{" "}
                    {new Date(order.paidAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  <strong>Total Items:</strong> {order.cartItems.length}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total Amount:</strong> ৳
                  {order.cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </p>
                <span
                  className={`inline-flex items-center text-sm font-semibold mt-2 px-3 py-1 rounded-full ${
                    order.payment
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.payment ? (
                    <>
                      <FaCheckCircle className="mr-1" /> Paid
                    </>
                  ) : (
                    <>
                      <FaExclamationTriangle className="mr-1" /> Pending
                    </>
                  )}
                </span>
              </div>
              {!order.payment && (
                <div className="p-4 border-t bg-gray-50 text-right">
                  <Link
                    to={`/order-details/${order._id}`}
                    className="px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
                  >
                    View & Pay
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

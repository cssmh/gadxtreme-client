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
  console.log(data);

  if (isLoading) return <SmallLoader size="68" />;

  return (
    <div className="px-3 py-2 max-w-6xl 2xl:max-w-[85%] mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
      <p className="text-gray-600 mb-3">
        Manage your orders. Click on an order to see more details.
      </p>
      {data.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">
                  Placed On
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">
                  Total Items
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">
                  Total Amount
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">
                  Payment Status
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className="border-t border-gray-200">
                  <td className="px-3 py-2 text-sm text-gray-600">
                    <Link
                      to={`/dashboard/order-details/${order._id}`}
                      className="text-teal-600 hover:underline"
                    >
                      {order._id}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-600">
                    {new Date(order.orderPlaced).toLocaleDateString("en-GB")},{" "}
                    {new Date(order.orderPlaced).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-10 py-2 text-sm text-gray-600">
                    {order.cartItems.length}
                  </td>
                  <td className="px-7 py-2 text-sm text-gray-600">
                    ৳
                    {order.cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    <span
                      className={`inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full ${
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
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-600">
                    {!order.payment && (
                      <Link
                        to={`/dashboard/order-details/${order._id}`}
                        className="px-3 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
                      >
                        View & Pay
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

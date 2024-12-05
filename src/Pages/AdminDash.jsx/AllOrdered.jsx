import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../Api/order";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

const AllOrdered = () => {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => await getAllOrders(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-teal-500" />
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-xl font-bold text-center text-teal-600 mb-4">
        All Orders
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-sm">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Address
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Items
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Total
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Payment
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, idx) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-4 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-2 py-4 text-sm text-gray-700">
                  {order.name}
                </td>
                <td className="px-2 py-4 w-[200px] text-sm text-gray-700">
                  {order.address}, {order.district}, {order.country}
                </td>
                <td className="px-2 py-4 w-[200px] text-sm text-gray-700">
                  {order.cartItems.map((item) => (
                    <div key={item.gadgetId}>
                      {item.name} <span className="text-gray-500">x</span>{" "}
                      {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-2 py-4 text-sm text-gray-700 font-medium">
                  ৳
                  {order.cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </td>
                <td
                  className={`px-2 py-4 text-sm font-medium ${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : order.status === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-9 py-4 text-center">
                  {order.payment ? (
                    <FaCheck className="text-green-500 text-lg" />
                  ) : (
                    <FaTimes className="text-red-500 text-lg" />
                  )}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  <p>
                    Order:{" "}
                    {new Date(order.orderPlaced).toLocaleDateString("en-GB")}
                    <br />
                    {new Date(order.orderPlaced).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {order.paidAt && (
                    <p className="text-green-600">
                      Paid: {new Date(order.paidAt).toLocaleDateString("en-GB")}{" "}
                      <br />
                      {new Date(order.paidAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrdered;

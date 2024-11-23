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
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold text-center text-teal-600 mb-4">
        All Orders
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-teal-100 text-teal-700">
            <tr>
              <th className="border px-6 py-3 text-left">#</th>
              <th className="border px-6 py-3 text-left">Customer</th>
              <th className="border px-6 py-3 text-left">Address</th>
              <th className="border px-6 py-3 text-left">Items</th>
              <th className="border px-6 py-3 text-left">Total</th>
              <th className="border px-6 py-3 text-left">Status</th>
              <th className="border px-6 py-3 text-left">Payment</th>
              <th className="border px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order._id}
                className="hover:bg-teal-50 transition-colors duration-300"
              >
                <td className="border px-4 py-4">{idx + 1}</td>
                <td className="border px-4 py-4">{order.name}</td>
                <td className="border px-4 py-4">
                  {order.address}, {order.district}, {order.country}
                </td>
                <td className="border px-6 py-4">
                  {order.cartItems.map((item) => (
                    <div key={item.gadgetId}>
                      <p>
                        {item.name} x {item.quantity}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="border px-6 py-4">
                  ৳
                  {order.cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </td>
                <td
                  className={`border px-6 py-4 font-semibold ${
                    order.status === "Pending"
                      ? "text-yellow-700"
                      : order.status === "Completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border px-6 py-4 text-center">
                  {order.payment ? (
                    <FaCheck className="text-green-500 inline-block" />
                  ) : (
                    <FaTimes className="text-red-500 inline-block" />
                  )}
                </td>
                <td className="border px-6 py-4">
                  {new Date(order.createAt).toLocaleDateString()}{" "}
                  {new Date(order.createAt).toLocaleTimeString()}
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

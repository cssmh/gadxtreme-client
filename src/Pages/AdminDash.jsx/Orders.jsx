import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../Api/order";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

const Orders = () => {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => await getAllOrders(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Items</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">
                  {order.address}, {order.district}, {order.country}
                </td>
                <td className="border px-4 py-2">
                  {order.cartItems.map((item) => (
                    <div key={item.gadgetId}>
                      <p>
                        {item.name} x {item.quantity}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">
                  ৳
                  {order.cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border px-4 py-2">
                  {order.payment ? (
                    <FaCheck className="text-green-500 inline-block" />
                  ) : (
                    <FaTimes className="text-red-500 inline-block" />
                  )}
                </td>
                <td className="border px-4 py-2">
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

export default Orders;

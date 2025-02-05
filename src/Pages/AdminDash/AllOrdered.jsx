import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../Api/order";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 8 }).map((_, idx) => (
      <td key={idx} className="px-3 py-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

const AllOrdered = () => {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => await getAllOrders(),
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto bg-white rounded-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Address
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Items
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Total
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold">
                Payment
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <SkeletonRow key={idx} />
                ))
              : orders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-3 py-4 text-sm text-gray-700">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-700">
                      <Link
                        to={`/dashboard/order-details/${order?.cartItems[0]?.name
                          ?.toLowerCase()
                          .replaceAll(/\s+/g, "_")}/${order._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {order.name}
                      </Link>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-700 truncate w-36">
                      {order.address}, {order.district}, {order.country}
                    </td>
                    <td className="px-2 py-4 w-[250px] text-sm text-gray-700 whitespace-normal break-words max-h-[100px] overflow-y-auto">
                      {order.cartItems.map((item) => (
                        <div
                          key={item.gadgetId}
                          className="flex items-center gap-1"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-700 font-medium">
                      ৳
                      {order.cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </td>
                    <td
                      className={`px-3 py-4 text-sm font-medium ${
                        order.status === "Pending"
                          ? "text-red-500"
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
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <p>
                        {new Date(order.orderPlaced).toLocaleDateString(
                          "en-GB"
                        )}{" "}
                        <br />
                        {new Date(order.orderPlaced).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
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

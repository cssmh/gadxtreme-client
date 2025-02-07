import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteOrder, getAllOrders, markOrderDelivered } from "../../Api/admin";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-6"></div>
    </td>
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-24"></div>
    </td>
    <td className="p-3">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
    </td>
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-16"></div>
    </td>
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-20"></div>
    </td>
    <td className="px-9 py-3 text-center">
      <div className="h-6 bg-gray-300 rounded-full w-6 mx-auto"></div>
    </td>
    <td className="p-3">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
    </td>
    <td className="p-3">
      <div className="space-y-2">
        <div className="h-10 bg-gray-300 rounded w-32"></div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    </td>
  </tr>
);

const AllOrdered = () => {
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => await getAllOrders(),
  });

  const updateOrderToDelivered = async (orderId) => {
    try {
      const res = await markOrderDelivered(orderId);
      if (res?.modifiedCount > 0) {
        toast.success("Marked as Delivered");
      }
      refetch();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "Delete a Cart",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (confirmDelete) {
      try {
        const res = await deleteOrder(id);
        if (res?.deletedCount > 0) {
          swal("Order Deleted Successfully", {
            icon: "success",
            timer: 2000,
          });
          refetch();
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto bg-white rounded-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-sm text-gray-600">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Customer
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
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Action
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
                    <td className="px-2 py-4 lg:w-[250px] text-sm text-gray-700 whitespace-normal break-words max-h-[100px] overflow-y-auto">
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
                          : order.status === "Delivered"
                          ? "text-green-500"
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
                    <td className="px-3 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-200 font-semibold py-2 px-3 rounded min-w-[140px] text-center flex items-center justify-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                      {order.status === "Pending" ? (
                        <button
                          onClick={() => updateOrderToDelivered(order._id)}
                          className="bg-teal-200 font-semibold py-2 px-3 rounded min-w-[140px] text-center"
                        >
                          Mark as Delivered
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-300 text-gray-700 font-semibold py-2 px-3 rounded min-w-[140px] text-center flex items-center justify-center gap-2"
                        >
                          <FaCheck /> Marked
                        </button>
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

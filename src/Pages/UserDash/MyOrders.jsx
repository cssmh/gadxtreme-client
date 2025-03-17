import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyOrder } from "../../Api/order";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SmallLoader from "../../Component/Loaders/SmallLoader";
import { addReview } from "../../Api/cartGadget";
import { toast } from "sonner";
import GadHelmet from "../../Component/GadHelmet";

const MyOrders = () => {
  const { loading, user } = useAuth();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: () => getMyOrder(user?.email),
    enabled: !loading && !!user?.email,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [reviewText, setReviewText] = useState("");

  const handleAddReview = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleSubmitReview = async () => {
    try {
      await addReview(selectedOrderId, reviewText);
      toast.success("Review added");
      refetch();
      setIsModalOpen(false);
      setReviewText("");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <SmallLoader size="90" />;

  return (
    <div className="md:p-1">
      <GadHelmet title={"My Orders"} />
      <h1 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-gray-800">
        My Orders
      </h1>
      <p className="text-gray-600 mb-3 2xl:mt-1 2xl:text-lg">
        Manage your orders. Click on an order to see more details.
      </p>
      {data.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-lg 2xl:text-xl">
          <p className="text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
          {/* Desktop Table */}
          <table className="min-w-full table-auto hidden lg:table">
            <thead className="bg-gray-100">
              <tr className="text-sm 2xl:text-base">
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Placed On
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Total Items
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Total Amount
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Payment Status
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Delivery Status
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr
                  key={order._id}
                  className="border-t text-sm 2xl:text-base border-gray-200"
                >
                  <td className="px-3 py-2 text-gray-600">
                    <Link
                      to={`/dashboard/order-details/${order?.cartItems[0]?.name
                        ?.toLowerCase()
                        .replaceAll(/\s+/g, "_")}/${order._id}`}
                      className="text-teal-600 hover:underline"
                    >
                      {order._id.slice(0, 20)}...
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {new Date(order.orderPlaced).toLocaleDateString("en-GB")}{" "}
                    <br />
                    {new Date(order.orderPlaced).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="text-center py-2 text-sm text-gray-600">
                    {order.cartItems.length}
                  </td>
                  <td className="text-center py-2 text-sm text-gray-600">
                    ৳
                    {order.cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </td>
                  <td className="px-3 py-2">
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
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center justify-between w-24 text-sm font-semibold px-3 py-1 border rounded-full ${
                        order.status === "Delivered"
                          ? "border-blue-500 text-blue-600"
                          : "border-orange-500 text-orange-600"
                      }`}
                    >
                      {order.status === "Delivered" ? "Delivered" : "Pending"}
                      {order.status === "Delivered" ? (
                        <FaCheckCircle className="ml-1" />
                      ) : (
                        <FaExclamationTriangle className="ml-1" />
                      )}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {order.status === "Delivered" && !order?.customerReview ? (
                      <button
                        onClick={() => handleAddReview(order._id)}
                        className="px-3 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                      >
                        Add Review
                      </button>
                    ) : order.payment ? (
                      <Link
                        to={`/dashboard/order-details/${order?.cartItems[0]?.name
                          ?.toLowerCase()
                          .replaceAll(/\s+/g, "_")}/${order._id}`}
                        className={`w-full px-3 py-2 ${
                          order?.customerReview ? "bg-gray-500" : "bg-teal-500"
                        } text-white font-medium rounded-lg transition`}
                      >
                        View Details
                      </Link>
                    ) : (
                      <Link
                        to={`/dashboard/order-details/${order?.cartItems[0]?.name
                          ?.toLowerCase()
                          .replaceAll(/\s+/g, "_")}/${order._id}`}
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
          {/* Mobile Cards */}
          <div className="lg:hidden">
            {data.map((order) => (
              <div key={order._id} className="border-t border-gray-200 p-3">
                <div className="flex justify-between items-center">
                  <Link
                    to={`/dashboard/order-details/${order?.cartItems[0]?.name
                      ?.toLowerCase()
                      .replaceAll(/\s+/g, "_")}/${order._id}`}
                    className="text-teal-600 hover:underline"
                  >
                    <span className="font-semibold">Order ID:</span>{" "}
                    {order._id.slice(0, 20)}...
                  </Link>
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
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Placed On:</span>{" "}
                    {new Date(order.orderPlaced).toLocaleDateString("en-GB")},{" "}
                    {new Date(order.orderPlaced).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Total Items:</span>{" "}
                    {order.cartItems.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Total Amount:</span> ৳
                    {order.cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Delivery Status:</span>{" "}
                    <span
                      className={`inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status === "Delivered" ? (
                        <>
                          <FaCheckCircle className="mr-1" /> Delivered
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="mr-1" /> Pending
                        </>
                      )}
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  {order.payment ? (
                    <Link
                      to={`/dashboard/order-details/${order?.cartItems[0]?.name
                        ?.toLowerCase()
                        .replaceAll(/\s+/g, "_")}/${order._id}`}
                      className="w-full px-3 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                    >
                      Details
                    </Link>
                  ) : (
                    <Link
                      to={`/dashboard/order-details/${order?.cartItems[0]?.name
                        ?.toLowerCase()
                        .replaceAll(/\s+/g, "_")}/${order._id}`}
                      className="w-full block text-center px-3 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
                    >
                      View & Pay
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add a Review</h2>
            <textarea
              className="w-full outline-none p-2 border border-gray-400 rounded-lg mb-4"
              rows="4"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

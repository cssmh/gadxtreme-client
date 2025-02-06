import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyPendingReview } from "../../Api/order";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "sonner";
import BigLoader from "../../Component/AllSpinner/BigLoader";
import { addReview } from "../../Api/cartGadget";
import useAuth from "../../hooks/useAuth";

const PendingReview = () => {
  const { loading, user } = useAuth();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => await getMyPendingReview(user?.email),
    enabled: !loading && !!user,
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
      toast.success("Review added successfully!");
      refetch();
      setIsModalOpen(false);
      setReviewText("");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review. Please try again.");
    }
  };

  if (isLoading) return <BigLoader size="96" />;

  return (
    <div className="md:p-1">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
        Pending Reviews
      </h1>
      <p className="text-gray-600 mb-3">
        You have pending reviews for the following orders. Click to add a
        review.
      </p>
      {data.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-500">No pending reviews found.</p>
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
                  Delivery Status
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
                    {order._id.slice(0, 20)}...
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-600">
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
                    ৳{order.totalAmount}
                  </td>
                  <td className="px-3 py-2 text-sm">
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
                  <td className="px-3 py-2 text-sm text-gray-600">
                    <button
                      onClick={() => handleAddReview(order._id)}
                      className="px-3 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                    >
                      Add Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default PendingReview;

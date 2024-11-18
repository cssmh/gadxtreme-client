import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyOrder } from "../../Api/order";
import SmallLoader from "../SmallLoader";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { sslPay } from "../../Api/auth";

const Orders = () => {
  const { loading, user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => await getMyOrder(user?.email),
    enabled: !loading && !!user?.email,
  });

  const handlePayment = async (order) => {
    const data = await sslPay(order);
    window.location.replace(data.url);
  };

  if (isLoading) return <SmallLoader size="68" />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">My Orders</h1>
      <p className="text-gray-600 mb-6">
        Easily track your orders and payment status below.
      </p>
      {data.length === 0 ? (
        <p className="text-lg text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-8">
          {data.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  Order ID: {order._id}
                </h2>
                <span
                  className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold ${
                    order.payment
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.payment ? (
                    <>
                      <FaCheckCircle className="mr-2" /> Paid
                    </>
                  ) : (
                    <>
                      <FaExclamationTriangle className="mr-2" /> Pending
                    </>
                  )}
                </span>
              </div>

              {/* Additional Information */}
              <div className="text-gray-600 mb-6">
                <p>
                  <span className="font-semibold">Customer:</span> {order.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {order.email}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  {order.mobileNumber}
                </p>
                <p>
                  <span className="font-semibold">Delivery Address:</span>{" "}
                  {order.address}, {order.district}, {order.country}
                </p>
                {order.transactionId && (
                  <p>
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {order.transactionId}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Order Date:</span>{" "}
                  {new Date(order.createAt).toLocaleDateString()}
                </p>
                {order.paidAt && (
                  <p>
                    <span className="font-semibold text-green-600">Paid:</span>{" "}
                    {new Date(order.paidAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Ordered Items */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Items Ordered
                </h3>
                <div className="grid gap-4">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            ৳{item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pay Now Button */}
              {!order.payment && (
                <div className="mt-6 text-right">
                  <button
                    onClick={() => handlePayment(order)}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

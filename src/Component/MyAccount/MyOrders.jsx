import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyOrder } from "../../Api/order";
import SmallLoader from "../SmallLoader";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { sslPay } from "../../Api/auth";

const MyOrders = () => {
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
    <div className="px-4 py-2 max-w-6xl mx-auto mb-7">
      <p className="text-gray-600 mb-4">
        Track your orders and payment status below.
      </p>

      {data.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {data.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order ID: {order._id}
                  </h2>
                  <p className=" text-gray-500">
                    {new Date(order.createAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    order.payment
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.payment ? (
                    <>
                      <FaCheckCircle className="mr-1 " /> Paid
                    </>
                  ) : (
                    <>
                      <FaExclamationTriangle className="mr-1 " /> Pending
                    </>
                  )}
                </span>
              </div>

              <div className="p-4  text-gray-700 space-y-2">
                <p>
                  <span className="font-semibold">Customer:</span> {order.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {order.email}
                </p>
                <p className="truncate">
                  <span className="font-semibold">Delivery Address:</span>{" "}
                  {order.address}, {order.district}, {order.country}
                </p>
                {order.transactionId && (
                  <p>
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {order.transactionId}
                  </p>
                )}
                {order.paidAt && (
                  <p>
                    <span className="font-semibold text-green-600">Paid:</span>{" "}
                    {new Date(order.paidAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="p-4 border-t">
                <h3 className=" font-semibold text-gray-800 mb-3">Items</h3>
                <div className="space-y-2">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <h4 className=" font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            ৳{item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className=" font-semibold text-gray-800">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {!order.payment && (
                <div className="p-4 text-right">
                  <button
                    onClick={() => handlePayment(order)}
                    className="px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
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

export default MyOrders;

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getMyOrder } from "../../Api/order";
import SmallLoader from "../SmallLoader";

const Orders = () => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => await getMyOrder(user?.email),
    enabled: !loading && !!user?.email,
  });

  if (isLoading) return <SmallLoader size="68" />;

  const handlePayment = (orderId) => {
    navigate("/my-account/payment", { state: { orderId } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-3 text-gray-800">My Orders</h1>
      <p className="text-gray-500 mb-4">
        View the details of your orders below. Track your status and payment
        details easily.
      </p>

      {data.length === 0 ? (
        <p className="text-gray-500 text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {data.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6 bg-white shadow-lg transition hover:shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Order ID: {order._id}
                </h2>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  Status: {order.status}
                </span>
              </div>
              <div className="text-gray-600 mb-6">
                <p className="font-medium">
                  Payment:{" "}
                  <span
                    className={`${
                      order.payment === "Paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.payment}
                  </span>
                </p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Delivery Address: {order.address}</p>
                <p>Contact: {order.mobileNumber}</p>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Items Ordered
                </h3>
                <div className="grid gap-4">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-700">
                            {item.name}
                          </h4>
                          <p className="text-gray-600">Price: ৳{item.price}</p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700 font-medium">
                          ৳{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {order.payment === "Pending" && (
                <div className="mt-6 text-right">
                  <button
                    onClick={() => handlePayment(order._id)}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
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

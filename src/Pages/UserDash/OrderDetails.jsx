import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../Api/order";
import { sslPay } from "../../Api/auth";
import useAuth from "../../hooks/useAuth";
import BigLoader from "../../Component/BigLoader";

const OrderDetails = () => {
  const { loading, user } = useAuth();
  const { id } = useParams();
  const { data: order={}, isLoading } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => await getOrderDetails(id),
  });

  if (loading || isLoading) return <BigLoader size="96" />;

  if (!order) {
    return (
      <p className="text-gray-500 text-center flex justify-center items-center h-[76vh]">
        Order not found.
      </p>
    );
  }
  const handlePayment = async (order) => {
    const data = await sslPay(order);
    window.location.replace(data.url);
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
        Order Details
      </h1>
      <div className="bg-white rounded-lg shadow p-3 md:p-5 space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-lg font-bold text-gray-800">Order Information</h2>
          <p className="text-sm text-gray-600">Order ID: {order._id}</p>
          <p className="text-sm text-gray-600">
            Placed on: {new Date(order.orderPlaced).toLocaleDateString("en-GB")}
            ,
            {new Date(order.orderPlaced).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {order.paidAt && (
            <p className="text-sm text-green-600">
              Paid: {new Date(order.paidAt).toLocaleDateString("en-GB")}{" "}
              {new Date(order.paidAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
          <p className="text-sm text-gray-600">Status: {order.status}</p>
        </div>
        <div className="border-b pb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            Payment Details
          </h2>
          <div className="flex items-center space-x-4">
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                order.payment
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {order.payment ? "Paid" : "Pending"}
            </span>
            {order.transactionId && (
              <p className="text-sm text-gray-600">
                Transaction ID: {order.transactionId}
              </p>
            )}
          </div>
        </div>
        <div className="border-b pb-4">
          <h2 className="text-lg font-bold text-gray-800">Buyer Information</h2>
          <p className="text-sm text-gray-600">
            Name: <span className="font-semibold">{order.name}</span>
          </p>
          <p className="text-sm text-gray-600">
            Email: <span className="font-semibold">{order.email}</span>
          </p>
          <p className="text-sm text-gray-600">
            Phone: <span className="font-semibold">{order.mobileNumber}</span>
          </p>
          <p className="text-sm text-gray-600">
            Address:{" "}
            <span className="font-semibold">
              {order.address}, {order.district}, {order.country}
            </span>
          </p>
        </div>
        {order.additionalInfo && (
          <div className="border-b pb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Additional Information
            </h2>
            <p className="text-sm text-gray-600">{order.additionalInfo}</p>
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-gray-800">Order Items</h2>
          <div className="space-y-4">
            {order.cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-gray-800 font-medium">{item.name}</h4>
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
        {!order.payment && order?.email === user?.email && (
          <div className="text-right">
            <button
              onClick={() => handlePayment(order)}
              className="px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

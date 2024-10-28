import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyOrder } from "../../Api/order";
import SmallLoader from "../SmallLoader";

const Orders = () => {
  const { loading, user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => await getMyOrder(user?.email),
    enabled: !loading && !!user?.email,
  });

  if (isLoading) return <SmallLoader size="68" />

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      <p className="text-gray-600 mb-6">
        Here you can view all your past and current orders.
      </p>

      {data.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {data.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 bg-white shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {order._id}
              </h2>
              <p className="text-gray-600">Status: {order.status}</p>
              <div
                className={`text-lg font-medium ${
                  order.payment === "Paid" ? "text-green-600" : "text-red-500"
                }`}
              >
                Payment: {order.payment}
              </div>
              <p className="text-gray-600">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Delivery Address: {order.address}</p>
              <div className="mt-4">
                <h3 className="font-bold">Items:</h3>
                <div className="flex flex-col space-y-2">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border p-2 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-gray-600">Price: ৳{item.price}</p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

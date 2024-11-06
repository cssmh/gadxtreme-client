import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import useMyCart from "../../hooks/useMyCart";
import toast from "react-hot-toast";
import SmallLoader from "../SmallLoader";
import { deleteMyCart, updateMyCart } from "../../Api/cartGadget";
import { Link } from "react-router-dom";

const Cart = () => {
  const { isLoading, myCartData, refetch } = useMyCart();
  const [couponCode, setCouponCode] = useState("");
  const [notification, setNotification] = useState(null);
  const [quantities, setQuantities] = useState(
    myCartData.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {})
  );

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await updateMyCart(itemId, { quantity: newQuantity });
      refetch();
      showNotification("Quantity updated successfully!", "success");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleIncrement = (itemId) => {
    setQuantities((prev) => {
      const newQuantity = prev[itemId] + 1;
      updateQuantity(itemId, newQuantity);
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const handleDecrement = (itemId) => {
    setQuantities((prev) => {
      if (prev[itemId] > 1) {
        const newQuantity = prev[itemId] - 1;
        updateQuantity(itemId, newQuantity);
        return { ...prev, [itemId]: newQuantity };
      }
      return prev;
    });
  };

  const handleRemove = async (itemId) => {
    try {
      await deleteMyCart(itemId);
      refetch();
      showNotification("Item removed from cart!", "success");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  const handleApplyCoupon = () => {
    toast.success("Coupon applied");
    showNotification("Coupon applied successfully!", "success");
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  if (isLoading) return <SmallLoader size="78" />;

  return (
    <div className="relative">
      {notification && (
        <div
          className={`absolute -top-6 left-0 right-0 p-3 text-white px-8 z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between w-full px-4 lg:px-8 py-6 gap-4 mt-2">
        <div className="lg:w-[70%] w-full border px-4 pb-4 rounded-lg">
          {myCartData?.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2">Product</th>
                  <th className="py-3 px-2">Price</th>
                  <th className="py-3 px-2">Quantity</th>
                  <th className="py-3 px-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {myCartData.map((item) => (
                  <tr key={item._id} className="border-b">
                    {/* Product Column */}
                    <td className="py-4 flex items-center">
                      <FaTimes
                        className="cursor-pointer mr-3"
                        onClick={() => handleRemove(item._id)}
                      />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-3"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-4 px-1">৳{item?.price}</td>
                    <td className="py-4 px-1">
                      <div className="flex items-center border rounded-2xl mx-1">
                        <button
                          onClick={() => handleDecrement(item._id)}
                          className="px-2 py-2 border-r"
                        >
                          -
                        </button>
                        <span className="mx-2">{quantities[item._id]}</span>
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="px-2 py-2 border-l"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-1 text-gadDarkBlue font-semibold">
                      ৳
                      {calculateSubtotal(
                        item.price,
                        quantities[item._id]
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="py-3">Your cart is empty.</p>
          )}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Have a Coupon?</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon Code"
                className="w-full sm:w-auto border border-gray-300 rounded-lg p-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-gadDarkBlue text-white py-2 px-4 rounded-lg w-full sm:w-auto"
              >
                Apply Code
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] w-full border p-4 rounded-lg lg:self-start pb-5">
          <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
          <div className="flex justify-between border-b py-2">
            <span>Subtotal</span>
            <span>
              ৳
              {myCartData
                ?.reduce(
                  (acc, item) => acc + item.price * quantities[item._id],
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-b py-2 ">
            <span>Shipping</span>
            <div className="text-right">
              <p className="text-gadDarkBlue font-semibold">
                Delivery Charge: ৳100
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Shipping options will be updated during checkout. Calculate
                shipping.
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 font-semibold text-gadDarkBlue text-lg">
            <span>Total</span>
            <span>
              ৳
              {myCartData
                ?.reduce(
                  (acc, item) => acc + item.price * quantities[item._id],
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          {myCartData?.length > 0 ? (
            <Link to="/checkout">
              <button className="w-full mt-4 bg-gadDarkBlue text-white py-2 rounded">
                Proceed to Checkout
              </button>
            </Link>
          ) : (
            <button
              className="w-full mt-4 bg-gray-400 text-white py-2 rounded"
              disabled
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

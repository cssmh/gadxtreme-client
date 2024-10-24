import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import useMyCart from "../../hooks/useMyCart";
import toast from "react-hot-toast";
import SmallLoader from "../SmallLoader";
import { deleteMyCart, updateMyCart } from "../../Api/cartGadget";

const Cart = () => {
  const { isLoading, myCartData, refetch } = useMyCart();
  const [couponCode, setCouponCode] = useState("");

  const handleIncrement = async (itemId, currentQuantity) => {
    try {
      const newQuantity = currentQuantity + 1;
      await updateMyCart(itemId, { quantity: newQuantity });
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleDecrement = async (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        const newQuantity = currentQuantity - 1;
        await updateMyCart(itemId, { quantity: newQuantity });
        refetch();
      } catch (error) {
        console.log(error);
        toast.error("Failed to update quantity");
      }
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await deleteMyCart(itemId);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyCoupon = () => {
    // Logic for applying the coupon code
    toast.success("Coupon applied");
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  if (isLoading) return <SmallLoader size="78" />;

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full px-4 lg:px-8 py-6 gap-4">
      {/* Left Side - Cart Items */}
      <div className="lg:w-[70%] w-full border px-4 pb-4 rounded-lg">
        {myCartData?.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
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
                  {/* Price Column */}
                  <td className="py-4">৳{item?.price}</td>
                  {/* Quantity Column */}
                  <td className="py-4">
                    <div className="flex items-center border rounded-2xl mx-1">
                      <button
                        onClick={() => handleDecrement(item._id, item.quantity)}
                        className="px-2 py-2 border-r"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item._id, item.quantity)}
                        className="px-2 py-2 border-l"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  {/* Subtotal Column */}
                  <td className="py-4 text-gadDarkBlue font-semibold">
                    ৳{calculateSubtotal(item.price, item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}
        {/* Coupon Code Section */}
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
      {/* Right Side - Cart Totals */}
      <div className="lg:w-[30%] w-full border p-4 rounded-lg lg:self-start pb-5">
        <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
        <div className="flex justify-between border-b py-2">
          <span>Subtotal</span>
          <span>
            ৳
            {myCartData
              ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
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
              ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <button className="w-full mt-4 bg-gadDarkBlue text-white py-2 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

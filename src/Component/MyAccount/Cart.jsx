import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import useMyCart from "../../hooks/useMyCart";
import toast from "react-hot-toast";
import SmallLoader from "../SmallLoader";

const Cart = () => {
  const { isLoading, myCartData } = useMyCart();
  const [couponCode, setCouponCode] = useState("");

  // const handleIncrement = (itemId, currentQuantity) => {
  //   // Logic for incrementing quantity
  // };

  const handleDecrement = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      // Logic for decrementing quantity
    }
  };

  const handleRemove = async (itemId) => {
    console.log(itemId);
    // Logic for removing item from cart
    // try {
    //   // Assuming removeCartItem is a function that removes the item from the cart
    //   await removeCartItem(itemId);
    //   toast.success("Item removed from cart");
    //   refetch();
    // } catch (error) {
    //   toast.error("Error removing item");
    // }
  };

  const handleApplyCoupon = () => {
    // Logic for applying the coupon code
    toast.success("Coupon applied");
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  if (isLoading) return <SmallLoader size="78" /> 

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full px-4 lg:px-8 py-8 gap-4">
      {/* Left Side - Cart Items */}
      <div className="lg:w-[70%] w-full border p-4 rounded-lg">
        {myCartData?.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
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
                      className="text-red-600 cursor-pointer mr-4"
                      onClick={() => handleRemove(item._id)}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <span>{item.name}</span>
                  </td>

                  {/* Price Column */}
                  <td className="py-4">৳{item?.price}</td>

                  {/* Quantity Column */}
                  <td className="py-4">
                    <div className="flex items-center border rounded-2xl">
                      <button
                        onClick={() => handleDecrement(item._id, item.quantity)}
                        className="px-2 py-2 border-r"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        // onClick={() => handleIncrement(item._id, item.quantity)}
                        className="px-2 py-2 border-l"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Subtotal Column */}
                  <td className="py-4">
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
              className="bg-green-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
            >
              Apply Code
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Cart Totals */}
      <div className="lg:w-[30%] w-full border p-4 rounded-lg">
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
        <div className="flex justify-between py-2">
          <span>Total</span>
          <span>
            ৳
            {myCartData
              ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
        <button className="w-full mt-4 bg-green-500 text-white py-2 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

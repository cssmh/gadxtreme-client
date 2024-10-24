import { useState } from "react";
import useMyCart from "../../hooks/useMyCart";
import { updateMyCart } from "../../Api/cartGadget";
import toast from "react-hot-toast";
import SmallLoader from "../SmallLoader";
import { FaTimes } from "react-icons/fa";

const Checkout = () => {
  const { isLoading, myCartData, refetch } = useMyCart();
  const [quantities, setQuantities] = useState(
    myCartData?.reduce(
      (acc, item) => ({ ...acc, [item._id]: item.quantity }),
      {}
    )
  );

  const handleIncrement = async (itemId) => {
    const newQuantity = quantities[itemId] + 1;
    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));

    try {
      await updateMyCart(itemId, { quantity: newQuantity });
      refetch(); // Refresh the cart data if needed
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleDecrement = async (itemId) => {
    if (quantities[itemId] > 1) {
      const newQuantity = quantities[itemId] - 1;
      setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));

      try {
        await updateMyCart(itemId, { quantity: newQuantity });
        refetch();
      } catch (error) {
        console.error(error);
        toast.error("Failed to update quantity");
      }
    }
  };

  if (isLoading) return <SmallLoader size="78" />;

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full px-4 lg:px-8 py-6 gap-4">
      {/* Left Side - Billing & Shipping */}
      <div className="lg:w-[60%] w-full border px-4 pb-4 rounded-lg">
        <h2 className="text-xl font-semibold my-3">Billing & Shipping</h2>
        <form>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name *</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Mobile Number *</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Country/Region */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Country / Region *</label>
            <select
              className="w-full border rounded-lg p-2 outline-none"
              defaultValue="Bangladesh"
            >
              <option value="Bangladesh">Bangladesh</option>
            </select>
          </div>

          {/* District */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">District *</label>
            <select
              className="w-full border rounded-lg p-2 outline-none"
              defaultValue=""
            >
              <option value="">Select an option…</option>
              {/* Add more districts here */}
            </select>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Address *</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="House number and street name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email (optional)</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="Enter your email (optional)"
            />
          </div>

          {/* Additional Information */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Additional information (Note)
            </label>
            <textarea
              className="w-full border rounded-lg p-2 outline-none"
              rows="4"
              placeholder="Write any delivery notes or product details here..."
            ></textarea>
          </div>
        </form>
      </div>

      {/* Right Side - Order Summary */}
      <div className="lg:w-[40%] bg-[#f7f7f7] w-full border p-4 rounded-lg lg:self-start pb-6">
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        {myCartData?.length > 0 ? (
          <div>
            {myCartData.map((item) => (
              <div key={item._id}>
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center">
                    <FaTimes
                      className="cursor-pointer mr-3"
                      //   onClick={() => handleRemove(item._id)}
                    />
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm">{item.name}</span> x{" "}
                        <span>{quantities[item._id]}</span>
                      </div>
                      <span>
                        ৳{(item.price * quantities[item._id]).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1 border bg-gray-200 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {quantities[item._id]}
                    </span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-3 py-1 border bg-gray-200 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Order Totals */}
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="font-semibold">Subtotal</span>
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
              <div className="flex justify-between py-2">
                <span className="font-semibold">Total</span>
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
            </div>

            <button className="w-full mt-4 bg-gadDarkBlue text-white py-2 rounded">
              Place Order
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;

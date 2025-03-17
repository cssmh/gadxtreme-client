import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import useMyCart from "../../hooks/useMyCart";
import { toast } from "sonner";
import { deleteMyCart, updateMyCart } from "../../Api/cartGadget";
import { Link } from "react-router-dom";
import SmallLoader from "../../Component/Loaders/SmallLoader";
import useUserCount from "../../hooks/useUserCount";
import GadHelmet from "../../Component/GadHelmet";

const Cart = () => {
  const { isLoading, myCartData, refetch } = useMyCart();
  const { refetch: hookRefetch } = useUserCount();
  const [couponCode, setCouponCode] = useState("");
  const [notification, setNotification] = useState(null);
  const [quantities, setQuantities] = useState(
    myCartData.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {})
  );

  useEffect(() => {
    if (myCartData?.length > 0) {
      const initialQuantities = myCartData.reduce((acc, item) => {
        acc[item._id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [myCartData]);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await updateMyCart(itemId, { quantity: newQuantity });
      refetch();
      hookRefetch();
      showNotification("Quantity updated successfully!", "success");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleIncrement = (itemId) => {
    const newQuantity = quantities[itemId] + 1;
    updateQuantity(itemId, newQuantity);
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const handleDecrement = (itemId) => {
    if (quantities[itemId] > 1) {
      const newQuantity = quantities[itemId] - 1;
      updateQuantity(itemId, newQuantity);
      setQuantities({ ...quantities, [itemId]: newQuantity });
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await deleteMyCart(itemId);
      refetch();
      hookRefetch();
      showNotification("Item removed from cart!", "success");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  const handleApplyCoupon = () => {
    toast.info("Wrong Coupon!");
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  if (isLoading) return <SmallLoader size="78" />;

  return (
    <div className="relative">
      <GadHelmet title={"Cart"} />
      {notification && (
        <div
          className={`absolute -top-4 left-0 right-0 p-2 2xl:p-3 text-white px-8 z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between w-full px-2 lg:px-8 py-3 md:py-6 gap-4 mt-2">
        <div className="lg:w-[70%] w-full border px-4 pb-4 rounded-lg">
          {myCartData?.length > 0 ? (
            <>
              <div className="hidden md:block">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b 2xl:text-lg">
                      <th className="py-3 px-2">Product</th>
                      <th className="py-3 px-2">Price</th>
                      <th className="py-3 px-2 text-center">Quantity</th>
                      <th className="py-3 px-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCartData.map((item) => (
                      <tr key={item._id} className="border-b 2xl:text-lg">
                        <td className="py-4 2xl:py-5 flex items-center">
                          <FaTimes
                            className="cursor-pointer mr-3"
                            onClick={() => handleRemove(item._id)}
                          />
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 2xl:w-20 h-16 2xl:h-20 object-cover mr-3"
                          />
                          <span>{item.name}</span>
                        </td>
                        <td className="py-4 px-1">৳{item?.price}</td>
                        <td className="py-4 px-1">
                          <div className="flex items-center border rounded-lg w-fit mx-auto">
                            <button
                              onClick={() => handleDecrement(item._id)}
                              className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-center min-w-[40px]">
                              {quantities[item._id]}
                            </span>
                            <button
                              onClick={() => handleIncrement(item._id)}
                              className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
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
              </div>
              <div className="block md:hidden">
                {myCartData.map((item) => (
                  <div
                    key={item._id}
                    className="border-b py-3 flex flex-col space-y-3"
                  >
                    <div className="flex items-center">
                      <FaTimes
                        className="cursor-pointer mr-3"
                        onClick={() => handleRemove(item._id)}
                      />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-3"
                      />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Price:</span>
                      <span>৳{item?.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center border rounded-lg w-fit">
                        <button
                          onClick={() => handleDecrement(item._id)}
                          className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-center min-w-[40px]">
                          {quantities[item._id]}
                        </span>
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Subtotal:</span>
                      <span className="font-semibold text-gadDarkBlue">
                        ৳
                        {calculateSubtotal(
                          item.price,
                          quantities[item._id]
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="py-3 2xl:text-lg">Your cart is empty.</p>
          )}
          <div className="mt-6 2xl:text-lg">
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
          <h2 className="text-xl 2xl:text-2xl font-bold mb-4">Cart Totals</h2>
          <div className="flex justify-between border-b py-2 2xl:text-lg">
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
          <div className="flex justify-between border-b py-2 2xl:text-lg">
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
          <div className="flex justify-between py-2 font-semibold text-gadDarkBlue text-lg 2xl:text-xl">
            <span>Total</span>
            <span>
              ৳
              {(
                myCartData?.reduce(
                  (acc, item) => acc + item.price * quantities[item._id],
                  0
                ) + 100
              ).toFixed(2)}
            </span>
          </div>
          <button
            className={`w-full mt-4 py-2 rounded text-white ${
              myCartData?.length > 0
                ? "bg-gadDarkBlue 2xl:text-lg 2xl:py-[10px]"
                : "bg-gray-400 2xl:p-3"
            }`}
            disabled={!myCartData?.length}
          >
            {myCartData?.length > 0 ? (
              <Link to="/checkout">Proceed to Checkout</Link>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

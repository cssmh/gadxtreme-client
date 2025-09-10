import { useState } from "react";
import useMyCart from "../../hooks/useMyCart";
import { deleteMyCart, updateMyCart } from "../../Api/cartGadget";
import { toast } from "sonner";
import { FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { placeOrder } from "../../Api/order";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../../Component/Loaders/SmallLoader";
import GadHelmet from "../../Component/GadHelmet";

const Checkout = () => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, myCartData, refetch } = useMyCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantities, setQuantities] = useState(
    myCartData?.reduce(
      (acc, item) => ({ ...acc, [item._id]: item.quantity }),
      {}
    )
  );

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    mobileNumber: "",
    country: "Bangladesh",
    district: "",
    address: "",
    email: user?.email || "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncrement = async (itemId) => {
    const newQuantity = quantities[itemId] + 1;
    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));

    try {
      await updateMyCart(itemId, { quantity: newQuantity });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await deleteMyCart(itemId);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
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

  const handlePlaceOrder = async () => {
    if (
      !formData.name ||
      !formData.mobileNumber ||
      !formData.district ||
      !formData.address
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    const totalAmount = myCartData
      ?.reduce((acc, item) => acc + item.price * quantities[item._id], 0)
      .toFixed(2);

    try {
      const orderData = {
        ...formData,
        email: user?.email,
        cartItems: myCartData.map((item) => ({
          gadgetId: item._id,
          name: item.name,
          price: item.price,
          quantity: quantities[item._id],
          image: item.image,
        })),
        status: "Pending",
        orderPlaced: new Date(),
        totalAmount,
      };

      await placeOrder(orderData);
      refetch();
      toast.success("Order placed successfully!");
      setFormData({
        name: "",
        mobileNumber: "",
        country: "Bangladesh",
        district: "",
        address: "",
        email: "",
        additionalInfo: "",
      });
      setQuantities({});
      navigate("/dashboard/orders");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || loading) return <SmallLoader size="78" />;

  return (
    <div className="container 2xl:max-w-[1370px] mx-auto flex flex-col lg:flex-row justify-between w-full px-4 lg:px-8 py-6 gap-4">
      <GadHelmet title={"Checkout"} />
      <div className="lg:w-[60%] w-full border px-4 pb-4 rounded-lg">
        <h2 className="text-xl 2xl:text-2xl font-semibold my-3">
          Billing & Shipping
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="2xl:text-xl">
          <div className="mb-4 2xl:mb-6">
            <label className="block mb-2 font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 outline-none"
              required
            />
          </div>
          <div className="mb-4 2xl:mb-6">
            <label className="block mb-2 font-medium">Mobile Number *</label>
            <input
              type="text"
              name="mobileNumber"
              defaultValue={"+880"}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="mb-4 2xl:mb-6">
            <label className="block mb-2 font-medium">Country / Region *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 outline-none"
            >
              <option value="Bangladesh">Bangladesh</option>
            </select>
          </div>
          <div className="mb-4 2xl:mb-6">
            <label className="block mb-2 font-medium">District *</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 outline-none"
              required
            >
              <option value="">Select an option…</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Barishal">Barishal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Tangail">Tangail</option>
            </select>
          </div>
          <div className="mb-4 2xl:mb-6">
            <label className="block mb-2 font-medium">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 outline-none"
              placeholder="House number and street name"
              required
            />
          </div>
          <div className="mb-4 2xl:mb-6">
            <label className="block mb-2 font-medium">Email (optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 outline-none"
            />
          </div>
          <div className="mb-4 2xl:mb-6">
            <label className="block mb-2 font-medium">
              Additional information (Note)
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 outline-none"
              rows="4"
              placeholder="Write any delivery notes or product details here..."
            ></textarea>
          </div>
        </form>
      </div>
      <div className="lg:w-[40%] bg-[#f7f7f7] w-full border p-4 rounded-lg lg:self-start pb-6">
        <h2 className="text-xl 2xl:text-2xl font-semibold mb-4">Your Order</h2>
        {myCartData?.length > 0 ? (
          <div>
            {myCartData.map((item) => (
              <div key={item._id}>
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center">
                    <FaTimes
                      className="cursor-pointer mr-3"
                      onClick={() => handleRemove(item._id)}
                    />
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm 2xl:text-base">
                          {item.name}
                        </span>{" "}
                        x <span>{quantities[item._id]}</span>
                      </div>
                      <span>
                        ৳{(item.price * quantities[item._id]).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 2xl:text-lg">
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
            <div className="border-t pt-4">
              <div className="flex justify-between py-2 2xl:text-lg">
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
              <div className="flex 2xl:text-2xl justify-between py-2 font-semibold text-gadDarkBlue text-lg">
                <span className="font-semibold">Total</span>
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
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={`w-full mt-4 ${
                isSubmitting ? "bg-gray-500" : "bg-gadDarkBlue"
              } text-white py-2 2xl:text-lg 2xl:py-[10px] rounded`}
            >
              {isSubmitting ? "Order Placing..." : "Place Order"}
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

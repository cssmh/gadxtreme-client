// components/Coupons.js
import { useState } from "react";
import { toast } from "sonner";

const Coupons = ({ applyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code.");
      return;
    }
    applyCoupon(couponCode);
  };

  return (
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
  );
};

export default Coupons;

import { useState, useEffect } from "react";
import logo from "../assets/discount.jpg";

const DiscountModal = () => {
  const [showModal, setShowModal] = useState(false);

  // Check if the modal was already shown in this session
  useEffect(() => {
    const modalShown = localStorage.getItem("discountModalShown");
    if (!modalShown) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    // Store in localStorage to prevent it from showing again in this session
    localStorage.setItem("discountModalShown", "true");
  };

  return (
    <>
      {showModal && (
        <div className="md:mt-16 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <button
              className="text-gray-500 hover:text-red-600 float-right"
              onClick={handleClose}
            >
              ✖
            </button>
            <img
              src={logo}
              alt="50% Discount Offer"
              className="mb-4 w-full"
            />
            <h2 className="text-2xl font-bold mb-2">Special Offer!</h2>
            <p className="mb-4">
              Get 50% off on your first purchase! Use code: FIRST50
            </p>
            <button
              onClick={handleClose}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountModal;

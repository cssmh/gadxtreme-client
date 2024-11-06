import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  // Redirect back if no orderId is available
  if (!orderId) {
    navigate("/orders"); // Redirect to orders page if orderId is missing
    return null;
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Process the payment logic here
    alert("Payment submitted successfully!");
    navigate("/orders"); // Navigate back to orders or show confirmation
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white px-6 pb-7 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Payment for Order #{orderId}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Complete your payment below to finalize your order.
        </p>

        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-150"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

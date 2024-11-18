import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
const Success = () => {
  const { tranId } = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-green-700">
          Payment Success
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your payment has been successfully processed. Thank you for your
          purchase!
        </p>
        <p className="text-sm">Transaction ID : {tranId}</p>
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => (window.location.href = "/my-account/orders")}
          >
            Go to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;

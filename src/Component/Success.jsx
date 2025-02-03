import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Success = () => {
  const { tranId } = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 py-12 px-6">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full text-center">
        <FaCheckCircle className="text-green-600 text-5xl mb-3 mx-auto" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful
        </h1>
        <p className="text-sm text-gray-600 mb-3">
          Your payment has been successfully processed. Thank you for your
          purchase!
        </p>
        <p className="text-xs text-gray-500 mb-6">Transaction ID: {tranId}</p>
        <div className="mt-2">
          <button
            className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => (window.location.href = "/dashboard/orders")}
          >
            Go to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;

import { Link } from "react-router-dom";

const PayCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We&apos;re sorry, but your payment was not successful.
        </p>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Something Went Wrong
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Please check your payment details or try again later.
          </p>
        </div>
        <div className="flex gap-5 justify-center">
          <Link
            to="dashboard/orders"
            className="p-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-200"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="p-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PayCancel;

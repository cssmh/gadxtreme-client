import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <div className="text-red-500">
          <FaExclamationTriangle className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Oops!</h1>
        <p className="text-gray-600 mt-2">
          The page you&lsquo;re looking for doesn&lsquo;t exist or an error
          occurred.
        </p>
        <p className="text-gray-600">
          Please try again or go back to the homepage.
        </p>

        <Link to="/" className="mt-8">
          <button className="text-white bg-emerald-600 hover:bg-emerald-700 transition duration-300 ease-in-out font-medium rounded-lg text-sm px-6 py-3">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;

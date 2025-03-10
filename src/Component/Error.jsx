import { Link } from "react-router-dom";
import { FaRegSadCry } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 p-10 bg-white shadow-xl rounded-3xl w-full max-w-md">
        <div className="text-indigo-600">
          <FaRegSadCry className="text-7xl animate-pulse mx-auto" />
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
          Whoops! Something Went Wrong.
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you’re looking for is not available. Please try again later
          or return to the homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-teal-400 to-teal-600 rounded-full shadow-lg transform hover:scale-105 hover:bg-teal-700 transition-all duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;

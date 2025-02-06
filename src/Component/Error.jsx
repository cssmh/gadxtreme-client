import { Link } from "react-router-dom";
import { FaRegSadCry } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-gray-100">
      <div className="text-center space-y-3 p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md">
        <div className="animate-bounce">
          <FaRegSadCry className="text-6xl text-teal-600 mx-auto" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Oops! Something Went Wrong.
        </h1>
        <p className="text-base text-gray-600">
          We couldn&lsquo;t find the page you&lsquo;re looking for. Please check
          the URL or go back to the homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2 text-xl font-semibold text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition-all duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;

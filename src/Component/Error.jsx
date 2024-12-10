import { Link } from "react-router-dom";
import { FaRegSadCry } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white shadow-xl rounded-xl w-full max-w-lg">
        <FaRegSadCry className="text-6xl text-teal-600 mx-auto" />
        <h1 className="mt-6 text-4xl font-extrabold text-gray-800">
          Oops! Something Went Wrong.
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          We couldn&lsquo;t find the page you&lsquo;re looking for. Please check
          the URL or go back to the homepage.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-8 py-3 text-xl font-semibold text-white bg-teal-600 rounded-md transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;

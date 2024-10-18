import { Link } from "react-router-dom";
import { FaRegSadCry } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-5 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center border border-gray-300">
        <FaRegSadCry className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          Sorry, the page you are looking for does not exist. It might have been
          removed or the URL is incorrect.
        </p>
        <Link to="/" className="w-full">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-300 ease-in-out w-full">
            Go Back Home
          </button>
        </Link>
        <h2 className="text-xl font-semibold text-gray-700 mt-5 mb-2">
          Explore Our Categories:
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Link to="/category/fan">
            <div className="bg-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
              <h3 className="text-center font-medium text-gray-800">Fan</h3>
            </div>
          </Link>
          <Link to="/category/earbuds">
            <div className="bg-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
              <h3 className="text-center font-medium text-gray-800">Earbuds</h3>
            </div>
          </Link>
          <Link to="/category/speakers">
            <div className="bg-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
              <h3 className="text-center font-medium text-gray-800">
                Speakers
              </h3>
            </div>
          </Link>
          <Link to="/category/smart-watches">
            <div className="bg-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
              <h3 className="text-center font-medium text-gray-800">
                Smart Watches
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import { Link } from "react-router-dom";
import { FaUserShield, FaHeart, FaClipboardList } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <motion.div
        className="max-w-7xl 2xl:max-w-[92%] mx-auto p-3 md:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-xl lg:text-3xl font-semibold text-gray-800">
          Welcome to Your Dashboard, {user?.displayName}
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          Get insights, manage your account, and explore your preferences.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-2 md:mt-10">
          <motion.div
            className="p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              My Wishlist
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Keep track of your favorite items and manage your preferences.
            </p>
            <Link
              to="/dashboard/wishlist"
              className="inline-block px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              <span className="flex items-center gap-1">
                <FaHeart className="mr-2" /> View Wishlist
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="bg-white p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">My Orders</h2>
            <p className="text-sm text-gray-500 mb-4">
              Track your order history and manage recent purchases.
            </p>
            <Link
              to="/dashboard/orders"
              className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              <span className="flex items-center gap-1">
                <FaClipboardList className="mr-2" /> View Orders
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="bg-white p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              Profile Settings
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              View and manage your profile details and preferences.
            </p>
            <Link
              to="/profile"
              className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
            >
              <span className="flex items-center gap-1">
                <FaUserShield className="mr-2" /> Go to Profile
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;

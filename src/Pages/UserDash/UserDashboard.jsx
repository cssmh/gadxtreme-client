import { Link } from "react-router-dom";
import {
  FaUserShield,
  FaHeart,
  FaClipboardList,
  FaCartPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useUserCount from "../../hooks/useUserCount";

const UserDashboard = () => {
  const { user, isLoading, data } = useUserCount();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800">
          Welcome to Your Dashboard, {user?.displayName}
        </h1>
        <p className="text-gray-700 2xl:text-lg mb-5">
          Get insights, manage your account, and explore your preferences.
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mt-2 md:mt-10">
          <motion.div
            className="p-3 md:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
              Total Cart
            </h2>
            <p className="text-sm 2xl:text-base text-gray-500 mb-4">
              Items added to your cart.
            </p>
            <div className="flex items-center font-semibold gap-2">
              <FaCartPlus className="text-2xl 2xl:text-3xl text-blue-600" />
              <p className="text-2xl 2xl:text-3xl text-gray-900">
                {data?.totalCart || 0}
                <span>({data?.unpaid || 0})</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="p-3 md:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
              Total Orders
            </h2>
            <p className="text-sm 2xl:text-base text-gray-500 mb-4">
              Track your total number of orders.
            </p>
            <div className="flex items-center font-semibold gap-2">
              <FaClipboardList className="text-2xl 2xl:text-3xl text-orange-600" />
              <p className="text-2xl 2xl:text-3xl text-gray-900">
                {data?.totalOrders || 0}
              </p>
            </div>
          </motion.div>
          <motion.div
            className="p-3 md:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
              Total Revenue
            </h2>
            <p className="text-sm 2xl:text-base text-gray-500 mb-4">
              Total amount spent on orders.
            </p>
            <div className="flex items-center font-semibold gap-2">
              <span className="text-2xl 2xl:text-3xl text-green-500">৳</span>
              <p className="text-2xl 2xl:text-3xl text-gray-900">
                {data?.totalRevenue || "0.00"}
              </p>
            </div>
          </motion.div>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mt-2 md:mt-10">
          <motion.div
            className="p-3 md:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
              My Wishlist
            </h2>
            <p className="text-sm 2xl:text-base text-gray-500 mb-4">
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
            className="p-3 md:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
              My Orders
            </h2>
            <p className="text-sm 2xl:text-base text-gray-500 mb-4">
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
            className="p-3 md:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
              Profile Settings
            </h2>
            <p className="text-sm 2xl:text-base text-gray-500 mb-4">
              View and manage your profile details and preferences.
            </p>
            <Link
              to="/dashboard/profile"
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

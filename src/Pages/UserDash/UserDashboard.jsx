import { Link } from "react-router-dom";
import {
  FaUserShield,
  FaHeart,
  FaClipboardList,
  FaCartPlus,
  FaDollarSign,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { myDashboard } from "../../Api/cartGadget";

const UserDashboard = () => {
  const { loading, user } = useAuth();
  const { data } = useQuery({
    queryKey: ["userCount", user?.email],
    queryFn: async () => await myDashboard(user?.email),
    enabled: !loading && !!user?.email,
  });

  return (
    <div>
      <motion.div
        className="md:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
          Welcome to Your Dashboard, {user?.displayName}
        </h1>
        <p className="md:text-lg text-gray-700 mb-5">
          Get insights, manage your account, and explore your preferences.
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mt-2 md:mt-10">
          <motion.div
            className="p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">Total Cart</h2>
            <p className="text-sm text-gray-500 mb-4">
              Items added to your cart.
            </p>
            <div className="flex items-center space-x-4">
              <FaCartPlus className="text-4xl text-blue-600" />
              <p className="text-3xl font-bold text-gray-900">
                {data?.totalCart || 0}
                <span>({data?.unpaid || 0})</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              Total Orders
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Track your total number of orders.
            </p>
            <div className="flex items-center space-x-4">
              <FaClipboardList className="text-4xl text-orange-600" />
              <p className="text-3xl font-bold text-gray-900">
                {data?.totalOrders || 0}
              </p>
            </div>
          </motion.div>
          <motion.div
            className="p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              Total Revenue
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Total amount spent on orders.
            </p>
            <div className="flex items-center space-x-4">
              <FaDollarSign className="text-4xl text-green-600" />
              <p className="text-3xl font-bold text-gray-900">
                ${data?.totalRevenue || "0.00"}
              </p>
            </div>
          </motion.div>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mt-2 md:mt-10">
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
            className="p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
            className="p-3 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              Profile Settings
            </h2>
            <p className="text-sm text-gray-500 mb-4">
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

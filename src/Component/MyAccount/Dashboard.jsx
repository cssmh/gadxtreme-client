import { Link } from "react-router-dom";
import { FaUserShield, FaHeart, FaClipboardList } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen">
      <motion.div
        className="max-w-6xl mx-auto bg-white p-3 lg:p-6 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800 mb-6">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome,{" "}
          <span className="font-semibold text-blue-500">
            {user?.displayName}
          </span>{" "}
          to your account dashboard!
        </p>
        {!isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Link
              to="/admin-dashboard"
              className="inline-flex items-center px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              <FaUserShield className="mr-2" /> Admin Dashboard
            </Link>
          </motion.div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <motion.div
            className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">My Wishlist</h2>
            <p className="text-sm text-gray-600 mb-3">
              View your favorite items.
            </p>
            <Link
              to="/my-account/wishlist"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <span className="flex items-center gap-1">
                <FaHeart className="mr-2" /> Go to Wishlist{" "}
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">My Orders</h2>
            <p className="text-sm text-gray-600 mb-3">
              Check your recent orders.
            </p>
            <Link
              to="/my-account/orders"
              className="inline-block px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
            >
              <span className="flex items-center gap-1">
                <FaClipboardList className="mr-2" /> View Orders{" "}
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">
              Profile Information
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              View and manage your profile details.
            </p>
            <Link
              to="/my-account/profile"
              className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
            >
              <span className="flex items-center gap-1">
                <FaUserShield className="mr-2" /> Go to Profile
              </span>
            </Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-5 lg:mb-0">
          <motion.div
            className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">
              Total Orders
            </h2>
            <p className="text-3xl font-bold text-gray-800">120</p>
            <p className="text-sm text-gray-600 mt-2">Orders completed</p>
          </motion.div>
          <motion.div
            className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">Total Sales</h2>
            <p className="text-3xl font-bold text-gray-800">৳500,000</p>
            <p className="text-sm text-gray-600 mt-2">Sales value</p>
          </motion.div>
          <motion.div
            className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">New Users</h2>
            <p className="text-3xl font-bold text-gray-800">15</p>
            <p className="text-sm text-gray-600 mt-2">Users joined today</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

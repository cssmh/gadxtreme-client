import { Link } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaChartPie } from "react-icons/fa";
import { FaUserShield, FaHeart, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";
import { totalCounts } from "../../Api/admin";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const { data = {} } = useQuery({
    queryKey: ["totalCounts"],
    queryFn: async () => await totalCounts(),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-6 mb-4 md:mb-8 text-center text-white">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2">Manage your store and track performance</p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-2 md:px-6 mb-5 md:mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <FaChartPie className="text-4xl text-blue-600" />
            <div>
              <Link to="/dashboard/all-ordered">
                <h3 className="font-semibold text-gray-700">Total Orders</h3>
              </Link>
              <p className="text-3xl font-bold text-gray-900">
                {data?.totalOrder || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-4xl text-green-600" />
            <div>
              <Link to="/dashboard/all-users">
                <h3 className="font-semibold text-gray-700">Total Users</h3>
              </Link>
              <p className="text-3xl font-bold text-gray-900">
                {data?.totalUser || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <FaBoxOpen className="text-4xl text-orange-600" />
            <div>
              <Link to="/dashboard/all-products">
                <h3 className="font-semibold text-gray-700">Total Products</h3>
              </Link>
              <p className="text-3xl font-bold text-gray-900">
                {data?.totalProduct || 0}
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-t-2 border-gray-200 mb-8 mx-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-2 md:mt-10">
        <motion.div
          className="bg-white p-5 md:p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">My Wishlist</h2>
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
          className="bg-white p-5 md:p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
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
          className="bg-white p-5 md:p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">
            Profile Information
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            View and manage your profile details. keep updated!
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
    </div>
  );
};

export default AdminDashboard;

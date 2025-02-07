import { Link } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaChartPie } from "react-icons/fa";
import { motion } from "framer-motion";
import { totalCounts } from "../../Api/admin";
import { useQuery } from "@tanstack/react-query";
import UserDashboard from "../UserDash/UserDashboard";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

const AdminDashboard = () => {
  const { data = {} } = useQuery({
    queryKey: ["totalCounts"],
    queryFn: totalCounts,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-6 mb-4 md:mb-8 text-center text-white rounded-b-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2 md:text-lg">
          Manage your store and track performance
        </p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 md:px-6 mb-5 md:mb-8">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
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
        </motion.div>
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
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
        </motion.div>
        <motion.div
          className="bg-white rounded-lg p-6 shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
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
        </motion.div>
      </section>
      <hr className="md:border-t-2 md:border-gray-200 mb-4 md:mb-8 md:mx-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mt-2 md:mt-10">
        <motion.div
          className="bg-white p-5 md:p-6 rounded-lg shadow-md transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">All Products</h2>
          <p className="text-sm text-gray-500 mb-4">
            Keep track of your favorite items and manage your preferences.
          </p>
          <Link
            to="/dashboard/all-products"
            className="inline-block px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
          >
            <span className="flex items-center gap-1">
              <MdProductionQuantityLimits className="mr-2" /> All Products
            </span>
          </Link>
        </motion.div>
        <motion.div
          className="bg-white p-5 md:p-6 rounded-lg shadow-md transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">All Orders</h2>
          <p className="text-sm text-gray-500 mb-4">
            Track all order history and manage recent purchases.
          </p>
          <Link
            to="/dashboard/all-ordered"
            className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
          >
            <span className="flex items-center gap-1">
              <AiOutlineProduct className="mr-2" />
              All Orders
            </span>
          </Link>
        </motion.div>
        <motion.div
          className="bg-white p-5 md:p-6 rounded-lg shadow-md transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">All Users</h2>
          <p className="text-sm text-gray-500 mb-4">
            View user profile details. Keep eye on them!
          </p>
          <Link
            to="/dashboard/all-users"
            className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
          >
            <span className="flex items-center gap-1">
              <FaUsers className="mr-2" /> All Users
            </span>
          </Link>
        </motion.div>
      </div>
      <div className="mt-10">
        <UserDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;

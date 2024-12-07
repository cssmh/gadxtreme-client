import { Link } from "react-router-dom";
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaPlus,
  FaChartPie,
} from "react-icons/fa";
import { totalCounts } from "../../Api/admin";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const { data = {} } = useQuery({
    queryKey: ["totalCounts"],
    queryFn: async () => await totalCounts(),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-6 mb-8 text-center text-white">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2">Manage your store and track performance</p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-2 md:px-6 md:mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <FaChartPie className="text-4xl text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-700">Total Orders</h3>
              <p className="text-xl font-bold text-gray-900">
                {data?.totalOrder || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-4xl text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-700">Total Users</h3>
              <p className="text-xl font-bold text-gray-900">
                {data?.totalUser || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <FaBoxOpen className="text-4xl text-orange-600" />
            <div>
              <h3 className="font-semibold text-gray-700">Total Products</h3>
              <p className="text-xl font-bold text-gray-900">
                {data?.totalProduct || 0}
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-t-2 border-gray-200 mb-8 mx-6" />
      <section className="bg-white md:shadow-md rounded-lg p-4 md:p-8 mb-6 md:mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Link
            to="/admin-dashboard/add-product"
            className="p-6 bg-blue-200 rounded-lg hover:bg-blue-300 flex items-center justify-between shadow-md transition-all duration-300"
          >
            <FaPlus className="text-blue-600 text-3xl" />
            <span className="text-lg font-semibold text-gray-700">
              Add Product
            </span>
          </Link>
          <Link
            to="/admin-dashboard/manage-products"
            className="p-6 bg-yellow-200 rounded-lg hover:bg-yellow-300 flex items-center justify-between shadow-md transition-all duration-300"
          >
            <FaBoxOpen className="text-yellow-600 text-3xl" />
            <span className="text-lg font-semibold text-gray-700">
              Manage Products
            </span>
          </Link>
          <Link
            to="/admin-dashboard/orders"
            className="p-6 bg-green-200 rounded-lg hover:bg-green-300 flex items-center justify-between shadow-md transition-all duration-300"
          >
            <FaShoppingCart className="text-green-600 text-3xl" />
            <span className="text-lg font-semibold text-gray-700">
              View Orders
            </span>
          </Link>
          <Link
            to="/admin-dashboard/all-users"
            className="p-6 bg-purple-200 rounded-lg hover:bg-purple-300 flex items-center justify-between shadow-md transition-all duration-300"
          >
            <FaUsers className="text-purple-600 text-3xl" />
            <span className="text-lg font-semibold text-gray-700">
              Manage Users
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

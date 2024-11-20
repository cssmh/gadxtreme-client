import { Link } from "react-router-dom";
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaPlus,
  FaChartPie,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <div className="p-4 bg-white shadow rounded-lg flex items-center">
          <FaChartPie className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Orders
            </h2>
            <p className="text-2xl font-bold text-gray-900">1,245</p>
          </div>
        </div>
        <div className="p-4 bg-white shadow rounded-lg flex items-center">
          <FaUsers className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="text-2xl font-bold text-gray-900">542</p>
          </div>
        </div>
        <div className="p-4 bg-white shadow rounded-lg flex items-center">
          <FaBoxOpen className="text-4xl text-orange-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <p className="text-2xl font-bold text-gray-900">328</p>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Admin Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin-dashboard/add-product"
            className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-between"
          >
            <FaPlus className="text-blue-500 text-2xl" />
            <span className="text-gray-700 font-semibold">Add Product</span>
          </Link>
          <Link
            to="/admin-dashboard/manage-products"
            className="p-4 bg-yellow-100 hover:bg-yellow-200 rounded-lg flex items-center justify-between"
          >
            <FaBoxOpen className="text-yellow-500 text-2xl" />
            <span className="text-gray-700 font-semibold">Manage Products</span>
          </Link>
          <Link
            to="/admin-dashboard/orders"
            className="p-4 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-between"
          >
            <FaShoppingCart className="text-green-500 text-2xl" />
            <span className="text-gray-700 font-semibold">View Orders</span>
          </Link>
          <Link
            to="/admin-dashboard/all-users"
            className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg flex items-center justify-between"
          >
            <FaUsers className="text-purple-500 text-2xl" />
            <span className="text-gray-700 font-semibold">Manage Users</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaPlus, FaThList, FaClipboardList, FaUsers } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import logo from "../../assets/favicon.webp";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-gray-100 fixed top-0 left-0 w-full z-30">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <AiOutlineBars className="h-6 w-6 text-gray-700" />
        </button>
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      <div
        className={`bg-base-200 fixed z-50 top-0 left-0 h-full w-56 md:w-60 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        <div className="p-4 border-b border-gray-300">
          <Link to="/admin-dashboard">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </Link>
        </div>
        <nav className="mt-4">
          <NavLink
            to="/admin-dashboard/add-product"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-500 font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaPlus className="mr-3 text-lg" />
            Add Product
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage-products"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-500 font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaThList className="mr-3 text-lg" />
            Manage Products
          </NavLink>
          <NavLink
            to="/admin-dashboard/orders"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-500 font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaClipboardList className="mr-3 text-lg" />
            Ordered Product
          </NavLink>
          <NavLink
            to="/admin-dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-500 font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUsers className="mr-3 text-lg" />
            All Users
          </NavLink>
        </nav>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

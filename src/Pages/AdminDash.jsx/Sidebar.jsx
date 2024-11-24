import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { AiOutlineBars, AiOutlineProduct } from "react-icons/ai";
import logo from "../../assets/favicon.webp";
import { MdAddTask, MdProductionQuantityLimits } from "react-icons/md";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-teal-700 text-white fixed top-0 left-0 w-full z-30">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <AiOutlineBars className="h-6 w-6" />
        </button>
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      <div
        className={`bg-white shadow-lg fixed z-50 top-0 left-0 h-full w-56 md:w-60 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        <div className="p-4 border-b border-gray-300">
          <Link to="/admin-dashboard">
            <h1 className="text-2xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </Link>
        </div>
        <nav className="mt-6 space-y-2">
          <NavLink
            to="/admin-dashboard/add-product"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 text-gray-700 ${
                isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <MdAddTask className="mr-3 text-lg" />
            Add Product
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage-products"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 text-gray-700 ${
                isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <MdProductionQuantityLimits className="mr-3 text-lg" />
            Manage Products
          </NavLink>
          <NavLink
            to="/admin-dashboard/all-ordered"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 text-gray-700 ${
                isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <AiOutlineProduct className="mr-3 text-lg" />
            Ordered Product
          </NavLink>
          <NavLink
            to="/admin-dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-colors duration-200 text-gray-700 ${
                isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
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
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

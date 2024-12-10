import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUsers, FaRegComments, FaRegListAlt } from "react-icons/fa";
import { AiOutlineBars, AiOutlineProduct } from "react-icons/ai";
import logo from "../../assets/favicon.webp";
import { MdAddTask, MdProductionQuantityLimits } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { BsCartCheck } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import useAdmin from "../../hooks/useAdmin";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAdminRoutes, setShowAdminRoutes] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await logout();
    toggleSidebar();
  };

  const handleAdminToggle = () => {
    setShowAdminRoutes(!showAdminRoutes);
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
        className={`bg-[#f3f4f6] shadow-lg overflow-x-auto fixed z-50 top-0 left-0 h-full w-56 md:w-60 transform transition-transform duration-300 ease-in-out  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0  md:block`}
        // md:relative
      >
        <div className="px-4 pt-4 border-b border-gray-300">
          <Link to="/" className="hidden md:block">
            <div className="w-full hidden md:flex px-4 py-1 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <img src={logo} className="h-14" alt="Logo" />
            </div>
          </Link>
          {user && (
            <div className="flex items-center px-4 my-4 text-gray-600">
              <span className="font-medium">
                Hi, {user?.displayName || "User"}
              </span>
            </div>
          )}
        </div>
        {isAdmin && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
            <span className="text-gray-700">Admin Routes</span>
            <button
              onClick={handleAdminToggle}
              className={`text-sm px-3 py-1 rounded-lg transition ${
                showAdminRoutes
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {showAdminRoutes ? "Hide" : "Show"}
            </button>
          </div>
        )}
        {!showAdminRoutes && (
          <nav className="mt-1">
            <NavLink
              to="/dashboard/my-reviews"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaRegComments className="mr-3 text-xl" />
              My Reviews
            </NavLink>
            <NavLink
              to="/dashboard/pending-reviews"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaRegListAlt className="mr-3 text-xl" />
              Pending Reviews
            </NavLink>
            <NavLink
              to="/dashboard/pending-products"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdProductionQuantityLimits className="mr-3 text-xl" />
              Pending Products
            </NavLink>
          </nav>
        )}
        {isAdmin && showAdminRoutes && (
          <nav>
            <NavLink
              to="/dashboard/add-product"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdAddTask className="mr-3 text-xl" />
              Add Product
            </NavLink>
            <NavLink
              to="/dashboard/user-carts"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <BsCartCheck className="mr-3 text-xl" />
              Cart Products
            </NavLink>
            <NavLink
              to="/dashboard/all-products"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdProductionQuantityLimits className="mr-3 text-xl" />
              All Products
            </NavLink>
            <NavLink
              to="/dashboard/all-ordered"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <AiOutlineProduct className="mr-3 text-xl" />
              Ordered Product
            </NavLink>
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                  isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaUsers className="mr-3 text-xl" />
              All Users
            </NavLink>
          </nav>
        )}
        <div className="mt-auto border-t border-gray-300 pt-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
                isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <MdAddTask className="mr-3 text-xl" />
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center py-3 pl-5 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 w-full"
          >
            <RiLogoutBoxLine className="mr-3 text-xl" />
            Logout
          </button>
        </div>
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

import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUsers, FaRegComments, FaRegListAlt } from "react-icons/fa";
import { AiOutlineBars, AiOutlineProduct } from "react-icons/ai";
import {
  MdAddTask,
  MdOutlineSpaceDashboard,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import usePendingReview from "../../hooks/usePendingReview";
import { assets } from "../../assets/assets";
import { RouteContext } from "./AdminContext";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const { total } = usePendingReview();
  const { isAdmin } = useAdmin();
  const loc = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { showAdminRoutes, setShowAdminRoutes } = useContext(RouteContext);

  useEffect(() => {
    localStorage.setItem("showAdminRoutes", showAdminRoutes);
  }, [showAdminRoutes]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logOut();
    toggleSidebar();
  };

  const handleAdminToggle = () => {
    setShowAdminRoutes(!showAdminRoutes);
  };

  const userRoutes = [
    { to: "/dashboard", icon: <MdOutlineSpaceDashboard />, label: "Dashboard" },
    { to: "/cart", icon: <BsCartCheck />, label: "My Cart" },
    { to: "/dashboard/orders", icon: <MdAddTask />, label: "My Orders" },
    {
      to: "/dashboard/pending-reviews",
      icon: <FaRegListAlt />,
      label: `Pending Review (${total || 0})`,
    },
    {
      to: "/dashboard/my-reviews",
      icon: <FaRegComments />,
      label: "My Reviews",
    },
  ];

  const adminRoutes = [
    { to: "/dashboard", icon: <MdOutlineSpaceDashboard />, label: "Dashboard" },
    { to: "/dashboard/add-product", icon: <MdAddTask />, label: "Add Product" },
    { to: "/dashboard/user-carts", icon: <BsCartCheck />, label: "All Carts" },
    {
      to: "/dashboard/all-products",
      icon: <MdProductionQuantityLimits />,
      label: "All Products",
    },
    { to: "/dashboard/all-users", icon: <FaUsers />, label: "All Users" },
    {
      to: "/dashboard/all-ordered",
      icon: <AiOutlineProduct />,
      label: "All Ordered",
    },
  ];

  const renderRoutes = (routes) =>
    routes.map(({ to, icon, label }) => (
      <Link
        key={to}
        to={to}
        className={`flex items-center py-[11px] 2xl:py-4 text-[15px] 2xl:text-xl pl-3 rounded-lg transition-colors duration-200 text-gray-700 hover:bg-teal-50 ${
          loc.pathname === to ? "bg-teal-50 text-teal-600" : ""
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <span className="text-lg">{icon}</span>
        <span className="ml-3">{label}</span>
      </Link>
    ));

  return (
    <div className="relative">
      <div className="lg:hidden flex justify-between items-center px-5 py-2 bg-white text-black fixed top-0 left-0 w-full shadow-md">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <AiOutlineBars className="w-7 h-7" />
        </button>
        <Link to="/">
          <img
            src={assets.gadget}
            alt="Logo"
            className="w-11 rounded-full shadow-sm"
          />
        </Link>
      </div>
      <div
        className={`flex flex-col bg-white py-1 shadow-xl fixed z-50 top-0 left-0 h-full w-60 2xl:w-80 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-4 2xl:px-6 border-b border-gray-200 2xl:pt-2">
          <Link to="/" className="hidden lg:block">
            <div className="w-full hidden lg:flex px-4 py-2 shadow-md rounded-lg justify-center items-center bg-teal-50 mx-auto">
              <img src={assets.gadget} className="h-14" alt="Logo" />
            </div>
          </Link>
          {user && (
            <div className="px-1 my-3 text-gray-700">
              <span className="text-base 2xl:text-xl font-semibold">
                Hi, {user?.displayName || "User"}
              </span>
              <p className="text-sm 2xl:text-base text-gray-500">
                {isAdmin && showAdminRoutes ? "Admin" : "User"}
              </p>
            </div>
          )}
        </div>
        {isAdmin && (
          <div className="flex items-center justify-between px-5 2xl:px-7 py-3 border-b border-gray-200 bg-teal-50">
            <span className="text-sm 2xl:text-base text-gray-700">
              Admin Routes
            </span>
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
        <nav className="flex-1 mt-3 px-3 overflow-y-auto">
          {isAdmin && showAdminRoutes
            ? renderRoutes(adminRoutes)
            : renderRoutes(userRoutes)}
        </nav>
        <div className="px-3 border-t border-gray-200 bg-white">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center py-2 pl-5 text-[15px] 2xl:text-xl rounded-lg transition-colors duration-200 text-gray-700 hover:bg-teal-50 ${
                isActive ? "bg-teal-50 text-teal-600 font-semibold" : ""
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <MdAddTask className="mr-3 text-lg" />
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center py-3 2xl:py-4 text-[15px] 2xl:text-xl pl-5 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 w-full"
          >
            <RiLogoutBoxLine className="mr-3 text-lg" />
            Logout
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

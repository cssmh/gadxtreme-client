import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUsers, FaRegComments, FaRegListAlt } from "react-icons/fa";
import { AiOutlineBars, AiOutlineProduct } from "react-icons/ai";
import { MdAddTask, MdProductionQuantityLimits } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const { isAdmin } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAdminRoutes, setShowAdminRoutes] = useState(true);

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

  // Define common routes
  const userRoutes = [
    { to: "/cart", icon: <BsCartCheck />, label: "My Cart" },
    { to: "/dashboard/orders", icon: <MdAddTask />, label: "My Orders" },
    {
      to: "/dashboard/pending-products",
      icon: <MdProductionQuantityLimits />,
      label: "Pending Order",
    },
    {
      to: "/dashboard/my-reviews",
      icon: <FaRegComments />,
      label: "My Reviews",
    },
    {
      to: "/dashboard/pending-reviews",
      icon: <FaRegListAlt />,
      label: "Pending Review",
    },
  ];

  const adminRoutes = [
    { to: "/dashboard/add-product", icon: <MdAddTask />, label: "Add Product" },
    {
      to: "/dashboard/user-carts",
      icon: <BsCartCheck />,
      label: "Cart Products",
    },
    {
      to: "/dashboard/all-products",
      icon: <MdProductionQuantityLimits />,
      label: "All Products",
    },
    {
      to: "/dashboard/all-ordered",
      icon: <AiOutlineProduct />,
      label: "Ordered Product",
    },
    { to: "/dashboard/all-users", icon: <FaUsers />, label: "All Users" },
  ];

  const renderRoutes = (routes) =>
    routes.map(({ to, icon, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `flex items-center py-3 pl-5 rounded-lg transition-colors duration-200 text-gray-700 ${
            isActive ? "text-teal-600 font-semibold" : "hover:bg-teal-50"
          }`
        }
        onClick={() => setIsSidebarOpen(false)}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </NavLink>
    ));

  return (
    <div className="relative">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-5 py-2 bg-teal-700 text-white fixed top-0 left-0 w-full z-30">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <AiOutlineBars className="h-7 w-7" />
        </button>
        <Link to="/">
          <img src={assets.gadget} alt="Logo" className="w-10" />
        </Link>
      </div>

      {/* Sidebar */}
      <div
        className={`flex flex-col bg-[#f3f4f6] shadow-lg fixed z-50 top-0 left-0 h-full w-56 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="px-4 pt-4 border-b border-gray-300">
          <Link to="/" className="hidden md:block">
            <div className="w-full hidden md:flex px-4 py-1 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <img src={assets.gadget} className="h-14" alt="Logo" />
            </div>
          </Link>
          {user && (
            <div className="flex items-center px-1 my-1 md:my-4 pb-3 md:pb-0 text-gray-600">
              <span className="font-medium">
                Hi, {user?.displayName || "User"}
              </span>
            </div>
          )}
        </div>

        {/* Admin Toggle */}
        {isAdmin && (
          <div className="flex items-center justify-center gap-3 py-2 border-b border-gray-300">
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

        {/* Routes */}
        <nav className="mt-1 px-1">
          {isAdmin && showAdminRoutes
            ? renderRoutes(adminRoutes)
            : renderRoutes(userRoutes)}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-1 border-t border-gray-300 pt-2">
          <NavLink
            to="/dashboard/profile"
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

      {/* Sidebar Overlay */}
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

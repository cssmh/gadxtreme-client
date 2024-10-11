import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaThList, FaClipboardList } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-10 h-full w-64 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        </div>
        <nav>
          <NavLink
            to="/admin-dashboard/add-product"
            className="block py-2.5 px-4 rounded hover:text-gadBlue"
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile when clicking a link
          >
            <FaPlus className="inline-block mr-2" />
            Add Product
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage-products"
            className="block py-2.5 px-4 rounded hover:text-gadBlue"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaThList className="inline-block mr-2" />
            Manage Products
          </NavLink>
          <NavLink
            to="/admin-dashboard/orders"
            className="block py-2.5 px-4 rounded hover:text-gadBlue"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaClipboardList className="inline-block mr-2" />
            Orders
          </NavLink>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

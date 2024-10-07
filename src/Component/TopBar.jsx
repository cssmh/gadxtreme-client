import logo from "../assets/logo.png";
import { FaUser, FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-black p-4 flex items-center justify-between px-4 sm:px-10">
      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-between w-full">
        {/* Logo */}
        <div className="text-white text-2xl font-bold flex-shrink-0">
          <img src={logo} className="w-44" alt="Logo" />
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FaUser
            className="text-white cursor-pointer"
            title="Login/Register"
          />
          <p className="text-white font-semibold">Login/Register</p>
          <FaHeart className="text-white cursor-pointer" title="Wishlist" />
          <FaShoppingCart className="text-white cursor-pointer" title="Cart" />
          <FaBars className="text-white cursor-pointer" title="Menu" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden bg-white p-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logo} className="w-32" alt="Logo" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FaShoppingCart className="text-black cursor-pointer" title="Cart" />
          <FaBars className="text-black cursor-pointer" title="Menu" />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden w-full mt-2">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>
    </div>
  );
};

export default TopBar;

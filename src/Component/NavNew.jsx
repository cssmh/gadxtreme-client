import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import {
  FaHeart,
  FaShoppingCart,
  FaCaretDown,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const categories = [
  {
    name: "Mobile Accessories",
    link: "/mobile-accessories",
    subcategories: ["Charger & Cable", "Cables & Converters", "PowerBanks"],
  },
  { name: "New Arrival", link: "/new-arrival", subcategories: [] },
  {
    name: "Earphones & Headphones",
    link: "/earphones-headphones",
    subcategories: ["Headphone/Headset", "Earphones", "TWS Earbuds"],
  },
  { name: "Earbuds", link: "/earbuds", subcategories: [] },
  {
    name: "Speakers",
    link: "/speakers",
    subcategories: ["Bluetooth Speaker", "Wired Speaker"],
  },
  { name: "Best Seller", link: "/best-seller", subcategories: [] },
  { name: "Smart Watches", link: "/smart-watches", subcategories: [] },
  { name: "Lifestyle", link: "/lifestyle", subcategories: [] },
  {
    name: "More",
    link: "/more",
    subcategories: ["Smart TV", "Laptops", "Others"],
  },
];

const NavNew = () => {
  const { user, logOut } = useAuth();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleLogOut = () => {
    logOut().then().catch();
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white">
      {/* Upper section: Logo, Search, User Actions */}
      <div className="px-4 pt-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} className="w-40" alt="Logo" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-grow mx-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          <FaHeart
            className="text-gray-600 cursor-pointer text-xl"
            title="Wishlist"
          />
          <FaShoppingCart
            className="text-gray-600 cursor-pointer text-xl"
            title="Cart"
          />

          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <p className="text-gray-500 font-medium cursor-pointer">
                Hi, {user?.displayName || "Anonymous"}
              </p>
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/my-account/dashboard"
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/my-account/orders"
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/my-account/wishlist"
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 font-semibold">
              Login/Register
            </Link>
          )}
        </div>
      </div>

      {/* Lower section: Category Links */}
      <div className="py-2">
        <ul className="flex justify-center space-x-6">
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                to={category.link}
                className="flex font-medium text-sm items-center py-2 text-gray-500 hover:text-blue-500"
              >
                {category.name}
                {category.subcategories.length > 0 && (
                  <FaCaretDown className="ml-1" />
                )}
              </Link>

              {/* Subcategories dropdown */}
              {hoveredCategory === category.name &&
                category.subcategories.length > 0 && (
                  <div className="absolute left-0 z-50 bg-white text-gray-600 rounded shadow-lg">
                    <div className="py-2 space-y-1">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`/subcategory/${subcategory
                            .toLowerCase()
                            .replace(/ & /g, "-")
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-1 text-sm hover:text-blue-500 whitespace-nowrap"
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavNew;

import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import {
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaCaretDown,
  FaPlus,
  FaMinus,
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
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const toggleSubcategory = (categoryName) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white">
      {/* Upper section: Logo, Search, User Actions */}
      <div className="px-4 pt-2 md:pt-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} className="w-40" alt="Logo" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-grow mx-6 hidden lg:flex">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 border border-gray-300 rounded-xl"
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
              <p className="hidden md:block text-gray-500 font-medium cursor-pointer">
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
                    className="block px-4 py-1 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-500 font-medium">
              Login/Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <FaTimes className="text-gray-600 text-xl" />
            ) : (
              <FaBars className="text-gray-600 text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Search bar for mobile and tablet */}
      <div className="px-4 lg:hidden mt-2">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 border border-gray-300 rounded-xl"
        />
      </div>

      {/* Mobile and tablet Menu */}
      {showMenu && (
        <div className="absolute top-28 left-0 right-0 bg-white shadow-md px-4 pb-2 lg:hidden z-50">
          <ul>
            {categories.map((category) => (
              <li key={category.name} className="border-b hover:bg-gray-200 ">
                <div className="flex justify-between items-center p-2">
                  <Link
                    to={category.link}
                    className="text-gray-700 rounded flex-1"
                    onClick={() => setShowMenu(false)}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories.length > 0 && (
                    <button
                      onClick={() => toggleSubcategory(category.name)}
                      className="ml-2 text-gray-600"
                    >
                      {expandedSubcategories[category.name] ? (
                        <FaMinus />
                      ) : (
                        <FaPlus />
                      )}
                    </button>
                  )}
                </div>
                {expandedSubcategories[category.name] && (
                  <ul className="pl-4">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory}>
                        <Link
                          to={`/subcategory/${subcategory
                            .toLowerCase()
                            .replace(/ & /g, "-")
                            .replace(/\s+/g, "-")}`}
                          className="block p-1 text-gray-600 hover:bg-gray-200 rounded"
                          onClick={() => setShowMenu(false)}
                        >
                          {subcategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navbar for larger screens bg-[#ededed] */}
      <div className="hidden lg:block text-sm p-2">
        <ul className="flex space-x-6 justify-center">
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                to={category.link}
                className="flex font-medium items-center py-2 hover:text-gadBlue"
              >
                {category.name}
                {category.subcategories.length > 0 && (
                  <FaCaretDown className="ml-1" />
                )}
              </Link>
              {/* Subcategories dropdown for larger screens */}
              {hoveredCategory === category.name &&
                category.subcategories.length > 0 && (
                  <div className="absolute left-0 z-50 space-y-1 bg-white text-gray-600 rounded shadow-lg transition-all duration-200 ease-in-out">
                    <div className="space-y-1 py-2">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`/subcategory/${subcategory
                            .toLowerCase()
                            .replace(/ & /g, "-")
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-1 hover:text-gadBlue whitespace-nowrap"
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

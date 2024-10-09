import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaCaretDown,
} from "react-icons/fa";

const categories = [
  {
    name: "Mobile Accessories",
    link: "/mobile-accessories",
    subcategories: [
      "Camera Lens",
      "Charger & Cable",
      "Cables & Converters",
      "Charging Stations",
      "Fast Charger",
    ],
  },
  {
    name: "Covers & Cases",
    link: "/covers-and-cases",
    subcategories: [
      "Mobile Phone Cases",
      "Earphone Cases",
      "Tablet Cases",
      "iPad Cases & Covers",
      "Laptop Bags & Cases",
    ],
  },
  {
    name: "Earphones & Headphones",
    link: "/earphones-headphones",
    subcategories: [
      "Bluetooth Earphones & Headphones",
      "Earphone Accessories",
      "Headphone/Headset",
      "Earphones",
      "TWS Earbuds",
    ],
  },
  {
    name: "Speakers",
    link: "/speakers",
    subcategories: [
      "Bluetooth Speaker",
      "Speakers Accessories",
      "Wired Speaker",
      "Wireless Speaker",
      "Wireless Routers",
    ],
  },
  {
    name: "Smart Watches",
    link: "/smart-watches",
    subcategories: ["Smart Accessories", "Smart Wristbands", "Watch Straps"],
  },
  {
    name: "Lifestyle",
    link: "/lifestyle",
    subcategories: [
      "Eye Mask",
      "Hair Dryer",
      "Hair Straightener",
      "Electric Shavers",
      "Body Groomers",
      "Hair Trimmers",
      "Beard Trimmers",
    ],
  },
  {
    name: "Car Accessories",
    link: "/car-accessories",
    subcategories: ["Car Camera", "Car Charger", "Car Mounts"],
  },
  {
    name: "More",
    link: "/more",
    subcategories: [
      "Computer & Office",
      "Security & Protection",
      "Tablets & iPads",
      "Tools",
      "Watches",
      "Lights & Lighting",
      "Lifestyle",
      "Health & Beauty",
      "Camera & Photo",
      "Consumer Electronics",
      "Air Fresheners",
      "Fitness & Sports",
      "Others",
    ],
  },
];

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className="bg-black p-4 flex items-center justify-between px-4 sm:px-10">
        {/* Logo and Icons for Mobile View */}
        <div className="flex items-center justify-between w-full sm:hidden">
          <img src={logo} className="w-44" alt="Logo" />
          <div className="flex items-center space-x-4">
            <FaShoppingCart
              className="text-white cursor-pointer"
              title="Cart"
            />
            <FaBars
              onClick={toggleDrawer}
              className="text-white cursor-pointer"
              title="Menu"
            />
          </div>
        </div>

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
            <FaShoppingCart
              className="text-white cursor-pointer"
              title="Cart"
            />
            <FaBars className="text-white cursor-pointer" title="Menu" />
          </div>
        </div>
      </div>

      {/* Drawer for Mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-70">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <button onClick={toggleDrawer} className="text-black float-right">
              Close
            </button>
            <ul className="mt-4">
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="relative group"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={category.link}
                    className="flex font-medium items-center py-2 hover:text-gadBlue"
                    onClick={toggleDrawer}
                  >
                    {category.name}
                    {category.subcategories.length > 0 && (
                      <FaCaretDown className="ml-1" />
                    )}
                  </Link>
                  {/* Subcategories Dropdown */}
                  {hoveredCategory === category.name &&
                    category.subcategories.length > 0 && (
                      <div className="absolute left-0 z-50 mt-1 space-y-1 bg-white text-gray-600 rounded shadow-lg transition-all duration-200 ease-in-out">
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
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Horizontal Categories for Desktop */}
      <div className="bg-[#ededed] text-sm p-2 hidden sm:block">
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
              {/* Dropdown */}
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

export default Navbar;

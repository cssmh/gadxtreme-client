import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaCaretDown,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

const categories = [
  {
    name: "Mobile Accessories",
    link: "/mobile-accessories",
    subcategories: [
      "Camera Lens",
      "Charger & Cable",
      "Cables & Converters",
      "Fast Charger",
    ],
  },
  {
    name: "New Arrival",
    link: "/new-arrival",
    subcategories: [],
  },
  {
    name: "Earphones & Headphones",
    link: "/earphones-headphones",
    subcategories: ["Headphone/Headset", "Earphones", "TWS Earbuds"],
  },
  {
    name: "Earbuds",
    link: "/earbuds",
    subcategories: [],
  },
  {
    name: "Speakers",
    link: "/speakers",
    subcategories: ["Bluetooth Speaker", "Wired Speaker", "Wireless Speaker"],
  },
  {
    name: "Charging Accessories",
    link: "/charging-accessories",
    subcategories: [],
  },
  {
    name: "Smart Watches",
    link: "/smart-watches",
    subcategories: [],
  },
  {
    name: "Lifestyle",
    link: "/lifestyle",
    subcategories: ["Eye Mask", "Hair Dryer"],
  },
  {
    name: "More",
    link: "/more",
    subcategories: ["Tools", "Watches", "Lifestyle", "Others"],
  },
];

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openedCategory, setOpenedCategory] = useState(null); // For small devices

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const toggleCategory = (categoryName) => {
    if (openedCategory === categoryName) {
      setOpenedCategory(null);
    } else {
      setOpenedCategory(categoryName);
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <div className="bg-black p-4 flex items-center justify-between px-4 sm:px-10">
        {/* Mobile and small screens */}
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

        {/* Medium and larger screens */}
        <div className="hidden sm:flex items-center justify-between w-full">
          <div className="text-white text-2xl font-bold flex-shrink-0">
            <img src={logo} className="w-44" alt="Logo" />
          </div>
          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>
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

      {/* Drawer for small screens */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-70">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <button onClick={toggleDrawer} className="text-black float-right">
              Close
            </button>
            <ul className="mt-4">
              {categories.map((category) => (
                <li key={category.name} className="relative group">
                  <div
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => toggleCategory(category.name)}
                  >
                    <Link
                      to={category.link}
                      className="font-medium hover:text-gadBlue"
                      onClick={toggleDrawer}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories.length > 0 && (
                      <button className="ml-2 focus:outline-none">
                        {openedCategory === category.name ? (
                          <FaMinus />
                        ) : (
                          <FaPlus />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Subcategories dropdown for small devices */}
                  {openedCategory === category.name &&
                    category.subcategories.length > 0 && (
                      <div className="ml-4 space-y-1 bg-white text-gray-600 rounded shadow-lg">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/subcategory/${subcategory
                              .toLowerCase()
                              .replace(/ & /g, "-")
                              .replace(/\s+/g, "-")}`}
                            className="block px-4 py-1 hover:text-gadBlue"
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

      {/* Navbar for medium and larger screens */}
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

export default Navbar;

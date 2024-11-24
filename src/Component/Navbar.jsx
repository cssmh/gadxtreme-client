import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaCaretDown,
  FaPlus,
  FaMinus,
  FaTimesCircle,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { getSearchGadget } from "../Api/gadgets";
import useMyCart from "../hooks/useMyCart";
import { PiSignOutThin } from "react-icons/pi";

const categories = [
  {
    name: "Mobile Accessories",
    link: "/category/mobile accessories",
    subcategories: ["Charging Accessories", "Converters & Hub", "Powerbank"],
  },
  {
    name: "Fan",
    link: "/category/fan",
    subcategories: [],
  },
  {
    name: "Earphones & Headphones",
    link: "/category/earphones & headphones",
    subcategories: ["Wired Earphone", "Headphones", "Wireless Earphone"],
  },
  {
    name: "TWS Earbuds",
    link: "/category/earbuds",
    subcategories: [],
  },
  {
    name: "Speakers",
    link: "/category/bluetooth speaker",
    subcategories: [],
  },
  {
    name: "Best Seller",
    link: "/category/best seller",
    subcategories: [],
  },
  {
    name: "Smart Watches",
    link: "/category/smartwatch",
    subcategories: [],
  },
  {
    name: "Lifestyle",
    link: "/category/lifestyle",
    subcategories: [],
  },
  {
    name: "More",
    link: "/category/more",
    subcategories: ["Smart TV", "Laptops"],
  },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { myCartData } = useMyCart();
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openedCategory, setOpenedCategory] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearch = async (e) => {
    const search = e.target.value.trim();
    setSearchInput(e.target.value);
    if (search === "") {
      setSearchData([]);
      return;
    }
    const res = await getSearchGadget(search);
    setSearchData(res);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchData([]);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const toggleCategory = (categoryName) => {
    setOpenedCategory(openedCategory === categoryName ? null : categoryName);
  };

  const handleLogOut = () => {
    logOut().then().catch();
  };

  return (
    <div
      className={`sticky top-0 left-0 right-0 ${
        hoveredCategory ? "z-50" : "z-40"
      }`}
    >
      <div className="bg-black p-[14px] flex items-center justify-between px-4 sm:px-10">
        <div className="flex items-center justify-between w-full lg:hidden">
          <img src={logo} className="w-44" alt="Logo" />
          <div className="flex items-center space-x-3">
            <Link to={"/cart"}>
              <FaShoppingCart
                className="text-white cursor-pointer text-xl"
                title="Cart"
              />
            </Link>
            <FaBars
              onClick={toggleDrawer}
              className="text-white cursor-pointer text-xl"
              title="Menu"
            />
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-between w-full">
          <div className="flex items-center text-white text-2xl font-bold flex-shrink-0">
            <Link to="/">
              <img src={logo} className="w-48" alt="Logo" />
            </Link>
          </div>
          <div className="flex-grow mx-4 relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearch}
              placeholder="Search for products..."
              className="w-full p-2 rounded border border-gray-300 outline-none"
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <FaTimesCircle />
              </button>
            )}
            {searchData && searchData.length > 0 && (
              <div className="absolute grid grid-cols-2 gap-2 left-0 z-50 bg-white border border-gray-300 rounded shadow-lg mt-1 w-full">
                {searchData.map((gadget) => (
                  <Link
                    key={gadget._id}
                    to={`/details/${gadget._id}`}
                    className="flex items-center p-2 hover:bg-gray-100 border-b"
                  >
                    <img
                      src={gadget.images[0]}
                      alt={gadget.name}
                      className="w-12 h-12 object-cover mr-2"
                    />
                    <span className="font-medium">{gadget.productName}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <FaUser
              className="text-white cursor-pointer text-xl"
              title="Login/Register"
            />
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <p className="text-white font-semibold cursor-pointer">
                  Hi, {user?.displayName || "Anonymous"}
                </p>
                {showUserDropdown && (
                  <div className="absolute right-0 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-50">
                    <Link
                      to="/my-account/dashboard"
                      className="block px-4 py-1 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-account/profile"
                      className="block px-4 py-1 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/my-account/orders"
                      className="block px-4 py-1 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="px-4 py-1 hover:bg-gray-100 w-full text-left flex items-center space-x-1"
                    >
                      <span>Logout</span>
                      <PiSignOutThin className="text-fuchsia-600" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-white font-semibold">
                Login/Register
              </Link>
            )}
            <Link to={"/my-account/profile"}>
              <FaHeart
                className="text-white cursor-pointer text-xl"
                title="Profile"
              />
            </Link>
            <Link to={"/cart"}>
              <p className="flex items-center gap-1 relative">
                <FaShoppingCart
                  className="text-white cursor-pointer text-xl"
                  title="Cart"
                />
                <span className="absolute -top-[8px] -right-2 bg-gadDarkBlue text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {myCartData?.length || 0}
                </span>
              </p>
            </Link>
            <FaBars
              className="text-white cursor-pointer text-xl"
              title="Menu"
            />
          </div>
        </div>
      </div>
      <div className="block lg:hidden px-1 relative">
        <input
          type="text"
          onChange={handleSearch}
          value={searchInput}
          placeholder="Search for products..."
          className="w-full py-2 px-3 rounded-xl mt-1 border border-gray-300 outline-none"
        />
        {searchInput && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-400"
          >
            <FaTimesCircle />
          </button>
        )}
        {searchData && searchData.length > 0 && (
          <div className="absolute left-0 z-50 bg-white border border-gray-300 rounded shadow-lg mt-1 w-full">
            {searchData.map((gadget) => (
              <Link
                key={gadget._id}
                to={`/details/${gadget._id}`}
                className="flex items-center p-2 hover:bg-gray-100 border-b"
              >
                <img
                  src={gadget.images[0]}
                  alt={gadget.name}
                  className="w-12 h-12 object-cover mr-2"
                />
                <span className="font-medium">{gadget.productName}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-70">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <button onClick={toggleDrawer} className="text-black float-right">
              Close
            </button>
            <ul className="mt-4">
              {user ? (
                <p className="font-medium my-1">
                  <Link
                    onClick={() => setDrawerOpen(!isDrawerOpen)}
                    to="my-account/dashboard"
                  >
                    Dashboard
                  </Link>
                </p>
              ) : (
                <p className="my-1">
                  <Link to="/login" className="font-medium">
                    Login/Register
                  </Link>
                </p>
              )}
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
                  {openedCategory === category.name &&
                    category.subcategories.length > 0 && (
                      <div className="ml-4 space-y-1 bg-white text-gray-600 rounded shadow-lg">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/category/${subcategory}`.toLowerCase()}
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
      <div className="bg-[#ededed] text-sm p-2 hidden lg:block">
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
              {hoveredCategory === category.name &&
                category.subcategories.length > 0 && (
                  <div className="absolute left-0 z-50 space-y-1 bg-white text-gray-600 rounded shadow-lg transition-all duration-200 ease-in-out">
                    <div className="space-y-1 py-2">
                      {category.subcategories.map((subcategory, idx) => (
                        <Link
                          key={idx}
                          to={`/category/${subcategory}`.toLowerCase()}
                          className="block px-4 py-1 hover:text-gadBlue"
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

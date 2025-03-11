import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaCaretDown,
  FaPlus,
  FaMinus,
  FaTimesCircle,
  FaRegHeart,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { getSearchGadget } from "../Api/gadgets";
import { BsCart2 } from "react-icons/bs";
import useMyCart from "../hooks/useMyCart";
import { PiSignOutThin } from "react-icons/pi";
import { assets } from "../assets/assets";

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
    subcategories: ["Smart TV", "Laptop"],
  },
];

const NavNew = () => {
  const { myCartData } = useMyCart();
  const { user, logOut } = useAuth();
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

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
    <div className="sticky top-0 left-0 right-0 z-50 bg-white md:mx-5">
      <div className="px-4 pt-3 md:pt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={assets.logo} className="w-40" alt="Logo" />
          </Link>
        </div>
        <div className="flex-grow mx-6 hidden lg:flex relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search for products..."
            className="w-full px-2 2xl:p-3 py-[6px] border border-gray-300 rounded-lg outline-none"
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
            <div className="absolute grid grid-cols-2 gap-2 left-0 z-50 bg-white border border-gray-300 rounded shadow-lg mt-11 w-full">
              {searchData.map((gadget) => (
                <Link
                  key={gadget._id}
                  onClick={() => {
                    setSearchInput("");
                    setSearchData([]);
                  }}
                  to={`/details/${gadget?.productName
                    .toLowerCase()
                    .replaceAll(/\s+/g, "_")}/${gadget._id}`}
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
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <Link
                to="/dashboard"
                className="hidden 2xl:text-lg lg:block text-gray-500 md:py-2 font-medium cursor-pointer"
              >
                Hi, {user?.displayName || "Anonymous"}
              </Link>
              {showUserDropdown && (
                <div className="absolute -right-3 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/dashboard/orders"
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
            <Link
              to="/login"
              className="hidden lg:block text-sm md:text-base 2xl:text-lg text-gray-500 font-medium"
            >
              Login/Register
            </Link>
          )}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to={"/dashboard/wishlist"} className="relative">
              <FaRegHeart
                className="text-gray-600 cursor-pointer text-xl"
                title="Wishlist"
              />
              <span className="absolute -top-2 -right-2 bg-gadDarkBlue text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to={"/cart"}>
              <p className="flex items-center gap-1 relative">
                <BsCart2
                  className="text-gray-600 cursor-pointer text-2xl mr-1"
                  title="Cart"
                />
                <span className="absolute -top-[6px] right-12 bg-gadDarkBlue text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {myCartData?.length || 0}
                </span>
                <span>৳0.00</span>
              </p>
            </Link>
          </div>
        </div>
        <div className="lg:hidden flex items-center space-x-[6px]">
          {user && (
            <>
              <p className="hidden md:block text-gray-500 font-medium cursor-pointer">
                Hi, {user?.displayName || "Anonymous"}
              </p>
              <Link to={"/dashboard/wishlist"} className="relative">
                <FaRegHeart
                  className="text-gray-600 cursor-pointer text-xl"
                  title="Wishlist"
                />
                <span className="absolute -top-2 -right-1 bg-gadDarkBlue text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link to={"/cart"}>
                <p className="flex items-center gap-1 relative">
                  <BsCart2
                    className="text-gray-600 cursor-pointer text-2xl mr-1"
                    title="Cart"
                  />
                  <span className="absolute -top-[6px] right-12 bg-gadDarkBlue text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {myCartData?.length || 0}
                  </span>
                  <span>৳0.00</span>
                </p>
              </Link>
            </>
          )}
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <FaTimes className="text-gray-600 text-2xl" />
            ) : (
              <FaBars className="text-gray-600 text-2xl" />
            )}
          </button>
        </div>
      </div>
      <div className="px-4 lg:hidden mt-4 relative">
        <input
          type="text"
          value={searchInput}
          placeholder="Search for products..."
          onChange={handleSearch}
          className="w-full px-2 py-[6px] border border-gray-300 rounded-lg outline-none"
        />
        {searchInput && (
          <button
            onClick={clearSearch}
            className="absolute right-6 top-[21px] transform -translate-y-1/2 text-gray-400"
          >
            <FaTimesCircle />
          </button>
        )}
        {searchData && searchData.length > 0 && (
          <div className="absolute left-0 z-50 bg-white border border-gray-300 rounded shadow-lg mt-1 w-full">
            {searchData.map((gadget) => (
              <Link
                key={gadget._id}
                onClick={() => {
                  setSearchInput("");
                  setSearchData([]);
                }}
                to={`/details/${gadget?.productName
                  .toLowerCase()
                  .replaceAll(/\s+/g, "_")}/${gadget._id}`}
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
      {showMenu && (
        <div className="absolute top-[101px] left-0 right-0 bg-white shadow-md px-4 pb-2 lg:hidden z-50">
          <ul>
            {user ? (
              <Link onClick={() => setShowMenu(!showMenu)} to="/dashboard">
                <p className="text-gray-700 p-2 border-b">Dashboard</p>
              </Link>
            ) : (
              <Link to="/login">
                <p className="text-gray-700 p-2 border-b">Login/Register</p>
              </Link>
            )}
            {categories?.map((category) => (
              <li key={category.name} className="border-b hover:bg-gray-200">
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
                          to={`/category/${subcategory}`.toLowerCase()}
                          className="block py-1 text-gray-600 hover:bg-base-200 rounded"
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
      <div className="hidden lg:block text-sm p-1">
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
                className="flex font-medium text-[13px] 2xl:text-lg items-center py-2 hover:text-gadBlue"
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
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`/category/${subcategory}`.toLowerCase()}
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

import logo from "../assets/gada.png";
import { FaUser, FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-black p-4 flex items-center justify-between px-10">
      <div className="text-white text-2xl font-bold">
        <img src={logo} className="w-44" alt="" />
      </div>
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>
      <div className="flex items-center space-x-4">
        <FaUser className="text-white cursor-pointer" title="Login/Register" />
        <FaHeart className="text-white cursor-pointer" title="Wishlist" />
        <FaShoppingCart className="text-white cursor-pointer" title="Cart" />
        <FaBars className="text-white cursor-pointer" title="Menu" />
      </div>
    </div>
  );
};

export default TopBar;

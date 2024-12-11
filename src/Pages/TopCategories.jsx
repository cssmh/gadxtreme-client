import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const categories = [
  { name: "Earbuds", image: assets.earbuds, link: "/category/earbuds" },
  {
    name: "Smartwatch",
    image: assets.smartwatch,
    link: "/category/smartwatch",
  },
  { name: "Fan", image: assets.fan, link: "/category/fan" },
  {
    name: "Headphones",
    image: assets.headphones,
    link: "/category/headphones",
  },
  {
    name: "Bluetooth Speaker",
    image: assets.speakers,
    link: "/category/bluetooth speaker",
  },
  {
    name: "Wireless Earphone",
    image: assets.blueEarphone,
    link: "/category/wireless earphone",
  },
];

const TopCategories = () => {
  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto py-2 md:py-5 px-3 lg:px-0">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 md:mb-6">
        Top Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className="group relative block bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="mt-2 text-center">
              <h3 className="group-hover:text-gadBlue">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;

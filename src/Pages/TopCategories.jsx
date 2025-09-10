import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <div className="container 2xl:max-w-[1370px] mx-auto py-2 md:py-5 px-3 lg:px-0">
      <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-center mb-4 md:mb-6">
        Top Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            data-aos="fade-up"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to={category.link}
              className="group relative block bg-white p-2 rounded-lg shadow-lg"
            >
              <img
                src={category.image}
                alt={`Category ${category.name}`}
                className="w-full h-40 2xl:h-48 object-cover rounded-md transition-transform duration-300"
              />
              <div className="mt-2 text-center">
                <h3 className="group-hover:text-gadBlue 2xl:text-xl">
                  {category.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;

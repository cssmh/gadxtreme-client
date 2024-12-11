import { Link } from "react-router-dom";
import cate1 from "../assets/gadgets/earbuds.png";
import cate2 from "../assets/gadgets/smartwatch.jpg";
import cate4 from "../assets/gadgets/fan.png";
import cate5 from "../assets/gadgets/headphones.jpeg";
import cate6 from "../assets/gadgets/speakers.png";
import cate7 from "../assets/gadgets/blueEarphone.jpeg";

const categories = [
  { name: "Earbuds", image: cate1, link: "/category/earbuds" },
  { name: "Smartwatch", image: cate2, link: "/category/smartwatch" },
  { name: "Fan", image: cate4, link: "/category/fan" },
  { name: "Headphones", image: cate5, link: "/category/headphones" },
  {
    name: "Bluetooth Speaker",
    image: cate6,
    link: "/category/bluetooth speaker",
  },
  {
    name: "Wireless Earphone",
    image: cate7,
    link: "/category/wireless earphone",
  },
];

const TopCategories = () => {
  return (
    <div className="container mx-auto py-2 md:py-5 px-4">
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

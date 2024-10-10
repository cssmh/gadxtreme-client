import { Link } from "react-router-dom";
import cate1 from "../assets/gadgets/earbuds.png";
import cate2 from "../assets/gadgets/smartwatch.jpg";
import cate3 from "../assets/gadgets/powerbanks.png";
import cate4 from "../assets/gadgets/fan.png";
import cate5 from "../assets/gadgets/headphones.jpeg";
import cate6 from "../assets/gadgets/speakers.png";
import cate7 from "../assets/gadgets/bluetooth_earphone.jpeg";
import cate8 from "../assets/gadgets/charging_accessories.png";
import cate9 from "../assets/gadgets/converters_hub.png";
import cate10 from "../assets/gadgets/laptop.avif";
import cate11 from "../assets/gadgets/smart_tv.webp";
import cate12 from "../assets/gadgets/all-cate.jpeg";

const categories = [
  { name: "Earbuds", image: cate1, link: "/earbuds" },
  { name: "Smartwatch", image: cate2, link: "/smartwatch" },
  { name: "Powerbank", image: cate3, link: "/smartwatch" },
  { name: "Fan", image: cate4, link: "/smartwatch" },
  { name: "Headphones", image: cate5, link: "/smartwatch" },
  { name: "Bluetooth Speaker", image: cate6, link: "/smartwatch" },
  { name: "Bluetooth Earphone", image: cate7, link: "/smartwatch" },
  { name: "Charging Accessories", image: cate8, link: "/smartwatch" },
  { name: "Converters & Hub", image: cate9, link: "/smartwatch" },
  { name: "Laptop", image: cate10, link: "/smartwatch" },
  { name: "Smart Tv", image: cate11, link: "/smartwatch" },
  { name: "All Smart & More Categories", image: cate12, link: "/smartwatch" },
];

const TopCategories = () => {
  return (
    <div className="container mx-auto py-2 md:py-5 px-4">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 md:mb-6">
        Top Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
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
              <h3 className="group-hover:text-gadBlue">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;

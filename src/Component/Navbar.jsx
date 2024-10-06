import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

const categories = [
  {
    name: "Mobile Accessories",
    link: "/mobile-accessories", // Add the links for routing
    subcategories: [
      "Camera Lens",
      "Charger & Cable",
      "Cables & Converters",
      "Charging Stations",
      "Fast Charger",
      //   "Audio & Video Cables",
      //   "Mobile Flashes & Selfie Lights",
      //   "Holders",
      //   "Memory Card",
      //   "Bike Mount",
      //   "Mobile Phone Holders & Stands",
      //   "Tripod & Accessories",
      //   "USB Charging Station",
      //   "Screwdrivers",
      //   "Wireless Chargers",
      //   "Power Bank",
      //   "Screen Protector",
      //   "Selfie Stick",
    ],
  },
  {
    name: "Covers & Cases",
    link: "/covers-and-cases", // Add the links for routing
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
    link: "/smart-watches", // Add the links for routing
    subcategories: ["Smart Accessories", "Smart Wristbands", "Watch Straps"],
  },
  {
    name: "Lifestyle",
    link: "/lifestyle", // Add the links for routing
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
    link: "/car-accessories", // Add the links for routing
    subcategories: ["Car Camera", "Car Charger", "Car Mounts"],
  },
  {
    name: "More",
    link: "/more", // Add the links for routing
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
  return (
    <div className="bg-[#ededed] text-sm p-2">
      <ul className="flex space-x-6 justify-center">
        {categories.map((category, index) => (
          <li key={index} className="relative group">
            <Link to={category.link} className="flex font-medium items-center py-2 hover:text-gadBlue">
              {category.name}
              {category.subcategories.length > 0 && (
                <FaCaretDown className="ml-1" />
              )}
            </Link>
            {/* Dropdown */}
            {category.subcategories.length > 0 && (
              <div className="absolute left-0 mt-[1px] hidden group-hover:block bg-white text-black rounded shadow-lg">
                {category.subcategories.map((subcategory, subIndex) => (
                  <Link
                    key={subIndex}
                    to={`/subcategory/${subcategory
                      .toLowerCase()
                      .replace(/ & /g, "-")
                      .replace(/\s+/g, "-")}`} // Generate dynamic subcategory links
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
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import product1 from "../assets/earbuds.jpg";
import product2 from "../assets/buds.webp";
import product3 from "../assets/earbuds.jpg";
import product4 from "../assets/buds.webp";

const featuredProducts = [
  { name: "Smartphone", price: "$299", image: product1, link: "/product/1" },
  {
    name: "Bluetooth Speaker",
    price: "$99",
    image: product2,
    link: "/product/2",
  },
  { name: "Smartwatch", price: "$199", image: product3, link: "/product/3" },
  {
    name: "Wireless Earbuds",
    price: "$79",
    image: product4,
    link: "/product/4",
  },
  { name: "Smartphone", price: "$299", image: product1, link: "/product/1" },
  {
    name: "Bluetooth Speaker",
    price: "$99",
    image: product2,
    link: "/product/2",
  },
  { name: "Smartwatch", price: "$199", image: product3, link: "/product/3" },
  {
    name: "Wireless Earbuds",
    price: "$79",
    image: product4,
    link: "/product/4",
  },
];

const FeaturedProducts = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {featuredProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-lg font-semibold text-green-600">
              {product.price}
            </p>
            <Link
              to={product.link}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

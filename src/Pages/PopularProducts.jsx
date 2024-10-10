import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const PopularProducts = () => {
  const placeholderProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      type: "Airbus",
      image: "https://i.ibb.co/RTs9FXm/buds-t100-01-500x500.webp",
      inStock: true,
      price: "৳49.99",
    },
    {
      id: 2,
      name: "Earbuds",
      type: "Smartphone",
      image: "https://i.ibb.co/z28ZZf0/2878-41130.jpg",
      inStock: false,
      price: "৳699.99",
    },
    {
      id: 3,
      name: "Asus Vivobook A125",
      type: "Laptop",
      image:
        "https://i.ibb.co/4FHQWpk/macbook-air-m1-chip-silver-3-500x500.jpg",
      inStock: true,
      price: "৳90000",
    },
    {
      id: 1,
      name: "Wireless Earbuds",
      type: "Airbus",
      image: "https://i.ibb.co/LCvPxk7/r2350-a-Iot-1-500x500-1.jpg",
      inStock: true,
      price: "৳1200",
    },
    {
      id: 2,
      name: "Smartphone",
      type: "Smartphone",
      image: "https://i.ibb.co/RTs9FXm/buds-t100-01-500x500.webp",
      inStock: false,
      price: "৳699.99",
    },
    {
      id: 3,
      name: "Portable Speaker",
      type: "Speaker",
      image: "https://i.ibb.co/LCvPxk7/r2350-a-Iot-1-500x500-1.jpg",
      inStock: true,
      price: "৳29.99",
    },
  ];

  return (
    <div className="max-w-[1250px] mx-1 my-2 md:mx-auto">
      <h1 className="text-center font-bold text-xl text-emerald-600 md:text-2xl pb-3 max-w-md mx-auto">
        Customers Favorites
        <br />
        <span className="text-red-500 font-normal text-lg">
          Popular Products
        </span>
      </h1>
      <Swiper
        speed={500}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1000: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 20 },
          1400: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {placeholderProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-500">{product.type}</p>
              <p className="text-green-600">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-lg font-semibold mt-2">{product.price}</p>
              <Link to={`/product-details/${product.id}`}>
                <button className="text-white bg-emerald-800 hover:bg-blue-700 transition duration-300 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
                  View Details
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularProducts;

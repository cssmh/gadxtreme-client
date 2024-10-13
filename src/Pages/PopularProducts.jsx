import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllGadget } from "../Api/gadgets";

const PopularProducts = () => {
  const { data = [] } = useQuery({
    queryKey: ["allGadgets"],
    queryFn: async () => await getAllGadget(),
  });

  // Function to calculate the discount percentage
  const calculateDiscount = (price, discountPrice) => {
    const discount = ((price - discountPrice) / price) * 100;
    return Math.round(discount);
  };

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
        data-aos="fade-up"
        data-aos-delay="600"
        speed={1000}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          // pauseOnMouseEnter: false,
          // waitForTransition: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          1000: { slidesPerView: 3, spaceBetween: 10 },
          1200: { slidesPerView: 5, spaceBetween: 10 },
          1400: { slidesPerView: 6, spaceBetween: 10 },
        }}
      >
        {data?.slice(0, 7).map((product) => (
          <SwiperSlide key={product._id}>
            <Link to={`/details/${product._id}`}>
              <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300 ease-in-out relative">
                {/* Discount Badge */}
                {product.discountPrice && product.price && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                    -{calculateDiscount(product.price, product.discountPrice)}%
                  </div>
                )}
                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="w-full md:h-52 object-cover rounded-md"
                />
                <h3 className="text-sm mt-3">{product.productName}</h3>
                <p className="text-green-600">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
                <div className="text-sm mt-2">
                  <span className="line-through text-gray-500">
                    ৳{product.discountPrice}
                  </span>
                  <span className="ml-2 text-blue-700 font-medium">
                    ৳{product.price}
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularProducts;

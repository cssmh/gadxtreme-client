import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPopularGadget } from "../Api/gadgets";

const PopularProducts = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["popularGadgets"],
    queryFn: async () => await getPopularGadget(10, 10),
  });

  const calculateDiscount = (price, discountPrice) => {
    const discount = ((price - discountPrice) / price) * 100;
    return Math.round(discount);
  };

  const getSkeletonCount = () => {
    if (window.innerWidth < 700) return 2;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) return 3;
    return 6;
  };

  const skeletonCount = getSkeletonCount();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-1 my-2 md:mx-auto px-3 lg:px-0">
      <h1 className="text-center font-bold text-emerald-600 text-xl md:text-2xl pb-3 max-w-md mx-auto">
        Customers Favorites
        <br />
        <span className="text-red-500 font-normal text-lg">
          Popular Products
        </span>
      </h1>
      {isLoading ? (
        <div className="flex space-x-4">
          {[...Array(skeletonCount)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md animate-pulse w-full"
            >
              <div className="skeleton h-40 w-full bg-gray-300 rounded-t-lg"></div>
              <div className="p-3 space-y-3">
                <div className="skeleton h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="skeleton h-4 bg-gray-200 rounded w-full"></div>
                <div className="skeleton h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          speed={900}
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
          {data?.map((product) => (
            <SwiperSlide key={product._id}>
              <Link to={`/details/${product._id}`}>
                <div className="p-4 bg-white shadow-lg rounded-lg transition duration-300 ease-in-out relative group">
                  {product.discountPrice && product.price && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs z-10">
                      -{calculateDiscount(product.price, product.discountPrice)}
                      %
                    </div>
                  )}
                  <div className="relative overflow-hidden">
                    <img
                      src={product?.images[0]}
                      alt={product.productName}
                      className="w-1/2 mx-auto md:w-full md:h-52 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                    />
                    <img
                      src={product?.images[1]}
                      alt={product.productName}
                      className="absolute inset-0 w-1/2 mx-auto md:w-full md:h-52 object-cover rounded-md transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="text-sm mt-3">{product.productName}</h3>
                  <p className="text-green-600">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="text-sm mt-2">
                    {product.discountPrice ? (
                      <>
                        <span className="line-through text-gray-500">
                          ৳{formatPrice(product.price)}
                        </span>
                        <span className="ml-2 text-blue-700 font-medium">
                          ৳{formatPrice(product.discountPrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-blue-700 font-medium">
                        ৳{product.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default PopularProducts;

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
    queryFn: () => getPopularGadget(13, 10),
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
    <div className="max-w-7xl 2xl:max-w-[90%] mx-1 my-2 md:mx-auto px-3 lg:px-0 mt-8">
      <h1 className="text-center font-bold text-emerald-600 text-xl md:text-2xl 2xl:text-3xl pb-3 max-w-md mx-auto">
        Customers Favorites
        <br />
        <span className="text-red-500 font-normal text-lg 2xl:text-xl">
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
              <div className="skeleton rounded-sm h-40 w-full bg-gray-300 rounded-t-lg"></div>
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
          speed={800}
          grabCursor={true}
          autoplay={{
            delay: 1100,
            disableOnInteraction: false,
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
              <Link
                to={`/details/${product?.productName
                  .toLowerCase()
                  .replaceAll(/\s+/g, "_")}/${product._id}`}
              >
                <div className="p-2 bg-white shadow-lg rounded-md transition duration-300 ease-in-out relative group">
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
                      className="w-full h-64 md:h-40 2xl:h-48 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                    />
                    {!product.inStock && (
                      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold z-20">
                        Out of Stock
                      </div>
                    )}
                    {product?.images[1] && (
                      <img
                        src={product.images[1]}
                        className="absolute inset-0 w-1/2 mx-auto md:w-full md:h-52 object-cover rounded-md transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10"
                      />
                    )}
                  </div>
                  <h3 className="text-sm 2xl:text-lg mt-3">
                    {product.productName}
                  </h3>
                  <p
                    className={`text-sm 2xl:text-base mt-2 ${
                      !product.inStock ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="text-sm 2xl:text-base mt-2">
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

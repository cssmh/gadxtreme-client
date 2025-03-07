import { getBestSeller } from "../Api/gadgets";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import useFetchData from "../hooks/useFetchData";
import SkeletonHome from "./SkeletonHome";

const BestSeller = () => {
  const { data, isLoading } = useFetchData(["bestSeller"], getBestSeller);

  const getSkeletonCount = () => {
    if (window.innerWidth < 700) return 1;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) return 2;
    return 3;
  };

  const skeletonCount = getSkeletonCount();

  if (isLoading)
    return (
      <div className="max-w-7xl 2xl:max-w-[90%] lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 mb-2 gap-5 mx-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonHome key={index} height={240} />
        ))}
      </div>
    );

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto p-1 md:p-3 flex flex-col lg:flex-row gap-1 md:gap-3 my-5">
      <div className="w-full lg:w-[35%] p-3 lg:px-6 rounded-lg space-y-3 md:space-y-5">
        <h2 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-center text-[#00a9e1]">
          Best Seller
        </h2>
        <p className="text-sm md:text-base 2xl:text-xl text-gray-800">
          Discover our top-selling gadgets that are making waves! These products
          are highly recommended by our customers. Explore the best of the best!
        </p>
        <img
          src={assets.Earbuds100}
          alt="Best Seller"
          className="w-full h-60 md:h-auto rounded-lg"
        />
      </div>
      <div className="w-full lg:w-[65%] grid gap-6 grid-cols-1 md:grid-cols-2 p-3 md:p-5">
        {data?.slice(0, 4).map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg transition-shadow duration-300"
          >
            <Link
              to={`/details/${product?.productName
                .toLowerCase()
                .replaceAll(/\s+/g, "_")}/${product._id}`}
            >
              <div className="relative h-56 2xl:h-64 w-full">
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="h-full w-full object-cover rounded-t-lg"
                />
                {!product.inStock && (
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg 2xl:text-2xl font-semibold text-gray-800">
                  {product.productName}
                </h3>
                <p className="text-gray-600 text-sm 2xl:text-base">
                  {product.category}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-gray-600 ${
                      product.discountPrice
                        ? "line-through"
                        : "text-green-600 font-semibold"
                    }  text-lg 2xl:text-xl`}
                  >
                    ৳{product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-green-600 font-semibold text-lg 2xl:text-xl">
                      ৳{product.discountPrice}
                    </span>
                  )}
                </div>
                <ul className="mt-2 text-sm 2xl:text-base text-gray-600 space-y-1">
                  {product.keyFeatures.map((feature, index) => (
                    <li key={index}>&bull; {feature}</li>
                  ))}
                </ul>
                {product.inStock ? (
                  <span className="mt-3 inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="mt-3 inline-block px-3 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

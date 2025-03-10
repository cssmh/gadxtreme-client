import { getBestSeller } from "../Api/gadgets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
      <div className="max-w-7xl 2xl:max-w-[90%] lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonHome key={index} height={240} />
        ))}
      </div>
    );

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] lg:mx-auto p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-center text-[#00a9e1] mb-6"
      >
        Best Sellers
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-gray-700 text-center max-w-xl mx-auto mb-8"
      >
        Discover our top-selling gadgets that are highly recommended by our
        customers. Experience the best of innovation!
      </motion.p>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.slice(0, 3).map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform"
          >
            <Link
              to={`/details/${product.productName
                .toLowerCase()
                .replaceAll(/\s+/g, "_")}/${product._id}`}
            >
              <div className="relative h-56">
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="h-full w-full object-cover rounded-t-lg"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.productName}
                </h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-lg font-semibold ${
                      product.discountPrice
                        ? "line-through text-gray-500"
                        : "text-green-600"
                    }`}
                  >
                    ৳{product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-lg text-green-600 font-semibold">
                      ৳{product.discountPrice}
                    </span>
                  )}
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {product.keyFeatures.map((feature, i) => (
                    <li key={i}>&bull; {feature}</li>
                  ))}
                </ul>
                <span
                  className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    product.inStock
                      ? "text-green-800 bg-green-200"
                      : "text-red-800 bg-red-200"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

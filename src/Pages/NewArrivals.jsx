import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getNewArrival } from "../Api/gadgets";
import useFetchData from "../hooks/useFetchData";
import SkeletonHome from "./SkeletonHome";

const NewArrivals = () => {
  const { data, isLoading } = useFetchData(["newArrival"], getNewArrival);

  const getSkeletonCount = () => {
    if (window.innerWidth < 700) return 2;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) return 3;
    return 6;
  };

  const skeletonCount = getSkeletonCount();

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading)
    return (
      <div className="max-w-7xl 2xl:max-w-[90%] lg:mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-10 mb-2 gap-5 mx-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonHome key={index} height={160} />
        ))}
      </div>
    );

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-3 lg:px-0 py-3 md:py-4">
      <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold mb-6 text-center">
        <span className="text-[#00a9e1]">New</span> Arrivals
      </h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Animate only once
      >
        {data?.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }} // Hover animation
            transition={{ type: "spring", stiffness: 300 }} // Smooth spring animation
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link
                to={`/details/${product?.productName
                  .toLowerCase()
                  .replaceAll(/\s+/g, "_")}/${product._id}`}
              >
                <div className="relative h-36 2xl:h-48 w-full">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="h-full w-full object-cover rounded-t-md"
                    aria-label={product.productName}
                  />
                  {!product.inStock && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm 2xl:text-lg font-medium text-gray-800 line-clamp-2">
                    {product.productName}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 line-through text-xs 2xl:text-sm">
                      ৳{new Intl.NumberFormat("en-IN").format(product.price)}
                    </span>
                    <span className="text-green-600 font-semibold text-sm 2xl:text-base">
                      ৳
                      {new Intl.NumberFormat("en-IN").format(
                        product.discountPrice
                      )}
                    </span>
                  </div>
                  {product.inStock ? (
                    <span className="mt-2 inline-block px-2 py-1 text-xs 2xl:text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="mt-2 inline-block px-2 py-1 text-xs 2xl:text-sm font-semibold text-red-800 bg-red-200 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NewArrivals;

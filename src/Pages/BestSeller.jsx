import { useQuery } from "@tanstack/react-query";
import { getBestSeller } from "../Api/gadgets";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const BestSeller = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["bestSeller"],
    queryFn: async () => await getBestSeller(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto p-3 bg-gray-50 flex flex-col lg:flex-row gap-6 my-5">
      <div className="lg:w-[35%] p-3 lg:px-6 rounded-lg shadow-md min-h-[calc(2*16rem)]">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-[#00a9e1]">
          Best Seller
        </h2>
        <p className="text-sm md:text-base text-gray-800 mb-4">
          Discover our top-selling gadgets that are making waves! These products
          are highly recommended by our customers. Explore the best of the best!
        </p>
        <img
          src={assets.Earbuds100}
          alt="Best Seller"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="lg:w-[65%] grid gap-6 grid-cols-1 md:grid-cols-2">
        {data?.slice(0, 6).map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg transition-shadow duration-300"
          >
            <Link to={`/details/${product._id}`}>
              <div className="relative h-56 w-full">
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
                <h3 className="text-lg font-medium text-gray-800 line-clamp-2">
                  {product.productName}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 line-through text-sm">
                    ৳{product.price}
                  </span>
                  <span className="text-green-600 font-semibold text-lg">
                    ৳{product.discountPrice}
                  </span>
                </div>
                {product.inStock ? (
                  <span className="mt-3 inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="mt-3 inline-block px-3 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                    Out of Stock
                  </span>
                )}
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Key Features:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    {product.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

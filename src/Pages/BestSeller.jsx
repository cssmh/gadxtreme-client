import { useQuery } from "@tanstack/react-query";
import { getBestSeller } from "../Api/gadgets";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["bestSeller"],
    queryFn: async () => await getBestSeller(),
  });

  if (isLoading) return;

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Best Seller
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link to={`/details/${product._id}`}>
              <div className="relative h-60 w-full">
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

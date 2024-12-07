import { useQuery } from "@tanstack/react-query";
import { getNewArrival } from "../Api/gadgets";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["newArrival"],
    queryFn: async () => await getNewArrival(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <span className="text-[#00a9e1]">New</span> Arrivals
      </h2>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/details/${product._id}`}>
              <div className="h-36 w-full flex items-center justify-center ">
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="h-full w-auto rounded-md object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {product.productName}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 line-through text-xs">
                    ৳{product.price}
                  </span>
                  <span className="text-green-600 font-bold text-sm">
                    ৳{product.discountPrice}
                  </span>
                </div>
                {product.inStock ? (
                  <span className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
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

export default NewArrivals;

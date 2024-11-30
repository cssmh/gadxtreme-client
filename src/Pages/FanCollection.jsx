// card design is good show some same category product in home
const FanCollection = () => {
    return (
      <div className="p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          New Arrivals
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.images[0]}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.productName}
                </h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 line-through text-sm">
                    ৳{product.price}
                  </span>
                  <span className="text-green-600 font-bold text-lg">
                    ৳{product.discountPrice}
                  </span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
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
            </div>
          ))}
        </div>
      </div>
    );
};

export default FanCollection;
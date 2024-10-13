import { useState } from "react";
import pay from "../assets/pay.png";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const [totalCart, setTotalCart] = useState(1);
  const gadgetData = useLoaderData(); // Assuming you're using loader data
  const {
    productName,
    price,
    discountPrice,
    description,
    images,
    inStock,
    keyFeatures,
  } = gadgetData;
  const [mainImage, setMainImage] = useState(images[0]);
  console.log(totalCart);

  return (
    <div className="container mx-auto p-4 my-6">
      {/* Main Section: Product Image and Details */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-6">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
          <div className="flex mt-2 space-x-2">
            {/* Thumbnails for product images */}
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Product thumbnail ${idx + 1}`}
                className="w-20 h-20 cursor-pointer rounded-md border-2 hover:border-gadBlue"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-xl md:text-3xl font-medium">{productName}</h1>
          <p
            className={`mt-2 ${
              inStock ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
          {discountPrice ? (
            <div className="text-xl mt-2">
              <span className="line-through text-gray-500">৳{price}</span>
              <span className="ml-2 text-[#2e6bc6] font-semibold">
                ৳{discountPrice}
              </span>
            </div>
          ) : (
            <span className="line-through text-gray-500">৳{price}</span>
          )}
          <div className="flex items-center space-x-2">
            <div className="flex items-center mt-6 border rounded-xl">
              <button
                onClick={() => setTotalCart(totalCart - 1)}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="mx-2">1</span>
              <button
                onClick={() => setTotalCart(totalCart + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>

            {/* Add to Cart and Buy Now Buttons */}
            <div className="flex space-x-2 mt-6">
              <button className="bg-[#e87f35] text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Add to Cart
              </button>
              <button className="bg-[#5eb237] text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Buy Now
              </button>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="list-disc ml-5 mt-2 space-y-2">
              {keyFeatures &&
                keyFeatures.map((feature, index) => (
                  <li key={index} className="text-lg">
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-sm font-semibold text-red-500">
              GIFT WRAPPING AVAILABLE
            </p>
            <p className="text-sm">
              Inside Dhaka Delivery Charge: 50 TK (24-48 Hours)
            </p>
            <p className="text-sm">Outside Dhaka Delivery Charge: 99 TK Only</p>
            <p className="text-sm">
              Book This Product Before Coming To Our Store
            </p>
            <img src={pay} className="mt-3" alt="Payment Options" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Descriptions and Photos */}
      <div className="mt-12">
        <h2 className="text-2xl mb-4">Description</h2>
        <img
          src={images[1] || images[0]}
          alt="image"
          className="w-full h-[350px] object-cover rounded-lg mb-4"
        />
        {description}
      </div>
    </div>
  );
};

export default ProductDetails;

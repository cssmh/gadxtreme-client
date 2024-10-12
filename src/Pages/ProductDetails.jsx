import { useState } from "react";
import pay from "../assets/pay.png";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const gadgetData = useLoaderData(); // Assuming you're using loader data
  const { productName, price, discountPrice, description, images, inStock } =
    gadgetData; // Destructure the real data
  const [mainImage, setMainImage] = useState(images[0]);

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
          <div className="text-xl mt-2">
            <span className="line-through text-gray-500">৳{price}</span>
            <span className="ml-2 text-gadBlue font-semibold">
              ৳{discountPrice}
            </span>
          </div>

          {/* Stock Status */}
          <p
            className={`mt-4 ${
              inStock ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mt-4">
            <span className="mr-2">Quantity:</span>
            <button className="px-3 py-1 bg-gray-200">-</button>
            <span className="mx-2">1</span>
            <button className="px-3 py-1 bg-gray-200">+</button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-gadBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Buy Now
            </button>
          </div>

          {/* Product Features */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-lg leading-7 mt-2">{description}</p>
          </div>

          {/* Additional Info */}
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
        <img src={images[2]} alt="image" className="w-full rounded-lg mb-4" />
        {description}
      </div>
    </div>
  );
};

export default ProductDetails;

import { useState } from "react";
import pay from "../assets/pay.png";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(
    "https://extremegadgets.com.bd/wp-content/uploads/2024/05/1000020322.jpg"
  );

  // Placeholder images (replace with actual product image paths)
  const productImages = [
    "https://extremegadgets.com.bd/wp-content/uploads/2024/05/1000020322.jpg",
    "https://extremegadgets.com.bd/wp-content/uploads/2024/05/1000020320.jpg",
    "https://extremegadgets.com.bd/wp-content/uploads/2024/05/1000020321.jpg",
  ];

  return (
    <div className="container mx-auto p-4 my-6">
      {/* Main Section: Product Image and Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
          <div className="flex mt-2 space-x-2">
            {/* Thumbnails for product images */}
            {productImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Product thumbnail ${idx + 1}`}
                className="w-16 h-16 cursor-pointer rounded-md border-2 hover:border-gadBlue"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-semibold">
            CMF by Nothing Neckband Pro
          </h1>
          <div className="text-xl mt-2">
            <span className="line-through text-gray-500">৳4,500.00</span>
            <span className="ml-2 text-gadBlue font-semibold">৳3,650.00</span>
          </div>

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
            <ul className="list-disc pl-5">
              <li>13.6mm Driver with Ultra Bass technology</li>
              <li>Spatial Audio</li>
              <li>Clear voice technology with AI Noise cancellation</li>
              <li>10 minutes of charging = 18 hours of playback</li>
              <li>50 dB Active noise cancellation</li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="mt-4 space-y-1">
            <p className="text-sm font-semibold text-red-500">GIFT WRAPPING AVAILABLE</p>
            <p className="text-sm">
              Inside Dhaka Delivery Charge: 50 TK (24-48 Hours)
            </p>
            <p className="text-sm">Outside Dhaka Delivery Charge: 99 TK Only</p>
            <p className="text-sm">
              Book This Product Before Coming To Our Store
            </p>
            <img src={pay} className="mt-3" alt="" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Descriptions and Photos */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <p className="text-lg leading-7">
          The CMF by Nothing Neckband Pro is a premium neckband offering
          high-quality sound with cutting-edge technology. Equipped with AI
          noise cancellation and spatial audio, it provides a superior listening
          experience. Ideal for long journeys, the neckband boasts up to 50 dB
          active noise cancellation and delivers exceptional bass performance.
        </p>

        {/* Additional Product Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <img
            src="https://extremegadgets.com.bd/wp-content/uploads/2024/05/1000020322.jpg"
            alt="Product Detail 1"
            className="w-[400px] h-[350px] rounded-lg"
          />
          <img
            src="https://extremegadgets.com.bd/wp-content/uploads/2024/05/1000020320.jpg"
            alt="Product Detail 2"
            className="w-[400px] h-[350px] rounded-lg"
          />
          <img
            src="https://extremegadgets.com.bd/wp-content/uploads/2024/05/1000020321.jpg"
            alt="Product Detail 3"
            className="w-[400px] h-[300px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

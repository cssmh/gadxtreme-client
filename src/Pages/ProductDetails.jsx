import { useState } from "react";
import pay from "../assets/pay.png";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const [totalCart, setTotalCart] = useState(1);
  const gadgetData = useLoaderData();
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

  const handleIncrement = () => {
    setTotalCart((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (totalCart > 1) {
      setTotalCart((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 my-6">
      <div className="flex flex-col md:flex-row gap-3 md:gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
          <div className="flex mt-2 space-x-2">
            {images?.map((img, idx) => (
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
        <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-xl md:text-3xl font-medium">{productName}</h1>
          <p
            className={`mt-2 ${
              inStock ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
          <div className="text-xl mt-2">
            {discountPrice ? (
              <>
                <span className="line-through text-gray-500">৳{price}</span>
                <span className="ml-2 text-[#2e6bc6] font-semibold">
                  ৳{discountPrice}
                </span>
              </>
            ) : (
              <span className="text-[#2e6bc6] font-semibold">৳{price}</span>
            )}
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="flex items-center border rounded-xl">
              <button onClick={handleDecrement} className="px-3 py-1 border-r">
                -
              </button>
              <span className="mx-2">{totalCart}</span>
              <button onClick={handleIncrement} className="px-3 py-1 border-l">
                +
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="bg-[#e87f35] text-white px-4 py-2 rounded-lg hover:bg-[#cf6d2f]">
                Add to Cart
              </button>
              <button className="bg-[#5eb237] text-white px-4 py-2 rounded-lg hover:bg-[#4c992f]">
                Buy Now
              </button>
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="list-disc ml-5 mt-2 space-y-2">
              {keyFeatures &&
                keyFeatures.map((feature, index) => (
                  <li key={index} className="text-sm">
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-4 space-y-1 text-base">
            <p className="font-semibold text-red-500">
              GIFT WRAPPING AVAILABLE
            </p>
            Inside Dhaka Delivery Charge: 50 TK (24-48 Hours)
            <br />
            Outside Dhaka Delivery Charge: 99 TK Only
            <br />
            Book This Product Before Coming To Our Store
            <br />
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

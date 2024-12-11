import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { postCart } from "../Api/cartGadget";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import useMyCart from "../hooks/useMyCart";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refetch } = useMyCart();
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateDiscount = (price, discountPrice) => {
    const discount = ((price - discountPrice) / price) * 100;
    return Math.round(discount);
  };

  const handleAddToCart = async (gadget, buy = false) => {
    if (!inStock) {
      toast.error("This product is out of stock.");
      return;
    }
    const cartData = {
      gadgetId: gadget._id,
      author: user?.email,
      image: gadget.images[0],
      name: gadget.productName,
      price: parseFloat(gadget.discountPrice) || parseFloat(gadget.price),
      quantity: Number(totalCart) || 1,
    };
    try {
      await postCart(cartData);
      refetch();
      if (buy) {
        toast.success("Redirecting to cart...");
        navigate("/cart");
      } else {
        toast.success("Added to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const formattedContent = description
  //   ? description.split("\n").map((line, index) => (
  //       <p key={index} className="text-gray-700 px-1 md:px-0 mb-4">
  //         {line}
  //       </p>
  //     ))
  //   : null;

  const formattedContent = description
    ? description.split("\n").map((line, index) => {
        const trimmedLine = line.trim();

        // Avoid rendering empty lines
        if (!trimmedLine) return null;

        return (
          <p key={index} className="text-gray-700 px-1 md:px-0 mb-4">
            {trimmedLine}
          </p>
        );
      })
    : null;

  return (
    <div className="container mx-auto p-4 my-4">
      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="w-full md:w-[58%] relative">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
          {discountPrice && price && (
            <div className="absolute top-2 right-2 bg-gadDarkBlue text-white rounded-full px-3 py-4 font-semibold text-[13px] z-10">
              -{calculateDiscount(price, discountPrice)}%
            </div>
          )}
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
        <div className="w-full md:w-[42%]">
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
                <span className="line-through text-gray-400">
                  ৳{formatPrice(price)}
                </span>
                <span className="ml-4 text-gadDarkBlue font-semibold">
                  ৳{formatPrice(discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-gadDarkBlue font-semibold">
                ৳{formatPrice(price)}
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-3">
            <div className="flex items-center border rounded-2xl">
              <button onClick={handleDecrement} className="px-2 py-2 border-r">
                -
              </button>
              <span className="mx-2">{totalCart}</span>
              <button onClick={handleIncrement} className="px-2 py-2 border-l">
                +
              </button>
            </div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
              <button
                onClick={() => handleAddToCart(gadgetData)}
                className="bg-[#e87f35] text-white mb-2 md:mb-0 px-4 py-2 rounded-lg hover:bg-[#cf6d2f]"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToCart(gadgetData, true)}
                className="bg-[#5eb237] text-white px-4 py-2 rounded-lg hover:bg-[#4c992f]"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="list-disc ml-5 mt-2 space-y-2">
              {keyFeatures &&
                keyFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-500 text-sm">
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
            <img src={assets.pay} className="mt-3" alt="Payment Options" />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl mb-4">Description</h2>
        <img
          src={images[1] || images[0]}
          alt="image"
          className="w-full h-[350px] object-cover rounded-lg mb-4"
        />
        {formattedContent}
      </div>
    </div>
  );
};

export default ProductDetails;

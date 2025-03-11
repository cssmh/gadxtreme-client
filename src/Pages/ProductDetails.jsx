import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postCart } from "../Api/cartGadget";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import useMyCart from "../hooks/useMyCart";
import { assets } from "../assets/assets";
import { getCategoryGadget, getGadget } from "../Api/gadgets";
import { useQuery } from "@tanstack/react-query";
import SkeletonRow from "./AdminDash/SkeletonRow";
import useUserCount from "../hooks/useUserCount";

const ProductDetails = () => {
  const { loading, user } = useAuth();
  const { id } = useParams();
  const { refetch: hookRefetch } = useUserCount();
  const navigate = useNavigate();
  const { refetch } = useMyCart();
  const [totalCart, setTotalCart] = useState(1);

  const { data: gadgetData = {}, isLoading } = useQuery({
    queryKey: ["gadDetails", id],
    queryFn: () => getGadget(id),
    enabled: !!id,
  });

  const { data: categoryGadgets = [], isLoading: load } = useQuery({
    queryKey: ["categoriesGadgets", gadgetData?.category],
    queryFn: async () => await getCategoryGadget(gadgetData?.category, 1, 12),
  });

  const [mainImage, setMainImage] = useState(gadgetData?.images?.[0] || null);

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
    if (!gadgetData?.inStock) {
      toast.error("This product is out of stock.");
      return;
    }
    if (!user) {
      toast.error("PLease login first");
      navigate("/login");
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
      hookRefetch();
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

  const formattedContent = gadgetData?.description
    ? gadgetData?.description.split("\n").map((line, index) => {
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

  if (loading || isLoading || load)
    return <SkeletonRow type="productDetails" />;

  return (
    <div className="max-w-7xl 2xl:max-w-[86%] mx-auto p-4 my-4">
      <div className="flex flex-col md:flex-row gap-5 md:gap-7">
        <div className="w-full md:w-[58%] 2xl:w-1/2 relative">
          <img
            src={mainImage || gadgetData?.images[0] || ""}
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
          {gadgetData?.discountPrice && gadgetData?.price && (
            <div className="absolute top-2 right-2 bg-gadDarkBlue text-white rounded-full px-3 py-4 font-semibold text-[13px] z-10">
              -{calculateDiscount(gadgetData?.price, gadgetData?.discountPrice)}
              %
            </div>
          )}
          <div className="flex mt-2 space-x-2">
            {gadgetData?.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Product thumbnail ${idx + 1}`}
                className="w-20 2xl:w-28 h-20 2xl:h-28 cursor-pointer rounded-md border-2 hover:border-gadBlue"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-[42%] 2xl:w-1/2">
          <h1 className="text-xl md:text-2xl 2xl:text-3xl font-medium">
            {gadgetData?.productName}
          </h1>
          <p
            className={`mt-2 2xl:text-lg ${
              gadgetData?.inStock ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {gadgetData?.inStock ? "In Stock" : "Out of Stock"}
          </p>
          <div className="text-xl mt-2">
            {gadgetData?.discountPrice ? (
              <>
                <span className="line-through text-gray-400">
                  ৳{formatPrice(gadgetData?.price)}
                </span>
                <span className="ml-4 text-gadDarkBlue font-semibold">
                  ৳{formatPrice(gadgetData?.discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-gadDarkBlue font-semibold">
                ৳{formatPrice(gadgetData?.price)}
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-3 2xl:text-lg">
            <div className="flex items-center border rounded-2xl">
              <button onClick={handleDecrement} className="px-2 py-2 border-r">
                -
              </button>
              <span className="mx-2">{totalCart}</span>
              <button onClick={handleIncrement} className="px-2 py-2 border-l">
                +
              </button>
            </div>
            <div className="flex w-2/3 flex-col md:flex-row space-x-0 md:space-x-2">
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
            <h2 className="text-xl 2xl:text-2xl font-semibold">Key Features</h2>
            <ul className="list-disc ml-5 mt-2 space-y-2">
              {gadgetData?.keyFeatures &&
                gadgetData?.keyFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-500 text-sm 2xl:text-lg">
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-4 space-y-1 text-base 2xl:text-lg">
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
        {gadgetData?.description && (
          <h2 className="text-2xl 2xl:text-3xl mb-4">Description</h2>
        )}
        {/* <div className="flex flex-col">
          <img
            src={gadgetData?.images[1] || gadgetData?.images[0]}
            alt="image"
            className="w-full md:h-[500px] object-cover rounded-lg mb-4"
          />
          <img
            src={gadgetData?.images[2] || gadgetData?.images[0]}
            alt="image"
            className="w-full md:h-[500px] object-cover rounded-lg mb-4"
          />
        </div> */}
        <p className=" 2xl:text-lg">{formattedContent}</p>
      </div>
      <div className="mt-7 border-t pt-5">
        <h2 className="text-2xl 2xl:text-3xl font-semibold mb-4">
          More from {gadgetData?.category}
        </h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categoryGadgets?.result?.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }} // Hover animation
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                to={`/details/${product?.productName
                  .toLowerCase()
                  .replaceAll(/\s+/g, "_")}/${product._id}`}
              >
                <div className="relative h-40 2xl:h-48 w-full">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="h-full w-full object-cover rounded-t-lg"
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
                  <div className="flex items-center justify-between mt-2 text-xs 2xl:text-base">
                    <span className="text-gray-500 line-through">
                      ৳{formatPrice(gadgetData?.price)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      ৳{formatPrice(gadgetData?.discountPrice)}
                    </span>
                  </div>
                  {product.inStock ? (
                    <span className="mt-2 inline-block px-2 py-1 text-xs 2xl:text-base font-semibold text-green-800 bg-green-200 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="mt-2 inline-block px-2 py-1 text-xs 2xl:text-base font-semibold text-red-800 bg-red-200 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;

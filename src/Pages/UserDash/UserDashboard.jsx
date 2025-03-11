import { Link } from "react-router-dom";
import {
  FaUserShield,
  FaHeart,
  FaClipboardList,
  FaCartPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useUserCount from "../../hooks/useUserCount";
import SmallLoader from "../../Component/Loaders/SmallLoader";

const UserDashboard = () => {
  const { user, isLoading, data } = useUserCount();

  if (isLoading) return <SmallLoader size={88} />

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800">
          Welcome to Your Dashboard, {user?.displayName}
        </h1>
        <p className="text-gray-700 2xl:text-lg mb-5">
          Get insights, manage your account, and explore your preferences.
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mt-2 md:mt-10">
          {[
            {
              title: "Total Cart",
              description: "Items added to your cart.",
              icon: (
                <FaCartPlus className="text-2xl 2xl:text-3xl text-blue-600" />
              ),
              value: `${data?.totalCart || 0} (${
                data?.totalQuantity || 0
              } items - ৳${data?.unpaid || 0})`,
            },
            {
              title: "Total Orders",
              description: "Track your total number of orders.",
              icon: (
                <FaClipboardList className="text-2xl 2xl:text-3xl text-orange-600" />
              ),
              value: data?.totalOrders || 0,
            },
            {
              title: "Total Revenue",
              description: "Total amount spent on orders.",
              icon: (
                <span className="text-2xl 2xl:text-3xl text-green-500">৳</span>
              ),
              value: data?.totalRevenue || "0.00",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-3 md:py-6 md:px-4 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
                {item.title}
              </h2>
              <p className="text-sm 2xl:text-base text-gray-500 mb-4">
                {item.description}
              </p>
              <div className="flex items-center font-semibold gap-2">
                {item.icon}
                <p className="text-2xl 2xl:text-3xl text-gray-900">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mt-2 md:mt-10">
          {[
            {
              title: "My Wishlist",
              description:
                "Keep track of your favorite items and manage your preferences.",
              link: "/dashboard/wishlist",
              bgColor: "bg-teal-500 hover:bg-teal-600",
              icon: <FaHeart className="mr-2" />,
            },
            {
              title: "My Orders",
              description:
                "Track your order history and manage recent purchases.",
              link: "/dashboard/orders",
              bgColor: "bg-orange-500 hover:bg-orange-600",
              icon: <FaClipboardList className="mr-2" />,
            },
            {
              title: "Profile Settings",
              description:
                "View and manage your profile details and preferences.",
              link: "/dashboard/profile",
              bgColor: "bg-indigo-500 hover:bg-indigo-600",
              icon: <FaUserShield className="mr-2" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-3 md:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-700">
                {item.title}
              </h2>
              <p className="text-sm 2xl:text-base text-gray-500 mb-4">
                {item.description}
              </p>
              <Link
                to={item.link}
                className={`inline-block px-4 py-2 text-white rounded-lg shadow-md transition duration-300 ${item.bgColor}`}
              >
                <span className="flex items-center gap-1">
                  {item.icon} View {item.title.split(" ")[1]}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;

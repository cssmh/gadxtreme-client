const SkeletonRow = ({ type }) => {
  switch (type) {
    case "productDetails":
      return (
        <div className="max-w-7xl 2xl:max-w-[90%] mx-auto p-4 my-4">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 animate-pulse">
            <div className="w-full md:w-[58%]">
              <div className="skeleton h-80 w-full bg-gray-300 rounded-lg mb-5"></div>
              <div className="flex mt-2 space-x-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton h-20 w-20 bg-gray-300 rounded-md"
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[42%] space-y-4">
              <div className="skeleton h-8 w-3/4 bg-gray-300 rounded"></div>
              <div className="skeleton h-6 w-1/3 bg-gray-300 rounded"></div>
              <div className="skeleton h-10 w-1/2 bg-gray-300 rounded"></div>
              <div className="flex items-center space-x-3">
                <div className="skeleton h-10 w-28 bg-gray-300 rounded"></div>
                <div className="skeleton h-10 w-28 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="skeleton h-6 w-32 bg-gray-300 rounded"></div>
                <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                <div className="skeleton h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-3 mt-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton h-4 w-3/4 bg-gray-300 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case "allOrders":
      return (
        <tr className="animate-pulse">
          <td className="p-3">
            <div className="h-4 bg-gray-300 rounded w-6"></div>
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
          <td className="p-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td className="px-9 py-3 text-center">
            <div className="h-6 bg-gray-300 rounded-full w-6 mx-auto"></div>
          </td>
          <td className="p-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
          </td>
          <td className="p-3">
            <div className="space-y-2">
              <div className="h-10 bg-gray-300 rounded w-32"></div>
              <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
          </td>
        </tr>
      );

    case "allProducts":
      return (
        <tr className="animate-pulse">
          <td className="px-4 py-2">
            <div className="skeleton h-10 md:h-16 bg-gray-300 rounded-md"></div>
          </td>
          <td className="px-4 py-2">
            <div className="skeleton h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-2">
            <div className="skeleton h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-2">
            <div className="skeleton h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-2">
            <div className="skeleton h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-2">
            <div className="skeleton h-6 bg-gray-300 rounded-full"></div>
          </td>
          <td className="px-4 py-2">
            <div className="flex gap-2">
              <div className="skeleton w-12 ml-auto h-8 bg-gray-300 rounded"></div>
              <div className="skeleton w-12 mr-auto h-8 bg-gray-300 rounded"></div>
            </div>
          </td>
        </tr>
      );

    case "allCart":
      return (
        <tr className="animate-pulse">
          <td className="px-6 py-4">
            <div className="skeleton w-12 h-12 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-1/2"></div>
          </td>
          <td className="px-6 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-1/4"></div>
          </td>
          <td className="px-6 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-2/3"></div>
          </td>
          <td className="px-6 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-2/3"></div>
          </td>
          <td className="px-6 py-4">
            <div className="skeleton h-8 bg-gray-300 rounded w-20"></div>
          </td>
        </tr>
      );

    case "allUser":
      return (
        <tr className="animate-pulse">
          <td className="px-3 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-24"></div>{" "}
          </td>
          <td className="px-3 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-48"></div>{" "}
          </td>
          <td className="px-5 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-32"></div>{" "}
          </td>
          <td className="px-3 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-28"></div>{" "}
          </td>
          <td className="px-3 py-4">
            <div className="skeleton h-4 bg-gray-300 rounded w-24"></div>{" "}
          </td>
        </tr>
      );

    case "userDataRow":
      return (
        <tr className="hover:bg-gray-50 transition duration-200 text-sm">
          <td className="px-3 py-4 whitespace-nowrap flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap">
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap">
            <div className="space-y-2">
              <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </td>
          <td className="px-2 py-4 whitespace-nowrap text-center">
            <div className="w-20 h-6 bg-gray-200 animate-pulse rounded-full"></div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-right space-x-2">
            <div className="inline-flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </td>
        </tr>
      );

    default:
      return null;
  }
};

export default SkeletonRow;

const SkeletonRow = ({ type }) => {
  switch (type) {
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

    default:
      return null;
  }
};

export default SkeletonRow;

import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { allCart, deleteMyCart } from "../../Api/cartGadget";

const AllCart = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCart"],
    queryFn: async () => await allCart(),
  });

  const handleDelete = async (id) => {
    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "Delete a Cart",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmDelete) {
      try {
        const res = await deleteMyCart(id);
        if (res?.deletedCount > 0) {
          swal("Deleted!", {
            icon: "success",
            timer: 2000,
          });
          refetch();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold text-gray-800 mb-4">All Cart Items</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left text-sm">
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-3 py-4">
                      <div className="skeleton w-20 h-12 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded w-1/2"></div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded w-2/3"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded w-2/3"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="skeleton h-8 bg-gray-300 rounded w-20"></div>
                    </td>
                  </tr>
                ))
              : // Render Actual Data
                data.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition duration-200 text-sm"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-gray-600">৳{item.price}</td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.author}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCart;

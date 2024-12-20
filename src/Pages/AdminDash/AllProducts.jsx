import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { getAllGadget, deleteGadget } from "../../Api/gadgets";
import { Link } from "react-router-dom";

const SkeletonRow = () => (
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
      <div className="flex">
        <div className="skeleton w-12 mx-auto h-8 bg-gray-300 rounded"></div>
        <div className="skeleton w-12 h-8 bg-gray-300 rounded"></div>
      </div>
    </td>
  </tr>
);

const AllProducts = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allGadgets"],
    queryFn: async () => await getAllGadget(),
  });

  const handleDelete = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      const res = await deleteGadget(id);
      if (res.deletedCount > 0) {
        swal("The product has been deleted.", {
          icon: "success",
          timer: 2000,
        });
        refetch();
      }
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-xl font-bold mb-4">All Products</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-teal-500 text-white rounded-xl">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">
                Discount Price
              </th>
              <th className="border border-gray-300 px-4 py-2">Stock Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              : products.map((product) => (
                  <tr key={product._id} className="border hover:bg-base-100">
                    <td className="border-gray-300 px-4 py-2">
                      <img
                        src={product.images[0]}
                        alt={product.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="border-gray-300 px-4 py-2">
                      <Link to={`/details/${product._id}`}>
                        {product.productName.slice(0, 20)}..
                      </Link>
                    </td>
                    <td className="border-gray-300 px-4 py-2">
                      {product.category}
                    </td>
                    <td className="border-gray-300 px-4 py-2">
                      ৳{product.price}
                    </td>
                    <td className="border-gray-300 px-4 py-2">
                      {product.discountPrice
                        ? `৳${product.discountPrice}`
                        : "No Discount"}
                    </td>
                    <td className="border-gray-300 px-4 py-2">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="gap-1 border-gray-300 px-4 py-2">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/dashboard/update/${product._id}`}
                          className="px-5 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;

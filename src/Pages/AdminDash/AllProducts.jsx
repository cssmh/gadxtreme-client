import swal from "sweetalert";
import { getAllGadget, deleteGadget } from "../../Api/gadgets";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import SkeletonRow from "./SkeletonRow";

const AllProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useFetchData(["allGadgets"], getAllGadget);

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
    <div>
      <h1 className="text-xl 2xl:text-2xl font-bold mb-4">All Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-sm 2xl:text-base text-gray-600 text-left">
              <th className="py-[10px] text-center">Image</th>
              <th className="py-[10px] text-center">Product Name</th>
              <th className="py-[10px] text-center">Category</th>
              <th className="py-[10px] text-center">Price</th>
              <th className="py-[10px] text-center">Discount Price</th>
              <th className="py-[10px] text-center">Stock Status</th>
              <th className="py-[10px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonRow key={index} type="allProducts" />
                ))
              : products.map((product) => (
                  <tr
                    key={product._id}
                    className="border hover:bg-base-100 text-sm text-center 2xl:text-base"
                  >
                    <td className="border-gray-300 px-4 py-2">
                      <img
                        src={product.images[0]}
                        alt={product.productName}
                        className="w-14 2xl:w-16 h-14 2xl:h-16 object-cover rounded-sm"
                      />
                    </td>
                    <td className="border-gray-300 px-4 py-2">
                      <Link
                        className="hover:underline"
                        to={`/details/${product?.productName
                          .toLowerCase()
                          .replaceAll(/\s+/g, "_")}/${product._id}`}
                      >
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
                          className="px-4 py-1 2xl:py-[6px] text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-500 text-sm hover:bg-red-600 text-white px-4 py-1 2xl:py-[6px] rounded-md"
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

import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import { getAllGadget, deleteGadget } from "../../Api/gadgets";

const ManageProducts = () => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[93vh]">
        <CgSpinnerTwo className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-extrabold text-center text-teal-600 mb-6">
        Manage Products
      </h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-teal-100 text-teal-700">
            <th className="py-3 px-6 text-center">Product Name</th>
            <th className="py-3 px-6 text-center">Price (৳)</th>
            <th className="py-3 px-6 text-center">In Stock</th>
            <th className="py-3 px-6 text-center">Category</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-teal-50 transition-colors duration-300"
            >
              <td className="py-3 px-6 text-center">
                <Link
                  to={`/details/${product._id}`}
                  className="text-teal-600 hover:underline"
                >
                  {product.productName.slice(0, 10)}...
                </Link>
              </td>
              <td className="py-3 px-6 text-center">
                {product.discountPrice ? (
                  <div>
                    <span className="line-through text-gray-500">
                      {product.price}
                    </span>{" "}
                    <span className="text-teal-600 font-semibold">
                      {product.discountPrice}
                    </span>
                  </div>
                ) : (
                  <span className="text-teal-600 font-semibold">
                    {product.price}
                  </span>
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "Yes" : "No"}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <span className="text-gray-600">{product.category}</span>
              </td>
              <td className="py-3 px-6 text-center space-x-4">
                <Link
                  to={`/admin-dashboard/update-product/${product._id}`}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;

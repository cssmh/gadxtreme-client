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
        <CgSpinnerTwo className="animate-spin text-4xl text-teal-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">
        Manage Products
      </h1>
      <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-teal-100 text-teal-700">
              <th className="py-4 px-6 text-left text-sm font-medium">
                Product Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Price (৳)
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                In Stock
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Category
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product._id}
                className="transition-all duration-300 hover:bg-teal-50 cursor-pointer"
              >
                <td className="py-4 px-6 text-sm text-gray-700">
                  <Link
                    to={`/details/${product._id}`}
                    className="text-teal-600 hover:underline"
                  >
                    {product.productName.length > 20
                      ? product.productName.slice(0, 16) + "..."
                      : product.productName}
                  </Link>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {product.discountPrice ? (
                    <div className="flex flex-col">
                      <span className="line-through text-gray-500 text-xs">
                        {product.price}
                      </span>
                      <span className="text-teal-600 font-semibold text-lg">
                        {product.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-teal-600 font-semibold text-lg">
                      {product.price}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <span
                    className={`${
                      product.inStock ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {product.inStock ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <span className="text-gray-600">{product.category}</span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700 space-x-4">
                  <Link
                    to={`/admin-dashboard/update-product/${product._id}`}
                    className="px-5 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-5 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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

export default ManageProducts;

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
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4 border-b text-center">Product Name</th>
            <th className="py-2 px-4 border-b text-center">Price (৳)</th>
            <th className="py-2 px-4 border-b text-center">In Stock</th>
            <th className="py-2 px-4 border-b text-center">Category</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/details/${product._id}`}>
                  {product.productName.slice(0, 10)}
                </Link>
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.discountPrice ? (
                  <div>
                    <span className="line-through text-gray-500">
                      {product.price}
                    </span>{" "}
                    <span className="text-blue-600">
                      {product.discountPrice}
                    </span>
                  </div>
                ) : (
                  product.price
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.inStock ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.category}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-2">
                <Link
                  to={`/admin-dashboard/update-product/${product._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:underline"
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

import swal from "sweetalert";
import { deleteMyCart } from "../../Api/cartGadget";
import { Link } from "react-router-dom";
import { allCart } from "../../Api/admin";
import useFetchData from "../../hooks/useFetchData";
import SkeletonRow from "./SkeletonRow";
import { toast } from "sonner";
import GadHelmet from "../../Component/GadHelmet";

const AllCart = () => {
  const { data, isLoading, refetch } = useFetchData(["allCart"], allCart);

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
        toast.warning(error?.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <GadHelmet title={"All Cart Items"} />
      <h1 className="text-xl 2xl:text-2xl font-bold text-gray-800 mb-4">
        All Cart Items
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left text-sm 2xl:text-base">
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={index} type="allCart" />
                ))
              : data.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition duration-200 text-sm 2xl:text-base"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 2xl:w-16 h-12 2xl:h-16 rounded object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 hover:underline text-gray-800">
                      <Link
                        to={`/details/${item?.name
                          .toLowerCase()
                          .replaceAll(/\s+/g, "_")}/${item.gadgetId}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-600">৳{item.price}</td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {new Date(item?.cartAdded).toLocaleDateString("en-GB")}{" "}
                      <br />
                      {new Date(item?.cartAdded).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.author}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 text-sm text-white rounded-md bg-red-500 hover:bg-red-600 transition duration-300"
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

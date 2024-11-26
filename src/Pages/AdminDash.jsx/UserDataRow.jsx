import swal from "sweetalert";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { deleteUser, updateRole } from "../../Api/auth";
import useAuth from "../../hooks/useAuth";

const UserDataRow = ({ user, refetch }) => {
  const { loading, user: userAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleRoleUpdate = async () => {
    try {
      const res = await updateRole(user?.email, selectedRole);
      if (res?.modifiedCount > 0) {
        toast.success(`Updated to ${selectedRole}`);
        refetch();
        if (userAuth?.email === user?.email && selectedRole === "guest") {
          navigate("/");
        }
      }
    } catch (error) {
      swal(error?.response?.data?.message, {
        icon: "error",
        timer: 3000,
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id, role) => {
    if (role === "admin") {
      swal({
        title: "Action not allowed!",
        text: "Downgrade to a regular user before deletion?",
        icon: "warning",
        timer: 1000,
      });
      setIsModalOpen(true);
      return;
    }

    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmDelete) {
      try {
        const res = await deleteUser(id);
        if (res?.deletedCount > 0) {
          swal("Deleted!", {
            icon: "success",
            timer: 2000,
          });
          refetch();
        }
      } catch (error) {
        swal(error?.response?.data?.message, {
          icon: "error",
          timer: 3000,
        });
      }
    }
  };

  const openRoleModal = () => {
    setIsModalOpen(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  if (loading) {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm">
          <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <tr className="bg-gray-100 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          <div className="flex items-center gap-4">
            <img
              src={user?.photo}
              className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              alt={user?.name || "User Avatar"}
            />
            <span className="font-semibold truncate">
              {user?.name || "N/A"}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          <span className="truncate block">{user?.email || "N/A"}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          <div className="flex flex-col space-y-1">
            <span className="text-green-600 font-medium">
              Created:{" "}
              {user?.timestamp?.[0]
                ? new Date(parseInt(user.timestamp[0], 10)).toLocaleString()
                : "N/A"}
            </span>
            <span className="text-gray-500">
              Last Login:{" "}
              {user?.timestamp?.[1]
                ? new Date(parseInt(user.timestamp[1], 10)).toLocaleString()
                : "N/A"}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              user?.role === "guest"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {user?.role?.toUpperCase() || "Unavailable"}
          </span>
        </td>
        <td className="px-6 py-4 text-center whitespace-nowrap">
          <button
            onClick={() => handleDelete(user._id, user?.role)}
            className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
            aria-label="Delete User"
          >
            <FaTrashAlt size={18} />
          </button>
        </td>
        <td className="px-6 py-4 text-right whitespace-nowrap">
          <button
            onClick={openRoleModal}
            className="px-4 py-2 text-sm font-medium bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
          >
            Update Role
          </button>
        </td>
      </tr>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Select Role</h2>
            <div className="flex flex-col space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedRole === "admin"}
                  onChange={() => setSelectedRole("admin")}
                  className="form-radio"
                />
                <span className="text-gray-700">Admin</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="guest"
                  checked={selectedRole === "guest"}
                  onChange={() => setSelectedRole("guest")}
                  className="form-radio"
                />
                <span className="text-gray-700">Guest</span>
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={handleRoleUpdate}
                  className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDataRow;

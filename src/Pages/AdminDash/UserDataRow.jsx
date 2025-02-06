import swal from "sweetalert";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { deleteUser, updateRole } from "../../Api/auth";
import useAuth from "../../hooks/useAuth";

const UserDataRow = ({ user, refetch }) => {
  const { loading, user: userAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user?.role === "admin");
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleRoleUpdate = async () => {
    try {
      const newRole = isAdmin ? "user" : "admin";
      const res = await updateRole(user?.email, newRole);
      if (res?.modifiedCount > 0) {
        toast.success(`Updated to ${newRole}`);
        setIsAdmin(!isAdmin);
        refetch();
        if (userAuth?.email === user?.email && newRole === "user") {
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
  }

  return (
    <>
      <tr className="hover:bg-gray-50 transition duration-200 text-sm">
        <td className="px-3 py-4 whitespace-nowrap flex items-center space-x-4">
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full p-[1px] border border-teal-500 shadow-sm"
          />
          <span className="font-medium text-gray-800">{user.name}</span>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-gray-600">
          {user.email}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          <div>
            <div className="font-medium text-gray-700">
              {new Date(parseInt(user?.timestamp[0], 10)).toLocaleString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }
              )}
            </div>
            <div>
              {new Date(parseInt(user?.timestamp[1], 10)).toLocaleString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }
              )}
            </div>
          </div>
        </td>
        <td className="px-2 py-4 whitespace-nowrap text-center">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              user.role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {user.role === "admin" ? "Admin" : "User"}
          </span>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-right space-x-2">
          <button
            onClick={handleRoleUpdate}
            className={`px-3 py-1 text-white ${
              user?.role === "admin" ? "bg-green-600" : "bg-blue-800"
            } rounded-lg focus:outline-none transition-all duration-200`}
          >
            {user?.role === "admin" ? (
              <FaUserCheck size={16} />
            ) : (
              <FaRegUserCircle size={16} />
            )}
          </button>
          <button
            onClick={() => handleDelete(user._id, user.role)}
            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none transition-all duration-200"
          >
            <FaTrashAlt size={16} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserDataRow;

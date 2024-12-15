import swal from "sweetalert";
import { toast } from "sonner";
import "./userData.css"
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
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
        <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
          <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm">
          <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
          <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <tr>
        <td className="px-2 py-4 whitespace-nowrap flex items-center">
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-4"
          />
          <span>{user.name}</span>
        </td>
        <td className="px-2 py-4 whitespace-nowrap">{user.email}</td>
        <td className="px-2 py-4 whitespace-nowrap">
          <div>
            <div>
              Created:{" "}
              {user?.timestamp?.[0]
                ? new Date(parseInt(user.timestamp[0], 10)).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )
                : "N/A"}
            </div>
            <div>
              Last Login:{" "}
              {user?.timestamp?.[1]
                ? new Date(parseInt(user.timestamp[1], 10)).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )
                : "N/A"}
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.role === "admin"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {user.role === "admin" ? "Admin" : "User"}
          </span>
        </td>
        <td className="px-2 py-4 whitespace-nowrap text-right">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 text-blue-600 hover:text-blue-800"
          >
            <FaUserEdit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-red-600 hover:text-red-800"
          >
            <FaTrashAlt size={16} />
          </button>
        </td>
      </tr>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative animate-slide-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle absolute right-2 text-white top-2 bg-red-500 hover:bg-red-600"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-center mb-4">Update Role</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedRole === "admin"}
                  onChange={() => setSelectedRole("admin")}
                  className="radio radio-accent"
                />
                <span className="text-sm">Admin</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="guest"
                  checked={selectedRole === "guest"}
                  onChange={() => setSelectedRole("guest")}
                  className="radio radio-accent"
                />
                <span className="text-sm">Guest</span>
              </label>
            </div>
            <div className="modal-action justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleRoleUpdate} className="btn btn-success text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDataRow;

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../Api/auth";
import UserDataRow from "./UserDataRow";

const AllUsers = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => await getAllUsers(),
  });

  return (
    <div className="p-4 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-gray-800 mb-2">All Users</h1>
      <div className="overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-teal-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Created & Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                Delete
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="skeleton h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="skeleton h-4 bg-gray-300 rounded w-2/4 mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="skeleton h-4 bg-gray-300 rounded w-2/4 ml-auto"></div>
                    </td>
                  </tr>
                ))
              : data?.map((user) => (
                  <UserDataRow key={user._id} user={user} refetch={refetch} />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

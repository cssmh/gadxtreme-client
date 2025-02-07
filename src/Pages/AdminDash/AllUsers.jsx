import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../Api/auth";
import UserDataRow from "./UserDataRow";
import SkeletonRow from "./SkeletonRow";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: () => getAllUsers(search),
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-2">All Users</h1>
      <div className="mb-3">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search users..."
          className="px-4 py-2 border rounded-lg w-full focus:outline-none"
        />
      </div>
      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-600 ">
            <tr>
              {["Name", "Email", "Created & Last Login", "Role", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-5 py-1 md:py-[10px] text-left text-sm uppercase"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading
              ? Array.from({ length: 9 }).map((_, index) => (
                  <SkeletonRow key={index} type="allUser" />
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

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-3 md:p-5 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;

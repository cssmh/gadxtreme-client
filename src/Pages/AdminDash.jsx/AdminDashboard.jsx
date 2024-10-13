import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen p-3 md:p-5">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;

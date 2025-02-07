import AdminContext from "./AdminContext";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <AdminContext>
      <div className="flex flex-col lg:flex-row">
        <div className="md:w-60">
          <Sidebar />
        </div>
        <div className="flex-1 bg-gray-50 min-h-screen p-3 md:p-5 mt-16 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </AdminContext>
  );
};

export default DashLayout;

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-gray-50 min-h-screen p-4 md:p-6 mt-16 md:mt-0 lg:ml-56">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-orange-50 min-h-screen p-1 md:p-2 mt-16 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;

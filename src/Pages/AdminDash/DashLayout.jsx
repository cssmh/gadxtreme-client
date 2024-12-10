import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-[#faf7f5] min-h-screen md:p-2 mt-16 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;

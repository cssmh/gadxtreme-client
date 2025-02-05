import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="md:w-60">
        {/* fixed md:relative inset-y-0 left-0 transform -translate-x-full
        md:translate-x-0 transition-transform duration-200 ease-in-out z-30 */}
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-50 min-h-screen p-3 md:p-5 mt-16 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Pages/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[75vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import TopBar from "../Component/TopBar";
import Footer from "../Pages/Footer";

const MainLayout = () => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

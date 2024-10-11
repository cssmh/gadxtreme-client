import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Pages/Footer";

const MainLayout = () => {
  const loc = useLocation();
  const noHeaderFooter = loc?.pathname?.startsWith("/admin-dashboard");
  return (
    <div>
      {!noHeaderFooter && <Navbar />}
      <div className="min-h-[75vh]">
        <Outlet />
      </div>
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;

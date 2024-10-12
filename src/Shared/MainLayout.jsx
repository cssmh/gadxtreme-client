import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Pages/Footer";
import DiscountModal from "../Component/DiscountModal";
import NavNew from "../Component/NavNew";

const MainLayout = () => {
  const loc = useLocation();
  const home = loc.pathname === "/";
  const noHeaderFooter = loc?.pathname?.startsWith("/admin-dashboard");
  return (
    <div>
      <DiscountModal />
      {!noHeaderFooter && home ? <Navbar /> : <NavNew />}
      <div className="min-h-[75vh]">
        <Outlet />
      </div>
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;

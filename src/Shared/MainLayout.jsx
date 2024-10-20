import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Pages/Footer";
import DiscountModal from "../Component/DiscountModal";
import NavNew from "../Component/NavNew";

const MainLayout = () => {
  const loc = useLocation();
  const NavRoute =
    loc.pathname === "/" ||
    loc.pathname === "/login" ||
    loc.pathname === "/register";

  const noHeaderFooter = loc?.pathname?.startsWith("/admin-dashboard");

  return (
    <div>
      <DiscountModal />
      {noHeaderFooter ? null : NavRoute ? <Navbar /> : <NavNew />}
      <div className="min-h-[83vh]">
        <Outlet />
      </div>
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;

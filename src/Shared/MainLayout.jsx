import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Pages/Footer";
import DiscountModal from "../Component/DiscountModal";
import NavNew from "../Component/NavNew";

const MainLayout = () => {
  const loc = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const NavRoute =
    loc.pathname === "/" ||
    loc.pathname === "/login" ||
    loc.pathname === "/register";

  const noHeaderFooter = loc?.pathname?.startsWith("/admin-dashboard");
  const noNavFooter = loc?.pathname?.startsWith("/success");

  return (
    <div>
      <DiscountModal />
      {!noNavFooter &&
        (noHeaderFooter ? null : NavRoute ? <Navbar /> : <NavNew />)}
      <div className="min-h-[83vh]">
        <Outlet />
      </div>
      {!noNavFooter && !noHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;

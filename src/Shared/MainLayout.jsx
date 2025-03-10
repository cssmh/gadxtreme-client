import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
// import DiscountModal from "../Component/DiscountModal";
import NavNew from "../Component/NavNew";
import Footer from "../Component/Footer";
import MainLoader from "../Component/Loaders/MainLoader";

const MainLayout = () => {
  const loc = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timeout);
  }, []);

  const routesWithNavbar = ["/", "/login", "/register"];
  const noHeaderFooter = loc.pathname.startsWith("/dashboard");
  const noNavFooter =
    loc.pathname.startsWith("/success") || loc.pathname.startsWith("/cancel");

  if (loading) return <MainLoader />;

  return (
    <div>
      {/* <DiscountModal /> */}
      {!noNavFooter &&
        (noHeaderFooter ? null : routesWithNavbar.includes(loc.pathname) ? (
          <Navbar />
        ) : (
          <NavNew />
        ))}
      <div className="min-h-[83vh]">
        <Outlet />
      </div>
      {!noNavFooter && !noHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;

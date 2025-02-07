import UserDashboard from "./UserDash/UserDashboard";
import useAdmin from "../hooks/useAdmin";
import AdminDashboard from "./AdminDash/AdminDashboard";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const [showAdminRoutes, setShowAdminRoutes] = useState(
    localStorage.getItem("showAdminRoutes") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setShowAdminRoutes(localStorage.getItem("showAdminRoutes") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="md:p-2">
      {isAdmin && showAdminRoutes ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;

import { useContext } from "react";
import UserDashboard from "./UserDash/UserDashboard";
import useAdmin from "../hooks/useAdmin";
import AdminDashboard from "./AdminDash/AdminDashboard";
import { RouteContext } from "./AdminDash/AdminContext";
import GadHelmet from "../Component/GadHelmet";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const { showAdminRoutes } = useContext(RouteContext);
  return (
    <div className="md:p-2">
      <GadHelmet title={"Dashboard"} />
      {isAdmin && showAdminRoutes ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;

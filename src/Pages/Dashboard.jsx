import UserDashboard from "./UserDash/UserDashboard";
import useAdmin from "../hooks/useAdmin";
import AdminDashboard from "./AdminDash/AdminDashboard";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  return <>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default Dashboard;

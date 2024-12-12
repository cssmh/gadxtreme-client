import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import SmallLoader from "../Component/SmallLoader";

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();
  if (isLoading) return <SmallLoader size="96" />;
  if (isAdmin) return children;
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;

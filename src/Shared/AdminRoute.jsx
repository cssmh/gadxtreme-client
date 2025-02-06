import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import BigLoader from "../Component/AllSpinner/BigLoader";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { isAdmin, isLoading } = useAdmin();
  if (loading || isLoading) return <BigLoader size="96" />;
  if (isAdmin) return children;
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;

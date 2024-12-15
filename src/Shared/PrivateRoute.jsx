import BigLoader from "../Component/BigLoader";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <BigLoader size="96" />;
  if (user?.email) return children;

  return <Navigate to="/login" state={location?.pathname} replace />;
};

export default PrivateRoute;

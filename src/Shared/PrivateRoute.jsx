import SmallLoader from "../Component/SmallLoader";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <SmallLoader size="80" />;
  if (user?.email) return children;

  return <Navigate to="/login" state={location?.pathname} replace />;
};

export default PrivateRoute;

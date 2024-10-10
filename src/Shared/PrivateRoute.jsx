import SmallLoader from "../Component/SmallLoader";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <SmallLoader />;
  if (user?.email) return children;

  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;

import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();

  if (isLoading)
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (isAdmin) return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;

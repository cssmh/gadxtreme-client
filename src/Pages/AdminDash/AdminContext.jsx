import { createContext, useState } from "react";
import useAdmin from "../../hooks/useAdmin";

export const RouteContext = createContext(null);

const AdminContext = ({ children }) => {
  const { isAdmin } = useAdmin();
  const [showAdminRoutes, setShowAdminRoutes] = useState(
    localStorage.getItem("showAdminRoutes") === isAdmin
  );

  return (
    <RouteContext.Provider value={{ showAdminRoutes, setShowAdminRoutes }}>
      {children}
    </RouteContext.Provider>
  );
};

export default AdminContext;

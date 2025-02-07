import { createContext, useState } from "react";

export const RouteContext = createContext(null);
const AdminContext = ({ children }) => {
  const [showAdminRoutes, setShowAdminRoutes] = useState(
    localStorage.getItem("showAdminRoutes", true)
  );
  return (
    <RouteContext.Provider value={{ showAdminRoutes, setShowAdminRoutes }}>
      {children}
    </RouteContext.Provider>
  );
};

export default AdminContext;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Route from "./Shared/Route";
import { Toaster } from "sonner";
import AuthProviders from "./Shared/AuthProviders";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminContext from "./Pages/AdminDash/AdminContext";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProviders>
          <AdminContext>
            <RouterProvider router={Route} />
          </AdminContext>
        </AuthProviders>
      </HelmetProvider>
    </QueryClientProvider>
    <Toaster
      position="bottom-center"
      duration={2500}
      visibleToasts={3} // Limits the number of visible toasts
      expand={true} // Allows stacking of long messages
    />
  </StrictMode>
);

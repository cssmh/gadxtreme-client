import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);

export default Route;

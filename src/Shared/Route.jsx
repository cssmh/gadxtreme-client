import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Error from "../Component/Error";
import Home from "../Component/Home";
import Category from "../Pages/Category";
import ProductDetails from "../Pages/ProductDetails";
import MyAccount from "../Component/MyAccount";
import Dashboard from "../Component/MyAccount/Dashboard";
import Orders from "../Component/MyAccount/Orders";
import Wishlist from "../Component/MyAccount/Wishlist";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category", element: <Category /> },
      { path: "/details", element: <ProductDetails /> },
      {
        path: "/my-account",
        element: <MyAccount />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "orders", element: <Orders /> },
          { path: "wishlist", element: <Wishlist /> },
        ],
      },
    ],
  },
]);

export default Route;

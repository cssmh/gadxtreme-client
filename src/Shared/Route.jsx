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
import Login from "../Component/Login";
import Register from "../Component/Register";
import Policy from "../Component/Policy";
import AdminDashboard from "../Pages/AdminDash.jsx/AdminDashboard";
import AddProduct from "../Pages/AdminDash.jsx/AddProduct";
import ManageProducts from "../Pages/AdminDash.jsx/ManageProducts";
import UpdateProduct from "../Pages/AdminDash.jsx/UpdateProduct";
import { getGadget } from "../Api/gadgets";
import Cart from "../Component/MyAccount/Cart";
import Checkout from "../Component/MyAccount/Checkout";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/privacy-policy", element: <Policy /> },
      { path: "/category/:cate", element: <Category /> },
      {
        path: "/details/:id",
        element: <ProductDetails />,
        loader: async ({ params }) => await getGadget(params.id),
      },
      {
        path: "/my-account",
        element: <MyAccount />,
        children: [
          { path: "/my-account/dashboard", element: <Dashboard /> },
          { path: "/my-account/wishlist", element: <Wishlist /> },
          { path: "/my-account/orders", element: <Orders /> },
        ],
      },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
        children: [
          { path: "/admin-dashboard/add-product", element: <AddProduct /> },
          {
            path: "/admin-dashboard/manage-products",
            element: <ManageProducts />,
          },
          {
            path: "/admin-dashboard/update-product/:id",
            element: <UpdateProduct />,
            loader: async ({ params }) => await getGadget(params.id),
          },
        ],
      },
    ],
  },
]);

export default Route;

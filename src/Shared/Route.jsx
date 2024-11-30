import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Error from "../Component/Error";
import Home from "../Component/Home";
import Category from "../Pages/Category";
import ProductDetails from "../Pages/ProductDetails";
import Dashboard from "../Component/MyAccount/Dashboard";
import MyOrders from "../Component/MyAccount/MyOrders";
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
import PrivateRoute from "./PrivateRoute";
import Success from "../Component/MyAccount/Success";
import MyProfile from "../Component/MyAccount/MyProfile";
import AllOrdered from "../Pages/AdminDash.jsx/AllOrdered";
import AllUsers from "../Pages/AdminDash.jsx/AllUsers";
import DashLayout from "../Pages/AdminDash.jsx/DashLayout";
import AdminRoute from "./AdminRoute";
import CartProducts from "../Pages/AdminDash.jsx/CartProducts";

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
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => await getGadget(params.id),
      },
      {
        path: "/my-account/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-account/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-account/orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-account/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/success/:tranId",
        element: <Success />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AdminRoute>
            <DashLayout />
          </AdminRoute>
        ),
        children: [
          { path: "/admin-dashboard", element: <AdminDashboard /> },
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
          {
            path: "/admin-dashboard/all-ordered",
            element: <AllOrdered />,
          },
          {
            path: "/admin-dashboard/all-users",
            element: <AllUsers />,
          },
          {
            path: "/admin-dashboard/user-carts",
            element: <CartProducts />,
          },
        ],
      },
    ],
  },
]);

export default Route;

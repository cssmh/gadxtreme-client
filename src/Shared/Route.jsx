import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Error from "../Component/Error";
import Home from "../Component/Home";
import Category from "../Pages/Category";
import ProductDetails from "../Pages/ProductDetails";
import MyOrders from "../Component/MyAccount/MyOrders";
import Wishlist from "../Component/MyAccount/Wishlist";
import Login from "../Component/Login";
import Register from "../Component/Register";
import Policy from "../Component/Policy";
import AddProduct from "../Pages/AdminDash/AddProduct";
import AllProducts from "../Pages/AdminDash/AllProducts";
import UpdateProduct from "../Pages/AdminDash/UpdateProduct";
import { getGadget } from "../Api/gadgets";
import Cart from "../Component/MyAccount/Cart";
import Checkout from "../Component/MyAccount/Checkout";
import PrivateRoute from "./PrivateRoute";
import Success from "../Component/MyAccount/Success";
import MyProfile from "../Component/MyAccount/MyProfile";
import AllOrdered from "../Pages/AdminDash/AllOrdered";
import AllUsers from "../Pages/AdminDash/AllUsers";
import DashLayout from "../Pages/AdminDash/DashLayout";
import AdminRoute from "./AdminRoute";
import CartProducts from "../Pages/AdminDash/CartProducts";
import OrderDetails from "../Component/MyAccount/OrderDetails";
import Dashboard from "../Pages/Dashboard";

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
        path: "/order-details/:id",
        element: (
          <PrivateRoute>
            <OrderDetails />
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
        path: "/dashboard",
        element: (
          <AdminRoute>
            <DashLayout />
          </AdminRoute>
        ),
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          {
            path: "/dashboard/profile",
            element: <MyProfile />,
          },
          {
            path: "/dashboard/wishlist",
            element: <Wishlist />,
          },
          {
            path: "/dashboard/orders",
            element: <MyOrders />,
          },
          { path: "/dashboard/add-product", element: <AddProduct /> },
          {
            path: "/dashboard/all-products",
            element: <AllProducts />,
          },
          {
            path: "/dashboard/update/:id",
            element: <UpdateProduct />,
            loader: async ({ params }) => await getGadget(params.id),
          },
          {
            path: "/dashboard/all-ordered",
            element: <AllOrdered />,
          },
          {
            path: "/dashboard/all-users",
            element: <AllUsers />,
          },
          {
            path: "/dashboard/user-carts",
            element: <CartProducts />,
          },
        ],
      },
    ],
  },
]);

export default Route;

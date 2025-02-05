import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Error from "../Component/Error";
import Home from "../Component/Home";
import Category from "../Pages/Category";
import ProductDetails from "../Pages/ProductDetails";
import MyOrders from "../Pages/UserDash/MyOrders";
import Wishlist from "../Pages/UserDash/Wishlist";
import Login from "../Component/Login";
import Register from "../Component/Register";
import Policy from "../Component/Policy";
import AddProduct from "../Pages/AdminDash/AddProduct";
import AllProducts from "../Pages/AdminDash/AllProducts";
import UpdateProduct from "../Pages/AdminDash/UpdateProduct";
import { getGadget } from "../Api/gadgets";
import Cart from "../Pages/UserDash/Cart";
import Checkout from "../Pages/UserDash/Checkout";
import PrivateRoute from "./PrivateRoute";
import Success from "../Component/Success";
import AllOrdered from "../Pages/AdminDash/AllOrdered";
import AllUsers from "../Pages/AdminDash/AllUsers";
import DashLayout from "../Pages/AdminDash/DashLayout";
import AdminRoute from "./AdminRoute";
import AllCart from "../Pages/AdminDash/AllCart";
import OrderDetails from "../Pages/UserDash/OrderDetails";
import Dashboard from "../Pages/Dashboard";
import MyReviews from "../Pages/UserDash/MyReviews";
import MyProfile from "../Component/MyProfile";
import PayCancel from "../Component/PayCancel";
import PendingReview from "../Pages/UserDash/PendingReview";

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
        path: "/details/:name/:id",
        element: <ProductDetails />,
      },
      {
        path: "/success/:tranId/:id",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <PayCancel />,
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
          <PrivateRoute>
            <DashLayout />
          </PrivateRoute>
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
          {
            path: "/dashboard/order-details/:id",
            element: <OrderDetails />,
          },
          {
            path: "/dashboard/my-reviews",
            element: <MyReviews />,
          },
          {
            path: "/dashboard/pending-reviews",
            element: <PendingReview />,
          },
          {
            path: "/dashboard/add-product",
            element: (
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/all-products",
            element: (
              <AdminRoute>
                <AllProducts />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/update/:id",
            element: (
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            ),
            loader: async ({ params }) => await getGadget(params.id),
          },
          {
            path: "/dashboard/all-ordered",
            element: (
              <AdminRoute>
                <AllOrdered />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/all-users",
            element: (
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/user-carts",
            element: (
              <AdminRoute>
                <AllCart />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default Route;

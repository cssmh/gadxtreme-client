import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MyAccount = () => {
  const { logOut } = useAuth();
  const handleLogOut = () => {
    logOut().then().catch();
  };
  return (
    <div className="flex max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <aside className="w-64 p-6 space-y-4">
        <h2 className="text-2xl font-semibold">My Account</h2>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link to="/my-account/dashboard" className="block py-2 px-4">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/my-account/wishlist" className="block py-2 px-4">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/my-account/orders" className="block py-2 px-4">
                Orders
              </Link>
            </li>
            <li>
              <button onClick={handleLogOut} className="block py-2 px-4">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;

import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa"; // Import the icon for admin dashboard
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin"; // Assuming you have user roles defined in your authentication

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>
        Welcome, <span className="font-semibold">{user?.displayName}</span> to
        your account dashboard!
      </p>

      {/* Conditionally render the Admin Dashboard link if the user is an admin */}
      {!isAdmin && (
        <div className="mt-5">
          <Link
            to="/admin-dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <FaUserShield className="mr-2" /> Admin Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

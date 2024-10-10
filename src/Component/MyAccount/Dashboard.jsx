import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>
        Welcome, <span className="font-semibold">{user?.displayName}</span> to
        your account dashboard!
      </p>
    </div>
  );
};

export default Dashboard;

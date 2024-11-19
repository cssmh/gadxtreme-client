import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(false);
  const { createUser, updateProfileInfo } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(email, password);
      await updateProfileInfo(name);
      toast.success("Registration successful!");
      navigateTo(location?.state || "/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mb-2 md:mb-0">
      <div className="w-full lg:w-1/2 flex items-center justify-center md:py-12 px-4 lg:px-20">
        <div className="w-full max-w-md mt-5 md:mt-0">
          <h2 className="text-2xl font-bold text-gray-700">Register</h2>
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address *
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password *
              </label>
              <input
                id="password"
                type={view ? "password" : "text"}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 top-[22px] right-2 flex items-center cursor-pointer"
                onClick={() => setView(!view)}
              >
                {view ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-4">
              <p>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-500" : "bg-gadBlue"
              } text-white py-2 px-4 rounded-md`}
            >
              {loading ? "Register in..." : "Register"}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block border-l border-gray-300"></div>
      <div className="w-full text-center lg:w-1/2 bg-white flex items-center justify-center py-9 md:py-12 px-4 lg:px-20">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
          <p className="my-4 text-gray-600">
            Please login to your account. If you signed up via social media,
            click on the social media icon to log in again.
          </p>
          <Link
            to="/login"
            className="w-full mt-6 bg-emerald-600 text-white py-2 px-4 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser } = useAuth();
  const [view, setView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 lg:px-20">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-700">Register</h2>
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 relative"
              >
                Password *
              </label>
              <input
                id="password"
                type={view ? "password" : "text"}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-[1px] right-1 cursor-pointer"
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
              className="w-full bg-gadBlue text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block border-l border-gray-300"></div>
      <div className="w-full text-center lg:w-1/2 bg-white flex items-center justify-center py-12 px-4 lg:px-20">
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

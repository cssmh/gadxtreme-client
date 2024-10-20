import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [view, setView] = useState(true);
  const { login, googleLogin, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigateTo(location?.state || "/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful!");
      navigateTo(location?.state || "/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mb-2 md:mb-0">
      <div className="w-full lg:w-1/2 flex items-center justify-center md:py-12 px-4 lg:px-20">
        <div className="w-full max-w-md mt-5 md:mt-0">
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
          <form onSubmit={handleLogin} className="mt-3 md:mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Username or email address *
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
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <Link
                to="#"
                onClick={resetPassword}
                className="text-sm text-indigo-600 hover:underline"
              >
                Lost your password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-gadBlue text-white py-2 px-4 rounded-md"
            >
              Log in
            </button>
          </form>
          <div className="mt-4 text-center text-gray-500">Or login with</div>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full max-w-[200px] bg-[#4285f4] text-white py-2 px-4 rounded-md flex items-center justify-center"
            >
              Google
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block border-l border-gray-300"></div>
      <div className="w-full text-center lg:w-1/2 bg-white flex items-center justify-center py-9 md:py-12 px-4 lg:px-20">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-700">Register</h2>
          <p className="my-4 text-gray-600">
            Registering for this site allows you to access your order status and
            history. Just fill in the fields below, and we’ll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </p>
          <Link
            to="/register"
            className="w-full mt-6 bg-emerald-600 text-white py-2 px-4 rounded-md"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

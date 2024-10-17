import axios from "axios";
// import { clearCookie, userLogout } from "./auth";
import swal from "sweetalert";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("error in interceptor", error);
    if (error.response.status === 401 || error.response.status === 403) {
      swal(
        "Your Session has expired",
        "Please log in again to continue",
        "warning"
      );
      // await clearCookie();
      // await userLogout();
      history.push("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;

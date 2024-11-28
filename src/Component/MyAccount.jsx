import { Outlet } from "react-router-dom";

const MyAccount = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;

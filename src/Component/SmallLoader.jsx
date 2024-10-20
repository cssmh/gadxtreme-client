// import { ScaleLoader } from "react-spinners";
import { CgSpinnerTwo } from "react-icons/cg";

const SmallLoader = ({ size }) => {
  return (
    <div
      style={{ height: `${size}vh` }}
      className="flex justify-center items-center"
    >
      <CgSpinnerTwo className="animate-spin text-4xl text-blue-500" />
      {/* <ScaleLoader size={100} color="red" /> */}
    </div>
  );
};

export default SmallLoader;

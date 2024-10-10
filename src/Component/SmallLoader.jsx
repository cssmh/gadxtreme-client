import { ScaleLoader } from "react-spinners";

const SmallLoader = ({ size }) => {
  return (
    <div
      style={{ height: `${size}vh` }}
      className="flex justify-center items-center"
    >
      <ScaleLoader size={100} color="red" />
    </div>
  );
};

export default SmallLoader;

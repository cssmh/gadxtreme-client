import { ClipLoader } from "react-spinners";

const SmallLoader = ({ size }) => {
  return (
    <div
      style={{ height: `${size}vh` }}
      className="flex justify-center items-center"
    >
      {/* <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div> */}
      <ClipLoader size={45} color="#3b82f6" />
      {/* <ScaleLoader size={100} color="skyblue" /> */}
    </div>
  );
};

export default SmallLoader;

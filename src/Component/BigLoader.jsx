import { ScaleLoader } from "react-spinners";

const BigLoader = () => (
  <div className="w-full min-h-[95vh] flex justify-center items-center">
    <div className="flex flex-col items-center animate-fade-in">
      <ScaleLoader height={50} width={5} size={100} color="skyblue" />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Loading, please wait...
      </p>
    </div>
  </div>
);

export default BigLoader;

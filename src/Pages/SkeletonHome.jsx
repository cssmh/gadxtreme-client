const SkeletonHome = ({ height }) => {
  return (
    <div className="bg-white rounded-lg shadow-md animate-pulse">
      <div
        style={{ height: height }}
        className="skeleton rounded-sm w-full bg-gray-300 rounded-t-lg"
      ></div>
      <div className="p-3 space-y-3">
        <div className="skeleton h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="skeleton h-4 bg-gray-200 rounded w-full"></div>
        <div className="skeleton h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonHome;

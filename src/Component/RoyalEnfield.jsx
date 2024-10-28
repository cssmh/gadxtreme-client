import { Link } from "react-router-dom";
import royalEnfieldImage from "../assets/royal.jpg";

const RoyalEnfield = () => {
  return (
    <div className="container mx-auto mt-8 px-6">
      <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-white to-gray-100 md:flex">
        <div className="md:w-1/2 p-6 flex items-center justify-center">
          <img
            src={royalEnfieldImage}
            alt="Royal Enfield Bike"
            className="w-full h-auto object-cover rounded-md hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Royal Enfield</h2>
          <p className="text-lg font-medium text-gray-600">
            Pre-book the all-new Royal Enfield and experience the thrill of a
            classic ride. Don’t miss out on exclusive launch offers!
          </p>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-800 text-sm px-3 py-2 rounded-md shadow">
              <p>Price: ৳450,000</p>
            </div>
            <div className="bg-red-100 text-red-800 text-sm px-3 py-2 rounded-md shadow">
              <p>Launch Offer: ৳435,000</p>
            </div>
          </div>
          <Link>
            <button className="mt-4 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300 shadow-lg transition duration-300">
              Pre-Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoyalEnfield;

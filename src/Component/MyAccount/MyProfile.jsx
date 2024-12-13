import axios from "axios";
import { useState } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

const MyProfile = () => {
  const { user, updateProfileInfo, logOut } = useAuth();
  const apiKey = import.meta.env.VITE_imgBbKey;
  const defaultImage = import.meta.env.VITE_Default_URL;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.displayName || "anonymous");
  const [profileImage, setProfileImage] = useState(user?.photoURL);
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = async (e) => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      setProfileImage(response.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfileInfo(name, profileImage);
      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetProfileImage = async () => {
    setProfileImage(defaultImage);
    try {
      await updateProfileInfo(name, defaultImage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[96vh]">
      <div className="w-full max-w-3xl bg-orange-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          My Profile
        </h1>
        <form onSubmit={handleNameUpdate}>
          <div className="flex justify-center mb-5">
            <div className="relative">
              <img
                src={profileImage || ""}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-teal-500"
              />
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full cursor-pointer"
              >
                <FaCamera className="text-white" />
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex justify-center mb-3">
            <button
              type="button"
              onClick={resetProfileImage}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
            >
              <FaTrash className="inline mr-2" />
              Remove Picture
            </button>
          </div>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-gray-700 text-lg font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center">
            <button
              type="submit"
              disabled={imageUploading || loading}
              className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            >
              {imageUploading
                ? "Image uploading..."
                : loading
                ? "Updating..."
                : "Update Profile"}
            </button>
            <div className="space-x-1">
              <button
                type="button"
                className="bg-violet-400 text-white px-5 py-2 rounded-lg transition duration-300"
                onClick={() => logOut()}
              >
                LogOut
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => {
                  setName(user?.displayName || "");
                  setProfileImage(user?.photoURL || "");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;

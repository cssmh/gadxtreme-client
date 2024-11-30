import { useState } from "react";
import axios from "axios";
import { CgSpinnerTwo } from "react-icons/cg";
import { postGadget } from "../../Api/gadgets";
import swal from "sweetalert";
import { toast } from "sonner";

const categories = [
  "Earbuds",
  "Smartwatch",
  "Powerbank",
  "Fan",
  "Headphones",
  "Bluetooth Speaker",
  "Wired Earphone",
  "Wireless Earphone",
  "Charging Accessories",
  "Converters & Hub",
  "Laptop",
  "Smart TV",
  "Lifestyle",
];

const apiKey = import.meta.env.VITE_imgBbKey;

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    images: [],
    discountPrice: "",
    inStock: true,
    keyFeatures: [],
    category: "",
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [activeBox, setActiveBox] = useState(null);
  const [keyFeatures, setKeyFeatures] = useState(["", "", "", ""]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (activeBox !== null && file) {
      const updatedImages = [...selectedImages];
      updatedImages[activeBox] = file;
      setSelectedImages(updatedImages);
    }
  };

  const handleBoxClick = (index) => {
    setActiveBox(index);
    document.getElementById("imageUploadInput").click();
  };

  const handleKeyFeatureChange = (index, value) => {
    const updatedFeatures = [...keyFeatures];
    updatedFeatures[index] = value;
    setKeyFeatures(updatedFeatures);
  };

  const uploadImageToImgBB = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return res.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedImages.every((img) => img === null)) {
        toast.error("Please upload at least one image.");
        return;
      }
      const uploadedImages = [];
      for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i]) {
          const imageUrl = await uploadImageToImgBB(selectedImages[i]);
          if (imageUrl) {
            uploadedImages.push(imageUrl);
          }
        }
      }

      const formattedKeyFeatures = keyFeatures
        .filter((feature) => feature.trim() !== "")
        .flatMap((feature) => feature.split(",").map((f) => f.trim()));

      const updatedFormData = {
        ...formData,
        images: uploadedImages,
        keyFeatures: formattedKeyFeatures,
      };

      await postGadget(updatedFormData);
      setFormData({
        productName: "",
        price: "",
        discountPrice: "",
        inStock: true,
        category: "",
        description: "",
        images: [],
        keyFeatures: [],
      });
      setSelectedImages([null, null, null, null]);
      setKeyFeatures(["", "", "", ""]);
      swal({
        title: "Thank you",
        text: "Gadget added successfully",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-white p-8">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Add a Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="productName"
          >
            Product Name:
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="category"
          >
            Category:
          </label>
          <select
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="price"
            >
              Price (৳):
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="discountPrice"
            >
              Discount Price (৳):
            </label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              value={formData.discountPrice}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 p-4">
          <label
            className="label text-gray-700 font-semibold"
            htmlFor="inStock"
          >
            <span className="label-text">In Stock:</span>
          </label>
          <input
            type="checkbox"
            name="inStock"
            id="inStock"
            checked={formData.inStock}
            onChange={handleInputChange}
            className="toggle toggle-accent"
          />
          <span
            className={`text-gray-700 font-semibold ${
              formData.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {formData.inStock ? "Available" : "Out of Stock"}
          </span>
        </div>
        <div className="col-span-2 space-y-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="keyFeatures"
          >
            Key Features (comma separated):
          </label>
          <div className="flex space-x-2">
            {[0, 1].map((index) => (
              <input
                key={index}
                type="text"
                value={keyFeatures[index]}
                onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Key feature"
              />
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="images"
          >
            Product Images (Max 4):
          </label>
          <input
            type="file"
            id="imageUploadInput"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className="md:w-1/2 grid grid-cols-4 mt-4">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="w-24 h-20 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer focus:border-blue-300 transition-all duration-300"
                onClick={() => handleBoxClick(index)}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`product-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex text-sm items-center justify-center text-gray-500">
                    <span>+ Upload</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-semibold" htmlFor="description">
            Product Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded-lg outline-none focus:border-blue-300"
            required
          ></textarea>
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-800" : "bg-teal-500"
            } text-white py-2 rounded-md`}
          >
            <div className="flex justify-center items-center py-[2px]">
              {loading ? (
                <p className="flex items-center">
                  Submitting.. <CgSpinnerTwo className="animate-spin text-lg" />
                </p>
              ) : (
                "Add Product"
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

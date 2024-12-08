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
      if (
        formData.discountPrice &&
        +formData.discountPrice >= +formData.price
      ) {
        toast.error("Discount price must be lower than the original price.");
        setLoading(false);
        return;
      }

      if (selectedImages.every((img) => img === null)) {
        toast.error("Please upload at least one image.");
        setLoading(false);
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
    <div className="bg-white p-4 md:p-8">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Add a Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col lg:flex-row gap-2 md:gap-4">
          <div className="lg:w-1/2">
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
              required
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="lg:w-1/2">
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
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="w-full lg:w-1/3">
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
          <div className="w-full lg:w-1/3">
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
          <div className="flex items-center justify-center gap-4 p-4">
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
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <label className="text-gray-700 font-semibold">
            Key Features (comma separated):
          </label>
          <div className="flex flex-col md:flex-row gap-2">
            {[0, 1].map((index) => (
              <input
                key={index}
                type="text"
                value={keyFeatures[index]}
                onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Key features"
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
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
          <div className="flex gap-2 flex-wrap">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="w-20 lg:w-36 h-16 lg:h-28 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer focus:border-blue-300 transition-all duration-300"
                onClick={() => handleBoxClick(index)}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`product-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex text-sm items-center justify-center text-gray-500 pr-2">
                    <span>+ Upload</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
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
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 ${
            loading ? "bg-gray-800" : "bg-teal-500"
          } text-white py-2 rounded-md`}
        >
          <div className="flex justify-center items-center">
            {loading ? (
              <p className="flex items-center">
                Submitting.. <CgSpinnerTwo className="animate-spin text-lg" />
              </p>
            ) : (
              "Add Product"
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

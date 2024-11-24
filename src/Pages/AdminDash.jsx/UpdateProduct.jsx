import { useState } from "react";
import axios from "axios";
import { CgSpinnerTwo } from "react-icons/cg";
import { updateGadget } from "../../Api/gadgets";
import swal from "sweetalert";
import { useLoaderData, useNavigate } from "react-router-dom";

const categories = [
  "Earbuds",
  "Smartwatch",
  "Powerbank",
  "Fan",
  "Headphones",
  "Bluetooth Speaker",
  "Bluetooth Earphone",
  "Wired Earphone",
  "Charging Accessories",
  "Converters & Hub",
  "Laptop",
  "Smart TV",
  "Lifestyle",
];

const apiKey = import.meta.env.VITE_imgBbKey;

const UpdateProduct = () => {
  const productData = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: productData.productName || "",
    price: productData.price || "",
    discountPrice: productData.discountPrice || "",
    inStock: productData.inStock,
    category: productData.category || "",
    description: productData.description || "",
    images: productData.images || [],
    keyFeatures: productData.keyFeatures || [],
  });

  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [activeBox, setActiveBox] = useState(null);
  const [keyFeatures, setKeyFeatures] = useState(
    productData.keyFeatures || ["", "", "", ""]
  );
  console.log(keyFeatures);

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

  const handleKeyFeatureChange = (e) => {
    const { value } = e.target;
    const updatedFeatures = value.split(",").map((feature) => feature.trim());
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
      console.log("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedImages = [...formData.images];

      for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i]) {
          const imageUrl = await uploadImageToImgBB(selectedImages[i]);
          if (imageUrl) {
            updatedImages[i] = imageUrl;
          }
        }
      }

      const formattedKeyFeatures = keyFeatures
        .filter((feature) => feature.trim() !== "")
        .flatMap((feature) => feature.split(",").map((f) => f.trim()));

      const updatedFormData = {
        ...formData,
        images: updatedImages,
        keyFeatures: formattedKeyFeatures,
      };

      await updateGadget(productData._id, updatedFormData);
      swal({
        title: "Success",
        text: "Product updated successfully",
        icon: "success",
        timer: 2000,
      });
      navigate(-1);
    } catch (error) {
      console.log("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Update Product
      </h1>
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
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
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
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
            required
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
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
              required
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
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 outline-none"
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
        <div className="col-span-2">
          <label className="block mb-1 font-semibold" htmlFor="keyFeatures">
            Key Features (use comma-separated):
          </label>
          <input
            type="text"
            name="keyFeatures"
            id="keyFeatures"
            value={keyFeatures.join(", ")}
            onChange={handleKeyFeatureChange}
            className="w-full mb-2 p-2 border rounded-md outline-none focus:border-blue-300"
            placeholder="Enter key features separated by commas"
          />
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
                className="w-full h-32 bg-gray-100 border border-dashed rounded-lg flex justify-center items-center cursor-pointer"
                onClick={() => handleBoxClick(index)}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={productData.images[index]}
                    alt={`Product Image ${index}`}
                    className="object-cover w-full h-full"
                  />
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
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md outline-none focus:border-blue-300"
          ></textarea>
        </div>
        <div className="col-span-2 flex justify-end mt-3">
          <button
            type="submit"
            className="bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 px-3 py-2"
            disabled={loading}
          >
            {loading ? (
              <p className="flex items-center gap-1">
                <CgSpinnerTwo className="animate-spin text-xl" />{" "}
                <span>Updating</span>
              </p>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;

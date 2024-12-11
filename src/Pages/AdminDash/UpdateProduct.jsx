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
  "Best Seller",
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

    if (formData.discountPrice && formData.discountPrice > formData.price) {
      swal({
        title: "Error",
        text: "Discount Price cannot be greater than Price!",
        icon: "error",
        timer: 2000,
      });
      setLoading(false);
      return;
    }

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
    <div className="bg-white p-4 md:p-8">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Update Product</h1>
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
                className="w-20 lg:w-36 h-16 lg:h-28 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer focus:border-blue-300 transition-all duration-300"
                onClick={() => handleBoxClick(index)}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`product-${index}`}
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
            rows="6"
            className="w-full p-2 border rounded-md outline-none focus:border-blue-300"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 ${
            loading ? "bg-gray-800" : "bg-teal-500"
          } text-white py-2 rounded-md`}
        >
          <div className="flex justify-center items-center py-[2px]">
            {loading ? (
              <p className="flex items-center">
                Updating.. <CgSpinnerTwo className="animate-spin text-lg" />
              </p>
            ) : (
              "Update Product"
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

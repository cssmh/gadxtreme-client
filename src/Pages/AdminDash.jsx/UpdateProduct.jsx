import { useState } from "react";
import axios from "axios";
import { CgSpinnerTwo } from "react-icons/cg";
import { updateGadget } from "../../Api/gadgets";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

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

const defaultImageUrl = "https://your-default-image-url.com/default-image.jpg"; // Set your default image URL here

const UpdateProduct = () => {
  const productData = useLoaderData(); // Get product data from the loader
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: productData.productName || "",
    price: productData.price || "",
    discountPrice: productData.discountPrice || "",
    inStock: productData.inStock || true,
    category: productData.category || "",
    description: productData.description || "",
    images: productData.images || [], // Assuming the product has an images field
    keyFeatures: productData.keyFeatures || [], // Assuming the product has keyFeatures
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
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      // Prepare updated form data
      const updatedFormData = {
        ...formData,
        images: uploadedImages.length > 0 ? uploadedImages : productData.images,
        keyFeatures: formattedKeyFeatures,
      };

      // Check if both existing images and new uploads are empty, if so, set a default image
      if (updatedFormData.images.length === 0) {
        updatedFormData.images = [defaultImageUrl]; // Set the default image if none available
      }

      // Update the product using your API
      const res = await updateGadget(productData._id, updatedFormData);
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Gadget updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-normal mb-2 md:mb-4">Update Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
      >
        {/* Input fields similar to AddProduct */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="productName">
            Product Name:
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md outline-none focus:border-blue-300"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="price">
            Price (৳):
          </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md outline-none focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="discountPrice">
            Discount Price (৳):
          </label>
          <input
            type="number"
            name="discountPrice"
            id="discountPrice"
            value={formData.discountPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md outline-none focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="inStock">
            In Stock:
          </label>
          <input
            type="checkbox"
            name="inStock"
            id="inStock"
            checked={formData.inStock}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span>{formData.inStock ? "Available" : "Out of Stock"}</span>
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="category">
            Category:
          </label>
          <select
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md outline-none focus:border-blue-300"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-semibold" htmlFor="keyFeatures">
            Key Features (use comma-separated):
          </label>
          {[0, 1].map((index) => (
            <input
              key={index}
              type="text"
              value={keyFeatures[index]}
              onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
              className="w-full mb-2 p-2 border rounded-md outline-none focus:border-blue-300"
              placeholder="Key features"
            />
          ))}
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-semibold" htmlFor="images">
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
                className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer focus:border-blue-300"
                onClick={() => handleBoxClick(index)}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={productData.images[index] || defaultImageUrl}
                    alt={`Product Image ${index}`}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? (
              <CgSpinnerTwo className="animate-spin inline-block" />
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
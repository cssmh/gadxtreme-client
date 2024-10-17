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

const defaultImageUrl = "https://your-default-image-url.com/default-image.jpg"; // Set your default image URL here

const UpdateProduct = () => {
  const productData = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      const updatedImages = [...formData.images]; // Start with the existing images

      // Loop through the selectedImages array to check for new uploads
      for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i]) {
          // If a new image is uploaded, upload it to ImgBB and update the corresponding index
          const imageUrl = await uploadImageToImgBB(selectedImages[i]);
          if (imageUrl) {
            updatedImages[i] = imageUrl; // Replace the image at index i with the new one
          }
        }
      }

      // Format key features to remove empty values and split if needed
      const formattedKeyFeatures = keyFeatures
        .filter((feature) => feature.trim() !== "")
        .flatMap((feature) => feature.split(",").map((f) => f.trim()));

      // Prepare the updated form data
      const updatedFormData = {
        ...formData,
        images: updatedImages, // Use the updatedImages array
        keyFeatures: formattedKeyFeatures,
      };

      // Check if both existing images and new uploads are empty, if so, set a default image
      if (updatedFormData.images.length === 0) {
        updatedFormData.images = [defaultImageUrl]; // Set the default image if none are available
      }

      // Update the product using your API
      await updateGadget(productData._id, updatedFormData);
      navigate(-1);
      swal({
        title: "Good job",
        text: "Gadget updated successfully",
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
          {keyFeatures?.map((feature, index) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
              className="w-full mb-2 p-2 border rounded-md outline-none focus:border-blue-300"
              placeholder="Key feature"
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
            required
          />
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

import { useState } from "react";
import axios from "axios";
import { CgSpinnerTwo } from "react-icons/cg";

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

const apiKey = import.meta.env.VITE_imgBbKey; // imgbb key

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    discountPrice: "",
    inStock: true,
    category: "",
    description: "",
    images: [], // store image URLs to be sent to DB
  });

  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null,
  ]); // For preview (max 4 images)
  const [activeBox, setActiveBox] = useState(null); // Track which box is active for image selection

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image selection for a specific box
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get selected file
    if (activeBox !== null && file) {
      const updatedImages = [...selectedImages];
      updatedImages[activeBox] = file; // Set the image in the correct box
      setSelectedImages(updatedImages);
    }
  };

  // Function to trigger image selection when a box is clicked
  const handleBoxClick = (index) => {
    setActiveBox(index); // Set the active box index
    document.getElementById("imageUploadInput").click(); // Trigger the hidden input field
  };

  // Upload image to imgbb
  const uploadImageToImgBB = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return response.data.data.url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    setLoading(true);

    try {
      // Validation: Make sure at least one image is uploaded
      if (selectedImages.every((img) => img === null)) {
        alert("Please upload at least one image.");
        return;
      }

      // Upload each image to imgbb and collect URLs
      const uploadedImages = [];
      for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i]) {
          const imageUrl = await uploadImageToImgBB(selectedImages[i]);
          if (imageUrl) {
            uploadedImages.push(imageUrl);
          }
        }
      }

      // Update the form data with the image URLs
      const updatedFormData = {
        ...formData,
        images: uploadedImages,
      };

      // Process the form data here (e.g., send to the server)
      console.log(updatedFormData); // Example: output to console for backend handling
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Stop loading after form submission process is complete
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl md:text-2xl font-normal mb-2 md:mb-4">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"
      >
        {/* Product Name */}
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
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="price">
            Price (৳):
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Discount Price */}
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
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Stock Status */}
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

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="category">
            Category:
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
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

        {/* Image Upload & Preview */}
        <div className="col-span-2">
          <label className="block mb-1 font-semibold" htmlFor="images">
            Product Images (Max 4):
          </label>

          {/* Hidden file input to trigger by clicking the image boxes */}
          <input
            type="file"
            id="imageUploadInput"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />

          {/* Image Preview Boxes */}
          <div className="w-1/2 grid grid-cols-4 mt-4">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                onClick={() => handleBoxClick(index)}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-center">
                    Click to Upload
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block mb-1 font-semibold" htmlFor="description">
            Product Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="5"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-800" : "bg-gadBlue"
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

import { useState } from "react";
import axios from "axios";
import { CgSpinnerTwo } from "react-icons/cg";
import { postGadget } from "../../Api/gadgets";
import Swal from "sweetalert2";

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
    keyFeatures: [], // store key features as an array
  });

  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null,
  ]); // For preview (max 4 images)
  const [activeBox, setActiveBox] = useState(null); // Track which box is active for image selection

  // State for key features input boxes
  const [keyFeatures, setKeyFeatures] = useState(["", "", "", ""]);

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
    document.getElementById("imageUploadInput").click();
    // Trigger the hidden input field
  };

  // Handle key features input change
  const handleKeyFeatureChange = (index, value) => {
    const updatedFeatures = [...keyFeatures];
    updatedFeatures[index] = value;
    setKeyFeatures(updatedFeatures);
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
    e.preventDefault();
    setLoading(true);

    try {
      // Validation: Make sure at least one image is uploaded
      if (selectedImages.every((img) => img === null)) {
        alert("Please upload at least one image.");
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

      // Combine the key features into an array by splitting them by commas
      const formattedKeyFeatures = keyFeatures
        .filter((feature) => feature.trim() !== "")
        .flatMap((feature) => feature.split(",").map((f) => f.trim()));

      const updatedFormData = {
        ...formData,
        images: uploadedImages,
        keyFeatures: formattedKeyFeatures,
      };

      const res = await postGadget(updatedFormData);
      console.log(res);
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
      Swal.fire({
        icon: "success",
        title: "Gadget added successfully",
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
      <h1 className="text-xl font-normal mb-2 md:mb-4">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5"
      >
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
              className="w-full mb-2 p-2 border rounded-md"
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
                className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                onClick={() => handleBoxClick(index)}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full"
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
          ></textarea>
        </div>

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

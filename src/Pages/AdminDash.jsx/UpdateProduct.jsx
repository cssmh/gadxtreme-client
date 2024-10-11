import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const productData = useLoaderData();
  const navigate = useNavigate();

  // State for product details
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    discountPrice: "",
    inStock: false,
    category: "",
  });

  // Load product data into state
  useEffect(() => {
    if (productData) {
      setProduct({
        productName: productData.productName,
        price: productData.price,
        discountPrice: productData.discountPrice || "", // Handle null or undefined
        inStock: productData.inStock,
        category: productData.category,
      });
    }
  }, [productData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update product data
      await axios.patch(`/api/products/${productData.id}`, product);
      // Redirect to manage products or any desired page
      navigate("/manage-products");
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally, handle error (e.g., show notification)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            Product Name:
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Price (৳):
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Discount Price (৳):
            <input
              type="number"
              name="discountPrice"
              value={product.discountPrice}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            In Stock:
            <input
              type="checkbox"
              name="inStock"
              checked={product.inStock}
              onChange={handleChange}
              className="ml-2"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Category:
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

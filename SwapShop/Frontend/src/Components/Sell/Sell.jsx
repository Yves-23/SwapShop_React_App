import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import api from "../api/api";
import {useNavigate} from "react-router-dom";
import { FiXCircle } from "react-icons/fi"; // Import the red cross icon

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State for error message

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Allows multiple file uploads
    setImages([...images, ...files]);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...filePreviews]);
  };

  // Delete a specific image
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  // Update price
  const handleCurrencyChange = (value) => {
    setFormData({ ...formData, price: value });
  };

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append form data fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);

    // Append images
    images.forEach((image) => {
        formDataToSend.append('image', image); // Ensure correct field name
    });

    try {
        // Include token if authentication is needed
        const token = localStorage.getItem('token'); // Or get from context
        const headers = {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await api.post('/items', formDataToSend, { headers });
        console.log('Item posted successfully:', response.data);
        alert('Your item has been posted successfully!');
        navigate("/"); // Redirect to home page on success


        // Reset the form
        setFormData({
            title: '',
            description: '',
            price: '',
            category: '',
            image: '',
        });
        setImages([]);
        setPreviews([]);
        setError(""); // Clear the error state
    } catch (error) {
      console.error("Error posting item: ", error);
      setError("Failed to post your item. Please Login and try again.");
    }
};


  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100 dark:bg-gray-800 pb-8">
    <div className="w-full max-w-md pb-6 dark:bg-gray-800">
    {/* Error Alert */}
    {error && (
        <div className="flex items-center gap-4 mt-6 max-w-lg mx-auto bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg">
          <FiXCircle size={24} /> {/* Red Cross Icon */}
          <span>{error}</span>
        </div>
      )}
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-lg mx-auto mt-12 dark:text-white"
    >
      <h2 className="text-2xl font-bold text-center dark:text-primary">
        Sell Your Item
      </h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block font-semibold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter item title"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-semibold mb-2">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter item description"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block font-semibold mb-2">
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home_furniture">Home & Furniture</option>
          <option value="books">Books</option>
          <option value="vehicles">Vehicles</option>
          <option value="sports">Sports Equipment</option>
          <option value="toys_games">Toys & Games</option>
          <option value="health_beauty">Health & Beauty</option>
          <option value="pets">Pets</option>
          <option value="musical_instruments">Musical Instruments</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block font-semibold mb-2">
          Price:
        </label>
        <CurrencyInput
          id="price"
          name="price"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
          placeholder="Enter item price"
          value={formData.price}
          decimalsLimit={2}
          onValueChange={handleCurrencyChange}
          prefix="RWF "
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block font-semibold mb-2">
          Upload Images:
        </label>
        <input
          type="file"
          id="image"
          name="images"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
          multiple
          required
        />
        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded-md shadow hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-secondary hover:bg-primary hover:text-black text-white py-2 px-4 rounded-md focus:outline-none 
              focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-150 font-bold"
        >
          Post Item
        </button>
      </div>
    </form>
    {/* Error Alert */}
    {error && (
        <div className="flex items-center gap-4 mt-6 max-w-lg mx-auto bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg">
          <FiXCircle size={24} /> {/* Red Cross Icon */}
          <span>{error}</span>
        </div>
      )}
    </div>
    </div>
  );
};

export default Sell;

import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCurrencyChange = (value) => {
    setFormData({ ...formData, price: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
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
          <option value="home">Home & Furniture</option>
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
          Upload Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
          required
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-full h-48 object-cover rounded-md shadow-md"
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-primary text-white dark:bg-secondary py-2 px-6 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-transform"
        >
          Post Item
        </button>
      </div>
    </form>
  );
};

export default Sell;

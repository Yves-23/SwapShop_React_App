import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    whatsappNumber: "",
    phoneNumber: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();
  const [formError, setFormError] = useState(""); // General form error
  const [imageError, setImageError] = useState(""); // Error specifically for images

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Add uploaded images to the current state
    setImages((prevImages) => [...prevImages, ...files]);

    // Generate previews for the images
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  const handleCurrencyChange = (value) => {
    setFormData({ ...formData, price: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if at least 2 images are uploaded
    if (images.length < 2) {
      setImageError("Please upload at least two images.");
      return;
    }
    setImageError("");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("whatsappNumber", formData.whatsappNumber);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    images.forEach((image) => formDataToSend.append("images", image));

    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await api.post("/items", formDataToSend, { headers });
      alert("Your item has been posted successfully!", response.data);
      navigate("/");

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        whatsappNumber: "",
        phoneNumber: "",
      });
      setImages([]);
      setPreviews([]);
      setFormError("");
    } catch (error) {
      console.error("Error posting item: ", error);
      setFormError("Failed to post your item. Please Login and try again.");
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100 dark:bg-gray-800 pb-8">
      <div className="w-full max-w-md pb-6 dark:bg-gray-800">
        {formError && (
          <div className="flex items-center gap-4 mt-6 max-w-lg mx-auto bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg">
            <FiXCircle size={24} />
            <span>{formError}</span>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-lg mx-auto mt-12 dark:text-white"
        >
          <h2 className="text-2xl font-bold text-center dark:text-primary">
            Sell Your Item
          </h2>

          {["title", "phoneNumber", "whatsappNumber", "location", "description"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block font-semibold mb-2 capitalize">
                {field.replace(/([a-z])([A-Z])/g, "$1 $2")}:
              </label>
              <input
                type={field === "description" ? "textarea" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
              />
            </div>
          ))}

          <div>
            <label htmlFor="price" className="block font-semibold mb-2">
              Price:
            </label>
            <CurrencyInput
              id="price"
              name="price"
              value={formData.price}
              onValueChange={handleCurrencyChange}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
              placeholder="Enter item price"
              decimalsLimit={2}
              prefix="RWF "
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block font-semibold mb-2">
              Upload Images:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-800 dark:text-white"
              multiple
            />
            {imageError && (
              <div className="text-red-500 text-sm mt-2">{imageError}</div>
            )}
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
                      className="absolute top-0 right-0 bg-red-600 text-white py-1 px-1 rounded-full shadow hover:bg-red-700"
                    >
                      <MdClose size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-primary hover:text-black text-white py-2 px-4 rounded-md"
          >
            Post Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;

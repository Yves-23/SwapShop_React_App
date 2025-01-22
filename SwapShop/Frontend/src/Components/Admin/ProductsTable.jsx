import React, { useEffect, useState, useCallback } from "react";
import api from "../api/api";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/items");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null); // Close the modal
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="mb-4 text-lg text-gray-700">
        Total Products: <span className="font-semibold">{products.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="even:bg-gray-50">
                <td className="px-4 py-2 border">{product.title}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">{product.location}</td>
                <td className="px-4 py-2 border text-center">
                  <img
                    src={`http://localhost:5000${product.images[0]}`} // Show the first image or placeholder
                    alt={product.title}
                    className="h-12 w-12 object-cover cursor-pointer"
                    onClick={() => setSelectedImage(product.images)} // Pass the array of images to the modal
                  />
                </td>
                <td className="px-4 py-2 border text-center">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative p-4 bg-white rounded-md shadow-lg max-w-2xl mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-200 text-black rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-300"
            >
              ✕
            </button>
            <div className="flex gap-2 overflow-x-auto">
            {selectedImage.map((img, idx) => (
                <img
                    key={idx}
                    src={`http://localhost:5000${img}`} // Prepend the base URL
                    alt={`Product ${idx + 1}`}
                    className="max-h-[80vh] max-w-full object-contain cursor-pointer"
                />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

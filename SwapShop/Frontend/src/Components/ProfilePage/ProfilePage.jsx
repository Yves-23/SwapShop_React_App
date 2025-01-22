import React, { useState, useEffect, useContext } from "react";
import api from "../api/api";
import AuthContext from "../../Context/AuthContext";
import { formatDistanceToNowStrict } from "date-fns";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [userItems, setUserItems] = useState([]);
  

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await api.get(`/items?postedBy=${user?._id}`);
        setUserItems(response.data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };
  
    if (user?._id) fetchUserItems();
  }, [user?._id]); // Ensure to access `user._id` safely
  

  return (
    <div className="profile-page bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome, {user.username}
        </h1>
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">User Details</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Your Posted Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userItems.length > 0 ? (
            userItems.map((item) => (
              <div
                key={item._id}
                className="item-card bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden"
              >
                    {/* <img
                    src={`http://localhost:5000${item.images[0]}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    /> */}
                    {/* Image Section */}
                    <ImageCarousel images={item.images} />

                    <div className="p-4 flex flex-col h-40 justify-between">
                        <div>
                            <h2
                            className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate"
                            title={item.title}
                            >
                            {item.title}
                            </h2>
                            <span className="text-md font-bold text-orange-500 block my-2">
                            RWF {Number(item.price).toLocaleString()}
                            </span>
                            {/* <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <FaMapMarkerAlt className="text-orange-500 mr-2" />
                            {item.location}
                            </div> */}
                            {/* Time Since Posted */}
                            <div className="text-xs text-gray-500 mt-1">
                            You posted {formatDistanceToNowStrict(new Date(item.createdAt), { addSuffix: true })}
                            </div>
                        </div>
                    </div>
              </div>
            ))
          ) : (
            <p>No items posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-container relative overflow-hidden">
      {images.length > 0 && (
        <img
          src={`http://localhost:5000${images[currentIndex]}`}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-48 object-cover dark:bg-white"
        />
      )}
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};


export default ProfilePage;

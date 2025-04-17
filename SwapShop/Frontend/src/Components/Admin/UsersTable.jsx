import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/users"); // Assuming you have this endpoint
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    const token = localStorage.getItem("adminToken");
    console.log("Retrieved token:", token); // Debugging step
  
    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }
  
    try {
      const response = await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Delete response:", response);
  
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== id));
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete the user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error.response || error);
      alert(`Error: ${error.response?.data?.message || "Failed to delete user."}`);
    }
  };  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <div className="mb-4 text-lg text-gray-700">
        Total Users: <span className="font-semibold">{users.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Telephone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="even:bg-gray-50">
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.phoneNumber}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border text-center">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

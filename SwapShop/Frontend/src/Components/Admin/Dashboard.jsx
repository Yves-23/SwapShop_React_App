import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../api/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ProductsTable from "./ProductsTable";
import UsersTable from "./UsersTable";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [menu, setMenu] = useState("Overview");
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0 });
  const [chartData, setChartData] = useState({ productsByMonth: [], usersByMonth: [] });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to fetch stats. Please try again later.");
      }
    };

    const fetchChartData = async () => {
      try {
        const res = await api.get("/admin/chart-data");
        const { productsByMonth, usersByMonth } = res.data;

        // Ensure data is in the correct format
        const formattedProducts = Array(12).fill(0); // Initialize an array for 12 months
        const formattedUsers = Array(12).fill(0);

        productsByMonth.forEach((item) => {
          formattedProducts[item._id - 1] = item.count; // Map data to the correct month index
        });

        usersByMonth.forEach((item) => {
          formattedUsers[item._id - 1] = item.count; // Map data to the correct month index
        });

        setChartData({
          productsByMonth: formattedProducts,
          usersByMonth: formattedUsers,
        });
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Failed to fetch chart data. Please try again later.");
      }
    };

    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    } else {
      fetchStats();
      fetchChartData();
    }
  }, [navigate]);

  const productsChartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Items Posted",
        data: chartData.productsByMonth,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const usersChartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Users Registered",
        data: chartData.usersByMonth,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: "Month" },
      },
      y: {
        title: { display: true, text: "Count" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar onMenuSelect={setMenu} />
      <main className="flex-1 p-6">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {menu === "Overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Total Products</h3>
                <p className="text-2xl font-semibold text-green-600">{stats.totalProducts}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Total Users</h3>
                <p className="text-2xl font-semibold text-green-600">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-medium mb-4">Items Posted Per Month</h3>
                <Bar data={productsChartData} options={chartOptions} />
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-medium mb-4">Users Registered Per Month</h3>
                <Bar data={usersChartData} options={chartOptions} />
              </div>
            </div>
          </>
        )}
        {menu === "Products" && <ProductsTable />}
        {menu === "Users" && <UsersTable />}
      </main>
    </div>
  );
}
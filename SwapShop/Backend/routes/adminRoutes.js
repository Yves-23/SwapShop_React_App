const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const User = require("../models/User"); // Assuming you have a User model
const Item = require("../models/Item"); // Assuming you have an Item model
const jwt = require("jsonwebtoken");
const authMiddlewareAdmin = require("../middleware/authMiddlewareAdmin");

// Admin Login
router.post("/login", async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, phone });
    if (!admin) {
      return res.status(400).json({ message: "Invalid Email or Phone" });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const adminToken = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ adminToken, isAdmin: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Dashboard Route
router.get("/dashboard", authMiddlewareAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Stats Route
router.get("/stats", authMiddlewareAdmin, async (req, res) => {
  try {
    const totalProducts = await Item.countDocuments();
    const totalUsers = await User.countDocuments();
    res.json({ totalProducts, totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Chart Data Route
router.get("/chart-data", authMiddlewareAdmin, async (req, res) => {
  try {
    // Fetch products grouped by month
    const productsByMonth = await Item.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          count: { $sum: 1 }, // Count items in each group
        },
      },
      { $sort: { _id: 1 } }, // Sort by month (1 = January, 2 = February, etc.)
    ]);

    // Fetch users grouped by month
    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          count: { $sum: 1 }, // Count users in each group
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);

    // Send the response
    res.json({ productsByMonth, usersByMonth });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');

const router = express.Router();

// Endpoint to get total products and total users
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Item.countDocuments();
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalProducts, totalUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// Endpoint for bar chart data
router.get('/chart-data', async (req, res) => {
  try {
    const productsByMonth = await Item.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ productsByMonth, usersByMonth });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart data', error: error.message });
  }
});

module.exports = router;

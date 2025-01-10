// routes/itemRoutes.js
const express = require('express');
const multer = require('multer');
const Item = require('../models/Item');
const protect = require('../middleware/authMiddleware'); // Import middleware

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directory to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// POST route to upload an item with multiple images
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, location, whatsappNumber, phoneNumber } = req.body;

    // Map over the uploaded files to get their paths
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    if (!title || !description || !price || !location || !whatsappNumber || !phoneNumber || imagePaths.length < 2) {
      return res.status(400).json({ message: 'All fields are required, including at least 2 images' });
    }

    const newItem = new Item({
      title,
      description,
      price,
      location,
      whatsappNumber,
      phoneNumber,
      images: imagePaths, // Save array of image paths
      postedBy: req.user._id,
    });

    // Save the item to the database
    await newItem.save();
    res.status(201).json({ message: 'Item posted successfully!', item: newItem });
  } catch (error) {
    console.error('Error during posting:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET route to retrieve all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;

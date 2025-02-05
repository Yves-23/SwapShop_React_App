// routes/itemRoutes.js
const express = require('express');
const multer = require('multer');
const Item = require('../models/Item');
const protect = require('../middleware/authMiddleware'); // Import middleware
const authMiddlewareAdmin = require('../middleware/authMiddlewareAdmin'); // For admin authentication

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
    const { postedBy } = req.query;
    const items = postedBy
      ? await Item.find({ postedBy })
      : await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// DELETE route to remove an item
router.delete('/:id',authMiddlewareAdmin, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the user is an admin or the owner of the item
    if (req.user.isAdmin || item.postedBy.toString() === req.user._id.toString()) {
      await item.deleteOne();
      return res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }
  } catch (error) {
    console.error('Error deleting item:', error.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});


module.exports = router;

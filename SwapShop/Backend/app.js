const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import the path module
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Item = require('./models/Item'); // Import your Item model

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the SwapShop backend!');
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/items', async (req, res) => {
  try {
    const { postedBy } = req.query; // Extract postedBy from query
    const items = postedBy
      ? await Item.find({ postedBy }) // If postedBy exists, filter by it
      : await Item.find();           // Otherwise, return all items
    res.status(200).json(items);     // Send filtered or all items
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});



// Centralized error handling
app.use((err, req, res, next) => {
  console.error('An error occurred:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Exit process on unhandled promise rejection
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to match your folder structure
const jwt = require('jsonwebtoken');
const protect = require('../middleware/authMiddleware');
const authMiddlewareAdmin = require('../middleware/authMiddlewareAdmin');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const sendEmail = require('../utils/sendEmail'); 
const { requestPasswordReset, resetPassword } = require('../controllers/userController');


const router = express.Router();

// Route to view user profile
router.route('/profile').get(protect, getUserProfile);

// Route to update user profile
router.route('/profile').put(protect, updateUserProfile);

router.post('/forgot-password', requestPasswordReset); // Endpoint to request reset link
router.post('/reset-password/:token', resetPassword); // Endpoint to reset password using token


// User registration route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;

        // Validate required fields
        if (!username || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'user is already registered' });
        }

        // Hash the password
        // const saltRounds = 10;
        // const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            username,
            phoneNumber,
            email,
            password,
            // : hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res.status(400).json({ message: 'Both phone number and password are required.' });
        }

        const user = await User.findOne({ phoneNumber});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, phoneNumber: user.phoneNumber },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                phoneNumber: user.phoneNumber,
            },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Protected route for viewing the user profile
router.get('/profile', protect, (req, res) => {
    res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
    });
});

router.post('/forgot-password', async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        await sendEmail(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  });

  // DELETE route to remove an item
router.delete('/:id',authMiddlewareAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!User) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is an admin or the owner of the item
      if (req.user.isAdmin) {
        await user.deleteOne();
        return res.status(200).json({ message: 'User deleted successfully' });
      } else {
        return res.status(403).json({ message: 'Not authorized to delete this user' });
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  });


module.exports = router;

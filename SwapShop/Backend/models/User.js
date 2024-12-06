const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: String, // To store the hashed reset token
    resetTokenExpiry: Date, // To store token expiry
    
});

// Encrypt Password Before Saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;

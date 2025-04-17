// scripts/seedAdmin.js
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const dotenv = require("dotenv");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      password: process.env.ADMIN_PASSWORD, // This will be hashed automatically
    });

    await admin.save();
    console.log("Admin seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
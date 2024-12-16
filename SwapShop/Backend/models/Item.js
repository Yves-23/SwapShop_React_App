// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: { type: String},
    description: { type: String, required: true },
    category: { type: String, default: 'Uncategorized' }, // Default category if not provided
    price: { type: String, required: true },
    image: { type: String, default: null }, 
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

// const Item = require('../models/Item');
// const Joi = require('joi');

// // Validation function using Joi
// const validateItem = (data) => {
//   const schema = Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     price: Joi.string().required(),
//     category: Joi.string().default('Uncategorized'),
//     image: Joi.string().uri().optional(),
//   });

//   return schema.validate(data);
// };

// const postItem = async (req, res) => {
//   try {
//     const { error } = validateItem(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const { title, description, price, category, image } = req.body;

//     const item = new Item({
//       title,
//       description,
//       price,
//       category,
//       image: image || null, // Default to null if no image provided
//       postedBy: req.user._id,
//     });

//     const savedItem = await item.save();

//     res.status(201).json({
//       message: 'Item posted successfully',
//       item: savedItem,
//     });
//   } catch (error) {
//     console.error('Error posting item:', error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { postItem };

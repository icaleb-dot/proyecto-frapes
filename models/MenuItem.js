const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['frappe', 'fresas_con_crema', 'topping'],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
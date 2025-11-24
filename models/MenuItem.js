const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: ['frappe', 'fresas_c_crema', 'topping'],
  },
  tamano: {
    type: String,
    required: true,
    enum: ['chico', 'mediano', 'grande'],
  },
  descripcion: {
    type: String, 
  },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
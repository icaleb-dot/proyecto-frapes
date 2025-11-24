const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // relacion con el modelo de user
    required: true
  },
  productos: [
    {
      nombre: { type: String, required: true },
      tamano: { type: String, enum: ['chico', 'mediano', 'grande'], default: 'mediano' },
      precio: { type: Number, required: true },
      detalles: { type: String },
      cantidad: { type: Number, default: 1 }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  fechaPedido: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
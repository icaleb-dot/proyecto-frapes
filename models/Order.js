const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Relación con el modelo de Usuario
    required: true
  },
  productos: [
    {
      nombre: { type: String, required: true }, // Ej: "Frapé de Oreo"
      tamaño: { type: String, enum: ['chico', 'mediano', 'grande'], default: 'mediano' },
      precio: { type: Number, required: true },
      detalles: { type: String } // Ej: "Sin crema batida", "Leche de almendra"
    }
  ],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'preparando', 'listo', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  fechaPedido: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
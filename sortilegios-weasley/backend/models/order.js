const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      _id: false,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  status: {
  type: String,
  enum: [
    'Enviado',
    'En vuelo',
    'Entregado',
    '🕊️ La lechuza ha salido del Castillo',
    '🌫️ Cruzó un banco de niebla encantada',
    '⚡ Esquivó rayos sobre el Bosque Prohibido',
    '💨 Vuelo rasante sobre las Montañas de Hogwarts',
    '🛬 Aterrizó cerca de tu torre mágica',
    '📬 Entregado con una reverencia'
  ],
  default: 'Enviado'
}
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

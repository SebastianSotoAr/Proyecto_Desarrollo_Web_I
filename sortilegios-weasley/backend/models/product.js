// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  priceGalleons: Number,
  category: String,
  image: String,
  forbidden: Boolean,
  original: Boolean,
  stock: { type: Number, default: 999 }  // aquí puedes fijar el stock por defecto
});

module.exports = mongoose.model('Product', productSchema);
    

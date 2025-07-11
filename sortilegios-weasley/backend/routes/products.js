const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevo = new Product(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: "Error al guardar producto", detalles: error.message });
  }
});

module.exports = router;
// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar producto", detalles: error.message });
  }
});
// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  const { items, address } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const GALEON_TO_COP = 24000;
let total = 0;
const detailedItems = [];
console.log("🧪 TEST valores de prueba:");
console.log("Total COP:", total);

// Verificar productos y stock
for (let item of items) {
  const product = await Product.findById(item._id);
  if (!product) return res.status(404).json({ error: `Producto no encontrado: ${item._id}` });

  if (product.stock < item.quantity) {
    return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });
  }

  total += product.priceGalleons * item.quantity;
  console.log("PRECIO:", product.price);
  console.log("ITEMS:", item);
  detailedItems.push({
    _id: product._id,
    name: product.name,
    quantity: item.quantity,
    price: product.priceGalleons,

  });
}

// Convertir a galeones
const totalGalleons = total;

console.log("Total galeones:", totalGalleons);
console.log("Saldo usuario antes:", user.money);

    // Verificar fondos del usuario
        if (user.money < totalGalleons) {
      return res.status(400).json({ error: "Fondos insuficientes" });
    }

        // Restar stock
        for (let item of items) {
          await Product.findByIdAndUpdate(item._id, {
            $inc: { stock: -item.quantity },
          });
        }
    console.log("💰 Galeones a descontar:", totalGalleons);
    console.log("💰 Saldo ANTES de restar:", user.money);
    console.log("💰 Saldo DESPUÉS de restar:", user.money - totalGalleons);
    // Restar dinero
    user.money -= totalGalleons;
    await user.save();

    // Crear pedido
const newOrder = await Order.create({
  user: user._id,
  items: detailedItems,
  total,
  address,
  status: "🕊️ La lechuza ha salido del Castillo",


});

const fasesMagicas = [
  { estado: "🕊️ La lechuza ha salido del Castillo", delay: 10000 },
  { estado: "🌫️ Cruzó un banco de niebla encantada", delay: 10000 },
  { estado: "⚡ Esquivó rayos sobre el Bosque Prohibido", delay: 10000 },
  { estado: "💨 Vuelo rasante sobre las Montañas de Hogwarts", delay: 10000 },
  { estado: "🛬 Aterrizó cerca de tu torre mágica", delay: 10000 },
  { estado: "📬 Entregado con una reverencia", delay: 10000 },
];

fasesMagicas.reduce((promesa, fase) => {
  return promesa.then(() => new Promise(resolve => {
    setTimeout(async () => {
      try {
        const orderToUpdate = await Order.findById(newOrder._id);
        if (orderToUpdate) {
          orderToUpdate.status = fase.estado;
          await orderToUpdate.save();
        }
      } catch (err) {
        console.error("Error actualizando fase del pedido:", err);
      }
      resolve();
    }, fase.delay);
  }));
}, Promise.resolve());


res.status(201).json({
  message: "Pedido enviado",
  order: newOrder,
  updatedUser: {
    _id: user._id,
    name: user.name,
    username: user.username,
    money: user.money,
    email: user.email,
    role: user.role,
  }
});
  } catch (error) {
    console.error("❌ Error al crear pedido:", error);
    res.status(500).json({ error: "Error interno al crear el pedido" });
  }
});
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const Orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(Orders);
  } catch (error) {
    console.error("❌ Error al obtener pedidos del usuario:", error);
    res.status(500).json({ error: "Error al obtener tus pedidos" });
  }
});

module.exports = router;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;  // esto esta en .env
                                            
const Order = require("../models/order");

// Registro
router.post("/register", async (req, res) => {
  const { username, password, role, quizAnswer, questionId } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    let finalRole = role;

    if (role === "usuario_magico") {
      const selected = magicQuestions.find(q => q.id === questionId);
      if (!selected || selected.answer.toLowerCase() !== quizAnswer?.toLowerCase()) {
        return res.status(403).json({
          error: "Respuesta incorrecta a la pregunta mágica. No puedes ser un usuario mágico.",
        });
      }
    }

    const user = await User.create({ username, password: hashed, role: finalRole });
    res.json({ message: "Usuario registrado", user });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(400).json({ error: error.message || "Error al registrar usuario" });
  }
});

// Banco de preguntas mágicas
router.get("/quiz-question", (req, res) => {
  const random = magicQuestions[Math.floor(Math.random() * magicQuestions.length)];
  const { id, question, options } = random;
  res.json({ id, question, options });
});

const magicQuestions = [
  {
    id: 1,
    question: "¿Cuál de estas NO es una casa de Hogwarts?",
    options: ["Gryffindor", "Ravenclaw", "Azkaban", "Slytherin"],
    answer: "Azkaban"
  },
  {
    id: 2,
    question: "¿Qué objeto se usa para volar en el Quidditch?",
    options: ["Varita", "Escoba", "Capa", "Gato"],
    answer: "Escoba"
  },
  {
    id: 3,
    question: "¿Qué hechizo sirve para repeler dementores?",
    options: ["Alohomora", "Expelliarmus", "Expecto Patronum", "Lumos"],
    answer: "Expecto Patronum"
  }
];

//


// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Intentando login con:", username, password);

  const user = await User.findOne({ username });

  if (!user) {
    console.log("Usuario no encontrado");
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const match = await bcrypt.compare(password, user.password);
  console.log("Contraseña correcta:", match);

  if (!match) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ token, user });
});

const authMiddleware = require("../middleware/auth");


// Ver saldo
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// Recargar dinero con gimmick (una adivinanza)
router.post("/recharge", authMiddleware, async (req, res) => {
  const { answer } = req.body;
  const user = await User.findById(req.user.id);

  if (answer?.trim().toLowerCase() === "expecto patronum") {
    user.money += 100;
    await user.save();
    return res.json({ message: "Recarga exitosa", money: user.money });
  }

  res.status(400).json({ error: "Respuesta incorrecta. Intenta con un hechizo." });
});


// Comprar producto
router.post("/buy", authMiddleware, async (req, res) => {
  const { price } = req.body;
  const user = await User.findById(req.user.id);

  if (user.money < price) {
    return res.status(400).json({ error: "Fondos insuficientes" });
  }

  user.money -= price;
  await user.save();
  res.json({ message: "Compra exitosa", remaining: user.money });
});

module.exports = router;

// Obtener pedidos del usuario actual
router.get("/orders/my", authMiddleware, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});
// Actualizar nombre de usuario y/o contraseña
router.put("/me", authMiddleware, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (username) user.username = username;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();
    res.json({ message: "Usuario actualizado", user });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});
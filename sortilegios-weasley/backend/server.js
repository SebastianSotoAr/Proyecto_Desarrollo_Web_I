require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error conectando a MongoDB:", err));

  
// Rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders')); // Asegúrate de tener este archivo

async function crearAdminPorDefecto() {
  try {
    const adminExistente = await User.findOne({ username: "admin" });
    if (!adminExistente) {
      const hashed = await bcrypt.hash("admin", 10);
      await User.create({
        username: "admin",
        password: hashed,
        role: "admin",
        money: 1000,
      });
      console.log("✅ Usuario admin creado (usuario: admin, contraseña: admin)");
    } else {
      console.log("ℹ️  Usuario admin ya existe");
    }
  } catch (err) {
    console.error("❌ Error creando usuario admin:", err);
  }
}

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

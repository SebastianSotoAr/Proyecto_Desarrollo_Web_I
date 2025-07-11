// backend/loadInitialProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

const products = [
  {
    name: "Polvo Peruano de Oscuridad Instantánea",
    description: "Crea una nube de oscuridad total al instante.",
    priceGalleons: 3,
    category: "Artículos de defensa mágica",
    image: "/PolvoPeruanodeOscuridadInstantánea.png",
    forbidden: true,
    original: true,
    stock: 999
  },
  {
    name: "Orejas extensibles",
    description: "Escucha conversaciones lejanas. Muy útil para espiar.",
    priceGalleons: 1,
    category: "Bromas mágicas",
    image: "/ExtendableEars.jpg",
    forbidden: false,
    original: true,
    stock: 999
  },
  {
    name: "Caramelos Vomitivos",
    description: "Provocan vómito inmediato. Parte de los productos de prueba.",
    priceGalleons: 1,
    category: "Dulces encantados",
    image: "/pastillasVomitivas.png",
    forbidden: false,
    original: true,
    stock: 999
  },
  {
    name: "Pastillas Fainting Fancies",
    description: "Te desmayas al instante. Ideal para salir de clase.",
    priceGalleons: 2,
    category: "Dulces encantados",
    image: "/PastillasFaintingFancies.jpg",
    forbidden: false,
    original: true,
    stock: 999
  },
  {
    name: "Caja de bromas truculentas",
    description: "Colección de dulces encantados con efectos variados.",
    priceGalleons: 5,
    category: "Bromas mágicas",
    image: "/Cajadebromastruculentas.jpg",
    forbidden: false,
    original: true,
    stock: 999
  },
  {
    name: "Sombreros acéfalos",
    description: "¿Qué se siente al estar decapitado? Ponte uno de estos sombreros para volver tu cabeza invisible y dar un buen susto a tus amigos.",
    priceGalleons: 2,
    category: "Artículos de defensa mágica",
    image: "/SombrerosAcefalos.jpg",
    forbidden: true,
    original: true,
    stock: 999
  },
  {
    name: "Detonadores trampa",
    description: "Explosión sonora y luminosa. No apto para interiores.",
    priceGalleons: 2,
    category: "Artículos explosivos",
    image: "/DetonadorTrampa.png",
    forbidden: false,
    original: true,
    stock: 999
  },
  {
    name: "Chicle sangriento",
    description: "Broma clásica. Te hace sangrar la boca (de mentira).",
    priceGalleons: 0.5,
    category: "Bromas mágicas",
    image: "/ChicleSangriento.png",
    forbidden: false,
    original: true,
    stock: 999
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB Atlas");

    await Product.deleteMany({ original: true });
    await Product.insertMany(products);
    console.log("Productos mágicos insertados exitosamente");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error insertando productos:", err);
  }
}

seedProducts();

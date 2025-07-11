import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from '../components/auth'; 



const ProductList = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role || "invitado"; // fallback si no está logueado
  const isAuthorized = role === "admin";
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceGalleons: "",
    category: "",
    image: "/default.png",
    forbidden: false,
    stock: "", 
  });

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Obtener productos desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      priceGalleons: parseFloat(formData.priceGalleons),
      original: false,
    };

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setFormData({
          name: "",
          description: "",
          priceGalleons: "",
          category: "",
          image: "/default.png",
          forbidden: false,
        });
        setShowForm(false);
      });
  };

  const handleDelete = (id) => {
    const producto = products.find((p) => p._id === id || p.id === id);
    if (producto.original) {
      alert("❌ Este producto original no puede ser eliminado.");
      return;
    }

    const confirmado = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirmado) {
      // Aquí  implementar DELETE a futuro
      const updated = products.filter((p) => (p._id || p.id) !== id);
      setProducts(updated);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryList = [
    ...new Set(products.map((p) => p.category)),
    "Todas",
  ].sort();

  return (
    <>
      <div className="filters-container">
        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {categoryList
        .filter((cat) => cat !== "Todas")
        .map((category) => {
          const items = filteredProducts.filter((p) => p.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>
              <div className="product-grid">
                {items.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                    role={role} // ✅ Esto sí está definido
                    onDelete={() => handleDelete(product._id || product.id)}
                  />

                ))}
              </div>
            </div>
          );
        })}

      {isAuthorized && (
        <div className="product-grid">
          <div className="product-card add-product-card">
            {!showForm ? (
              <button className="btn-add" onClick={() => setShowForm(true)}>
                Agregar nuevo producto
              </button>
            ) : (
              <form onSubmit={handleAddProduct} className="form-inside-card">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Descripción"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="priceGalleons"
                  placeholder="Precio (galeones)"
                  value={formData.priceGalleons}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                
                  <option value="">Selecciona categoría</option>
                  <option value="Bromas mágicas">Bromas mágicas</option>
                  <option value="Dulces encantados">Dulces encantados</option>
                  <option value="Artículos explosivos">Artículos explosivos</option>
                  <option value="Artículos de defensa mágica">Artículos de defensa mágica</option>
                </select>

                <select name="image" value={formData.image} onChange={handleChange}>
                  <option value="/default.png">Selecciona imagen</option>
                  <option value="/PolvoPeruanodeOscuridadInstantánea.png">Polvo Oscuridad</option>
                  <option value="/ExtendableEars.jpg">Orejas Extensibles</option>
                  <option value="/pastillasVomitivas.png">Caramelos Vomitivos</option>
                  <option value="/PastillasFaintingFancies.jpg">Pastillas Fainting</option>
                  <option value="/Cajadebromastruculentas.jpg">Caja de bromas</option>
                  <option value="/SombrerosAcefalos.jpg">Sombreros acéfalos</option>
                  <option value="/DetonadorTrampa.png">Detonador trampa</option>
                  <option value="/ChicleSangriento.png">Chicle sangriento</option>
                </select>

                <label>
                  <input
                    type="checkbox"
                    name="forbidden"
                    checked={formData.forbidden}
                    onChange={handleChange}
                  />
                  ¿Prohibido?
                </label>

                <button type="submit" className="btn-add">
                  Crear
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;

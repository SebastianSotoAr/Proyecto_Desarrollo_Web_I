import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import initialProducts from "../data/products";

const LOCAL_STORAGE_KEY = "productos_magicos";

const ProductList = ({ isAuthorized }) => {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.length > 0 ? parsed : initialProducts;
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceGalleons: "",
    category: "",
    image: "/default.png",
    forbidden: false,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

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
      id: products.length + 1,
      priceGalleons: parseFloat(formData.priceGalleons),
      original: false,
    };

    setProducts([...products, newProduct]);

    setFormData({
      name: "",
      description: "",
      priceGalleons: "",
      category: "",
      image: "/default.png",
      forbidden: false,
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const producto = products.find((p) => p.id === id);
    if (producto.original) {
      alert("❌ Este producto original no puede ser eliminado.");
      return;
    }

    const confirmado = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirmado) {
      const updated = products.filter((product) => product.id !== id);
      setProducts(updated);
    }
  };

  const handleResetProducts = () => {
    const confirmar = window.confirm("¿Deseas restaurar los productos originales? Se perderán los añadidos.");
    if (confirmar) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setProducts(initialProducts);
    }
  };

  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAuthorized={isAuthorized}
            onDelete={handleDelete}
          />
        ))}

        {isAuthorized && (
          <>
            <div className="product-card add-product-card">
              {!showForm ? (
                <button className="btn-add" onClick={() => setShowForm(true)}>
                  ➕ Agregar nuevo producto
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
                    type="text"
                    name="category"
                    placeholder="Categoría"
                    value={formData.category}
                    onChange={handleChange}
                  />

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
                  <button type="submit" className="btn-add">✨ Crear</button>
                </form>
              )}
            </div>

            <div className="product-card reset-card">
              <h3>🔄 Restaurar productos</h3>
              <p>Restaura el catálogo original. Se eliminarán los productos añadidos.</p>
              <button className="btn-add" onClick={handleResetProducts}>
                Restaurar
              </button>
            </div>

          </>
        )}
      </div>
    </>
  );
};

export default ProductList;

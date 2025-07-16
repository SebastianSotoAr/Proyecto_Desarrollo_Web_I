import React, { useContext, useState } from "react";
import "../styles/products.css";
import { CartContext } from "../components/CartContext";
import animateToCart from "../styles/animateToCart";

const ProductCard = ({ product, role, user, onDelete, onUpdate }) => {
  const priceCOP = product.priceGalleons * 5000;
  const isMagical = role === "admin" || role === "usuario_magico";
  const isForbidden = product.forbidden && !isMagical;
  const { addToCart } = useContext(CartContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name,
    description: product.description,
    priceGalleons: product.priceGalleons,
    stock: product.stock ?? 0,
    category: product.category,
    image: product.image,
    forbidden: product.forbidden,
  });

  const handleAddToCart = (e, product) => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }
    addToCart(product);

    const cartIcon = document.querySelector("#cart-icon");
    if (cartIcon) {
      animateToCart(e.currentTarget, cartIcon);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    if (name === "priceGalleons") {
      newValue = Math.max(0.01, parseFloat(newValue) || 0.01); // mínimo 0.01
    }

    if (name === "stock") {
      newValue = Math.max(0, Math.floor(newValue) || 0); // solo enteros ≥ 0
    }

    setEditData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };


  const handleSaveEdit = () => {
    onUpdate(product._id || product.id, {
      ...editData,
      priceGalleons: parseFloat(editData.priceGalleons),
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`product-card ${product.category
        .replace(/\s+/g, "-")
        .toLowerCase()}`}
    >
      <p style={{ fontSize: "0.8rem", color: "#999" }}>Rol: {role}</p>

      {isEditing ? (
        
        <div className="form-inside-card add-product-card">
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
            className="input"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleInputChange}
            className="textarea"
          />
          <input
            type="number"
            name="priceGalleons"
            value={editData.priceGalleons}
            onChange={handleInputChange}
            className="input"
            required
            min="0.01"
            step="0.01"
          />
          <input
            type="number"
            name="stock"
            value={editData.stock}
            onChange={handleInputChange}
            className="input"
            required
            min="0"
            step="1"
          />
          <select
            name="category"
            value={editData.category}
            onChange={handleInputChange}
            className="select"
          >
            <option value="">Selecciona categoría</option>
            <option value="Bromas mágicas">Bromas mágicas</option>
            <option value="Dulces encantados">Dulces encantados</option>
            <option value="Artículos explosivos">Artículos explosivos</option>
            <option value="Artículos de defensa mágica">
              Artículos de defensa mágica
            </option>
          </select>
          <select
            name="image"
            value={editData.image}
            onChange={handleInputChange}
            className="select"
          >
            <option value="/default.png">Selecciona imagen</option>
            <option value="/PolvoPeruanodeOscuridadInstantánea.png">
              Polvo Oscuridad
            </option>
            <option value="/ExtendableEars.jpg">Orejas Extensibles</option>
            <option value="/pastillasVomitivas.png">Caramelos Vomitivos</option>
            <option value="/PastillasFaintingFancies.jpg">
              Pastillas Fainting
            </option>
            <option value="/Cajadebromastruculentas.jpg">Caja de bromas</option>
            <option value="/SombrerosAcefalos.jpg">Sombreros acéfalos</option>
            <option value="/DetonadorTrampa.png">Detonador trampa</option>
            <option value="/ChicleSangriento.png">Chicle sangriento</option>
          </select>
          <label className="edit-checkbox">
            <input
              type="checkbox"
              name="forbidden"
              checked={editData.forbidden}
              onChange={handleInputChange}
            />
            ¿Prohibido?
          </label>
          <div className="edit-buttons">
            <button className="btn-add" onClick={handleSaveEdit}>
              ✅ Guardar
            </button>
            <button
              className="btn-add"
              style={{ backgroundColor: "#555" }}
              onClick={() => setIsEditing(false)}
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <img
            src={product.image}
            alt={product.name}
            className={isForbidden ? "product-image blurred" : "product-image"}
          />
          <h3>{product.name}</h3>
          <p>{isForbidden ? "🔒 Producto restringido" : product.description}</p>
          <p className="price">
            {product.priceGalleons}⚱️ / ${priceCOP.toLocaleString()} COP
          </p>
          {!isForbidden && (
            <p className="stock">Stock: {product.stock ?? 0}</p>
          )}
          {!isForbidden && (
            <button
              className="btn-add"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Agregar al carrito
            </button>
          )}
          {role === "admin" && !product.original && (
            <>
              <button
                className="btn-add"
                style={{ marginTop: "0.5rem", backgroundColor: "#0b4c46" }}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Editar
              </button>
              <button
                className="btn-add"
                style={{ marginTop: "0.5rem", backgroundColor: "#460b0b" }}
                onClick={() => {
                  if (
                    window.confirm("¿Estás seguro de eliminar este producto?")
                  ) {
                    onDelete(product._id || product.id);
                  }
                }}
              >
                Eliminar producto
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;

import React from "react";
import { useContext } from "react";
import "../styles/products.css";
import { CartContext } from "../components/CartContext";

const ProductCard = ({ product, role, onDelete }) => {
  const priceCOP = product.priceGalleons * 5000;
  const isMagical = role === "admin" || role === "usuario_magico";
  const isForbidden = product.forbidden && !isMagical;
  const { addToCart } = useContext(CartContext);



  return (
    <div className={`product-card ${product.category.replace(/\s+/g, '-').toLowerCase()}`}>
      <p style={{ fontSize: "0.8rem", color: "#999" }}>Rol: {role}</p>

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

      {/* Mostrar stock si no está restringido */}
      {!isForbidden && (
        <p className="stock">Stock: {product.stock ?? 0}</p>
      )}

      {!isForbidden && (
          <button
            className="btn-add"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        )}

      {role === "admin" && !product.original && onDelete && (
        <button
          className="btn-add"
          style={{ marginTop: "0.5rem", backgroundColor: "#460b0b" }}
          onClick={() => {
            if (window.confirm("¿Estás seguro de eliminar este producto?")) {
              onDelete(product._id || product.id);
            }
          }}
        >
          Eliminar producto
        </button>
      )}
    </div>
  );
};

export default ProductCard;

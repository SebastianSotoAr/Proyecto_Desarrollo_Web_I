import React from "react";
import "../styles/products.css";

const ProductCard = ({ product, isAuthorized, onDelete }) => {
  const priceCOP = product.priceGalleons * 5000;
  const isForbidden = product.forbidden && !isAuthorized;

  return (
    <div className={`product-card ${product.category.replace(/\s+/g, '-').toLowerCase()}`}>

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
        <button className="btn-add">Agregar al carrito</button>
      )}
      {isAuthorized && !product.original && onDelete && (
        <button
          className="btn-add"
          style={{ marginTop: "0.5rem", backgroundColor: "#460b0b" }}
          onClick={() => {
            if (window.confirm("¿Estás seguro de eliminar este producto?")) {
              onDelete(product.id);
            }
          }}
        >
          ❌ Eliminar producto
        </button>
      )}
    </div>
  );
};

export default ProductCard;

import React from "react";
import "../styles/products.css";

const ProductCard = ({ product, isAuthorized }) => {
  const priceCOP = product.priceGalleons * 5000;
  const isForbidden = product.forbidden && !isAuthorized;

  return (
    <div className="product-card">
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
    </div>
  );
};

export default ProductCard;

import React from "react";
import "../styles/Cart.css";

const CartItem = ({ item, onRemove, onQuantityChange, toGalleons }) => {
  const subtotal = item.price * item.quantity;

const subtotalCOP = subtotal * 24000;

  return (
    <div className="cart-item">
      <div className="item-left">
        <img src={item.image} alt={item.name} className="item-image" />

        <div className="item-details">
          <h4 className="item-name">{item.name}</h4>

          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => onQuantityChange(item._id, -1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="item-quantity">{item.quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => onQuantityChange(item._id, 1)}
            >
              +
            </button>
          </div>

          <button className="remove-btn" onClick={() => onRemove(item._id)}>
            🗑️ Eliminar
          </button>
        </div>
      </div>

      <div className="item-price">
  💰 {  subtotal} Galeones / ${subtotalCOP.toLocaleString()} COP
      </div>

    </div>
  );
};

export default CartItem;

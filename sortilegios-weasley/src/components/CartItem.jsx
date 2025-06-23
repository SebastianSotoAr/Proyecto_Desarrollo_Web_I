import React from "react";
import "../styles/Cart.css"; 

const CartItem = ({ item, onRemove, toGalleons }) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="item-left">
        <img src={item.image} alt={item.name} className="item-image" />

        <div className="item-details">
          <h4 className="item-name">{item.name}</h4>
          <p className="item-quantity">Cantidad: {item.quantity}</p>
          <button className="remove-btn" onClick={() => onRemove(item.id)}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="item-price">
       💰 {toGalleons(subtotal)} Galeones / ${subtotal.toLocaleString()} COP
      </div>
    </div>
  );
};

export default CartItem;

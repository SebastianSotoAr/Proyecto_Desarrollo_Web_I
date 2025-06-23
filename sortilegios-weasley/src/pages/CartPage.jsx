import React, { useState } from "react";
import CartItem from "../components/CartItem";
import "../styles/Cart.css"; // solo este import, ya que todo está aquí

const initialCartItems = [
  {
    id: 1,
    name: "Polvo Peruano de Oscuridad Instantánea",
    price: 120000,
    quantity: 1,
    image: "/PolvoPeruanodeOscuridadInstantánea.png",
  },
  {
    id: 2,
    name: "Pastillas Vomitivas",
    price: 85000,
    quantity: 2,
    image: "/pastillasVomitivas.png",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const GALEON_TO_COP = 24000;

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const toGalleons = (cop) => Math.round(cop / GALEON_TO_COP);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-items-panel">
        <h2>Productos en el carrito</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            toGalleons={toGalleons}
          />
        ))}
      </div>

      <div className="cart-summary-panel">
        <h3>Resumen de compra</h3>
        <div className="summary-row">
          <span>Total</span>
          <span>
            💰 {toGalleons(total)} Galeones / ${total.toLocaleString()} COP
          </span>
        </div>
        <button className="checkout-button" onClick={() => alert("¡Tu pedido ha sido enviado por lechuza!")}>
          Continuar compra
        </button>
      </div>
    </div>
  );
};

export default CartPage;

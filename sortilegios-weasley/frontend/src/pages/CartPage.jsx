import React, { useContext, useState } from "react";
import CartItem from "../components/CartItem";
import { AuthContext } from "../components/auth";
import axios from "axios";
import "../styles/Cart.css";
import { CartContext } from "../components/CartContext";

const GALEON_TO_COP = 24000;

const CartPage = () => {
  
  

  const { user, setUser } = useContext(AuthContext);
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const [address, setAddress] = useState("");

  const toGalleons = (cop) => Math.round(cop / GALEON_TO_COP);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCOP = total * 24000;
  const handleRemoveItem = (_id) => {
    removeFromCart(_id);
  };

  const handleQuantityChange = (_id, amount) => {
    updateQuantity(_id, amount);
  };

  const handleCheckout = async () => {
    if (!address.trim()) {
      alert("Debes ingresar una dirección de envío.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems,
          address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("¡Pedido enviado por lechuza! 🦉");
      clearCart();
      setAddress("");
      setUser(res.data.updatedUser);
    } catch (err) {
      console.error("Error al crear pedido:", err.response?.data || err);
      alert(err.response?.data?.error || "Error al procesar pedido.");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items-panel">
        <h2>Productos en el carrito</h2>
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              toGalleons={toGalleons}
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}
      </div>

      <div className="cart-summary-panel">
        <h3>Resumen de compra</h3>
        <div className="summary-row">
          <span>Total:</span>
          <span>
            💰 {total} Galeones / ${totalCOP.toLocaleString()} COP
          </span>
        </div>


        <input
          type="text"
          className="magic-input"
          placeholder="Dirección de envío (por ejemplo: Calle 9¾, Londres)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          className="checkout-button"
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
        >
          Realizar pedido
        </button>
      </div>
    </div>
  );
};

export default CartPage;

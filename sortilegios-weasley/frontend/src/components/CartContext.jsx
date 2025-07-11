import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (product) => {
  const price = Number(product.priceGalleons) || 0;
  const stock = Number(product.stock) || 0;

  setCartItems((prevItems) => {
    const existing = prevItems.find((item) => item._id === product._id);
    if (existing) {
      if (existing.quantity + 1 > stock) {
        alert(`No puedes agregar más. Solo hay ${stock} unidades disponibles.`);
        return prevItems;
      }

      return prevItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...prevItems,
      {
        ...product,
        price,
        quantity: 1,
        stock // guardamos el stock actual para futuras validaciones
      }
    ];
  });
};




  const removeFromCart = (_id) => {
    setCartItems((items) => items.filter((item) => item._id !== _id));
  };

  const updateQuantity = (_id, delta) => {
  setCartItems((items) =>
    items.map((item) => {
      if (item._id !== _id) return item;

      const newQuantity = item.quantity + delta;

      if (newQuantity < 1) {
        return { ...item, quantity: 1 };
      }

      if (newQuantity > item.stock) {
        alert(`No puedes pedir más de ${item.stock} unidades.`);
        return item;
      }

      return { ...item, quantity: newQuantity };
    })
  );
};

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

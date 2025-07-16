import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role, money, ... }
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error al obtener usuario:", err);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
    }
  };
   const clearCartMagic = () => {
    alert("🪄 ¡Carrito borrado mágicamente para no dejar evidencia!");
    localStorage.removeItem("cart");
  };
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    clearCartMagic();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, login, logout,fetchUser }}>

      {children}
    </AuthContext.Provider>
  );
};

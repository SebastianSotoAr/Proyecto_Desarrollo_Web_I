import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/auth";
import axios from "axios";
import "../styles/UserPage.css";

const UserPage = () => {
  const { user, setUser, logout, fetchUser  } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "", currentPassword: "" });
  const [magicAnswer, setMagicAnswer] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // solo admin

  useEffect(() => {
    if (user) {
      setForm({ username: user.name || "", password: "", currentPassword: "" });
      fetchOrders();
      if (user.rol === "admin") fetchAllUsers();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderHistory(res.data);
    } catch (err) {
      console.error("Error al obtener pedidos:", err);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  const handleProfileUpdate = async () => {
  const wantsToChangePassword = form.password.trim() !== "";

  if (wantsToChangePassword && !form.currentPassword.trim()) {
    return alert("Debes ingresar tu contraseña actual para cambiarla.");
  }

  try {
    const token = localStorage.getItem("token");

    const payload = { username: form.username };
    if (wantsToChangePassword) {
      payload.password = form.password;
      payload.currentPassword = form.currentPassword;
    }

    await axios.put(
        "http://localhost:5000/api/users/me",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Recargar usuario completo desde el backend
      await fetchUser();

    alert("Perfil actualizado 🪄");

    // Limpiar campos de contraseña después del guardado
    setForm((prev) => ({
      ...prev,
      password: "",
      currentPassword: "",
    }));
  } catch (err) {
    console.error("Error actualizando perfil:", err.response?.data || err);
    alert(err.response?.data?.error || "Error actualizando perfil");
  }
};

 const handleAddFunds = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!magicAnswer.trim()) {
  alert("Debes escribir un hechizo para recargar ✨");
  return;
}

    const res = await axios.post(
      "http://localhost:5000/api/users/recharge",
      { answer: magicAnswer },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Respuesta exitosa:", res);

    setUser((prev) => ({ ...prev, money: res.data.money }));
    alert("¡Recarga mágica exitosa! ✨");
  } catch (err) {
    const message =
      err.response?.data?.error || "Respuesta incorrecta. Intenta con otro hechizo...";
    alert(message);
    console.error("Error al recargar:", err.response?.data || err);
  }
};



  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/users/${userId}/role`,
        { rol: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAllUsers();
      alert("Rol actualizado 🧙‍♂️");
    } catch (err) {
      console.error("Error actualizando rol:", err);
    }
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="profile-page">
        <div className="profile-card">
        <h2>Perfil de {user.username}</h2>

        <section className="profile-info">
            <p><span className="label">Usuario:</span> {user.username}</p>
            <input
            className="magic-input"
            type="text"
            placeholder="Nuevo nombre"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
            className="magic-input"
            type="password"
            placeholder="Nueva contraseña (opcional)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
            className="magic-input"
            type="password"
            placeholder="Contraseña actual (requerida)"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            />
            <button className="magic-button" onClick={handleProfileUpdate}>Guardar cambios</button>
        </section>

        <section className="profile-info">
            <p><span className="label">Recarga mágica 🪙</span></p>
            <p>¿Qué hechizo repele a los dementores?</p>
            <input
            className="magic-input"
            type="text"
            value={magicAnswer}
            onChange={(e) => setMagicAnswer(e.target.value)}
            placeholder="Escribe tu hechizo"
            />
            <button className="magic-button" onClick={handleAddFunds}>Recargar</button>
        </section>

        <section className="profile-info">
            <h3>Historial de pedidos</h3>
            {orderHistory.length === 0 ? (
            <p>No hay pedidos todavía.</p>
            ) : (
            <ul>
                {orderHistory.map((order) => (
                <li key={order._id}>
                    Pedido #{order._id.slice(-5)} – Total: {order.total} Galeones
                </li>
                ))}
            </ul>
            )}
        </section>

        {user.rol === "admin" && (
            <section className="profile-info">
            <h3>Administrar usuarios</h3>
            {allUsers.map((u) => (
                <div key={u._id}>
                {u.name} ({u.username}) - Rol:{" "}
                <select
                    className="magic-input"
                    value={u.rol}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                >
                    <option value="admin">admin</option>
                    <option value="usuario_magico">usuario_magico</option>
                    <option value="usuario_muggle">usuario_muggle</option>
                    <option value="invitado">invitado</option>
                </select>
                </div>
            ))}
            </section>
        )}
        </div>
        <div className="magic-aura"></div>
    </div>
    );

};

export default UserPage;

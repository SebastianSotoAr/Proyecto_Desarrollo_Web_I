import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [messages, setMessages] = useState({});
  const [progressStages, setProgressStages] = useState({});
  const owlStages = [
  "🕊️ La lechuza ha salido del Castillo",
  "🌫️ Cruzó un banco de niebla encantada",
  "⚡ Esquivó rayos sobre el Bosque Prohibido",
  "💨 Vuelo rasante sobre las Montañas de Hogwarts",
  "🛬 Aterrizó cerca de tu torre mágica"
];

useEffect(() => {
  const token = localStorage.getItem("token");

  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error cargando pedidos:", err));
  };

  fetchOrders(); // primera carga

  const interval = setInterval(fetchOrders, 10000); // refresca cada 10s

  return () => clearInterval(interval); // limpieza
}, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error cargando pedidos:", err));
  }, []);

  const toggleOrder = (id) => {
    setOpenOrderId(prev => prev === id ? null : id);
  };

  return (
    <div className="orders-page">
      <h2>📦 Historial de pedidos mágicos</h2>
      {orders.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header" onClick={() => toggleOrder(order._id)}>
              <span>🧾 Pedido del {new Date(order.createdAt).toLocaleDateString()}</span>
              <span>{openOrderId === order._id ? "🔼" : "🔽"}</span>
            </div>
            <div className={`order-details ${openOrderId === order._id ? "open" : ""}`}>
              {order.status !== "📬 Entregado con una reverencia" ? (
                <div className="owl-delivery">
                  <p><strong>Estado mágico:</strong> {order.status}</p>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(owlStages.indexOf(order.status) + 1) * 20}%`
                        }}
                      ></div>
                    </div>
                    <div className="owl">🦉</div>
                  </div>
                </div>
              ) : (
                <p><strong>Estado:</strong> ✅ {order.status}</p>
              )}


              <p><strong>Dirección:</strong> {order.address}</p>
              <p><strong>Total:</strong> 💰 {order.total} Galeones</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    🧙 {item.name} × {item.quantity} (💰 {item.price} g)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;

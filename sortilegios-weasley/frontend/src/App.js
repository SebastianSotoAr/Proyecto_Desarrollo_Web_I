import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPage from "./pages/ProductsPage";
import LoginPage from './pages/LogginPage';
import CartPage from "./pages/CartPage";
import "./styles/magicCursor.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomeDescription from "./pages/HomeDescription";
import ScrollToTop from './components/ScrollToTop';
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import OrdersPage from './pages/OrdersPage';


function App() {
  const [userRole, setUserRole] = useState("invitado"); // admin, usuario_magico, usuario_muggle, invitado

  const handleLoginSuccess = (role) => {
    setUserRole(role); // <-- Aquí guardas el rol correctamente
  };

  const handleLogout = () => {
    setUserRole("invitado"); // <-- Esto reinicia al rol por defecto
  };
  
  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Header isLoggedIn={userRole !== "invitado"} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomeDescription />
                  <ProductsPage userRole={userRole} />
                </>
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/perfil" element={<UserPage />} />
            <Route path="/pedidos" element={<OrdersPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

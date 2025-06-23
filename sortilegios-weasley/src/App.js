import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPage from "./pages/ProductsPage";
import LoginPage from './pages/LogginPage';
import CartPage from "./pages/CartPage";
import "./styles/magicCursor.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TermsModal from './components/TermsModal'; 
import HomeDescription from "./pages/HomeDescription";


function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginSuccess = (authorized) => {
    setIsAdmin(authorized);
  };

  return (
    <Router>
      
      <div className="App">
      <Header isLoggedIn={isAdmin} onLogout={() => setIsAdmin(false)} />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomeDescription />
                  <ProductsPage isAuthorized={isAdmin} />
                </>
              }
            />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

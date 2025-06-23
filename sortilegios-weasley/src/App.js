import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ProductsPage from "./pages/ProductsPage";
import Footer from './components/Footer';
import Filter from './components/Filter';
import LoginPage from './pages/LogginPage';
import CartPage from "./pages/CartPage";
import "./styles/magicCursor.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <div className="App">
      <LoginPage />
      {/* <Header />
      <main className="p-6">
        <div class="d-flex  align-items-start">
          <div class="sidebar">
            <Filter />
          </div>
          <ProductsPage />
        </div>
      </main> */}
      <ProductsPage />
      <CartPage />
      <Footer />
    </div>
  );
}

export default App;

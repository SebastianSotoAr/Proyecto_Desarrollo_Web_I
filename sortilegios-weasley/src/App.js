import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import ProductsPage from "./pages/ProductsPage";
import Footer from './components/Footer';
import "./styles/magicCursor.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold my-4">Sortilegios Weasley</h1>
      </header>
      <main className="p-6">
        <NavBar />
        <ProductsPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;

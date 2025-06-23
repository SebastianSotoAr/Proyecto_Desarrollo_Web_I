import React from "react";
import ProductList from "../components/ProductList";
import "../styles/products.css";

const ProductsPage = ({ isAuthorized }) => { 

  return (
    <div className="products-page">
      <h2>Productos mágicos</h2>
      <ProductList isAuthorized={isAuthorized} />
    </div>
  );
};

export default ProductsPage;

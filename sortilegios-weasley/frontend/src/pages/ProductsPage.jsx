import React from "react";
import ProductList from "../components/ProductList";
import "../styles/products.css";

const ProductsPage = ({ userRole }) => { 
  return (
    <div className="products-page">
      <h2>Productos mágicos</h2>
      <ProductList role={userRole} />
    </div>
  );
};

export default ProductsPage;

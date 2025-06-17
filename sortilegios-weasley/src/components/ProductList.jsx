import React from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

const ProductList = ({ isAuthorized }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isAuthorized={isAuthorized} />
      ))}
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import { fetchProducts, trackUserView, fetchRecommendations } from "./api";

const userId = "testUser123"; // Temporary User ID

function App() {
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const productList = await fetchProducts();
      setProducts(productList);
      
      const recommendations = await fetchRecommendations(userId);
      setRecommended(recommendations);
    }
    loadProducts();
  }, []);

  const handleView = (productId) => {
    trackUserView(userId, productId);
  };

  return (
    <div>
      <h1>Whooga Marketplace</h1>
      
      <h2>Recommended for You</h2>
      <div className="product-list">
        {recommended.map((product) => (
          <div key={product._id} onClick={() => handleView(product._id)}>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.name} - ${product.price}</p>
          </div>
        ))}
      </div>

      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} onClick={() => handleView(product._id)}>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.name} - ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

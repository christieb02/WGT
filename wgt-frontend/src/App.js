// Basic scaffold for a React Marketplace-style homepage + product view
// Tailored for personalization later

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(data => console.log(data)); // Replace with state setter later
}, []);

// Dummy data import
import products from './data/amazon_products.json'; // Create this based on Kaggle dataset

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">just mockup</div>
      <input className="search-bar" placeholder="Search products..." />
      <div className="dropdown">Categories ▼</div>
    </nav>
  );
}

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="product-grid">
        {products.slice(0, 12).map((item, index) => (
          <Link to={`/product/${index}`} key={index} className="product-card">
            <img src={item.image || 'https://via.placeholder.com/150'} alt={item.title} />
            <h4>{item.title}</h4>
            <p>${item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  const categories = [
    'All', 'Electronics', 'Fashion', 'Books', 'Home & Kitchen', 'Toys', 'Sports'
  ];

  return (
    <aside className="sidebar">
      {categories.map((cat, idx) => <div key={idx}>{cat}</div>)}
    </aside>
  );
}

function ProductPage() {
  const { id } = useParams();
  const product = products[id];

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-page">
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.title} />
      <div className="details">
        <h2>{product.title}</h2>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Rating:</strong> {product.rating} ⭐</p>
        <p>{product.description}</p>
        <button>Add to Favorites</button>
      </div>
    </div>
  );
}

export default App;

const express = require('express');
const router = express.Router();

// Dummy data or connect to DB later
const products = [
  { id: 1, title: 'Cool Shirt', price: 25 },
  { id: 2, title: 'Nice Watch', price: 120 },
];

router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;

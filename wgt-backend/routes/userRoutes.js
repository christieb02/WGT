const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");

// Track user product views
router.post("/view", async (req, res) => {
  const { userId, productId } = req.body;

  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({ userId, viewedProducts: [] });
  }

  if (!user.viewedProducts.includes(productId)) {
    user.viewedProducts.push(productId);
  }

  await user.save();
  res.json({ message: "Product view tracked" });
});

// Fetch personalized recommendations
router.get("/:userId/recommendations", async (req, res) => {
  const user = await User.findOne({ userId: req.params.userId }).populate("viewedProducts");

  if (!user || user.viewedProducts.length === 0) {
    return res.json(await Product.find().limit(10));
  }

  // Simple recommendation: return products from the same category as viewed items
  const categories = user.viewedProducts.map(p => p.category);
  const recommendations = await Product.find({ category: { $in: categories } }).limit(10);

  res.json(recommendations);
});

module.exports = router;

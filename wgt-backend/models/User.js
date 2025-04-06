const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: String,
  viewedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", UserSchema);

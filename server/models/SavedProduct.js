const mongoose = require('mongoose');

const savedProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  dateSaved: { type: Date, default: Date.now },
  // Add other fields if needed
});

const SavedProduct = mongoose.model("SavedProduct", savedProductSchema);

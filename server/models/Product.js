const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    nutritionValues: {
      calories: Number,
      fat: Number,
      protein: Number,
      carbs: Number,
      // Add more as needed
    },
    // Add other fields as needed
  });
  
  const Product = mongoose.model('Product', productSchema);
  
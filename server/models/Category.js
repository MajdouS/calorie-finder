const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Add other fields if needed
  });
  
  const Category = mongoose.model('Category', categorySchema);
  
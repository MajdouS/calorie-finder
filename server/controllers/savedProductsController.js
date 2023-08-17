const SavedProduct = require('../models/SavedProduct');

exports.getAllSavedProducts = async (req, res) => {
  try {
    const savedProducts = await savedProduct.find();
    res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSavedProductById = async (req, res) => {
  try {
    const savedProduct = await SavedProduct.findById(req.params.id);
    if (!savedProduct) return res.status(404).json({ message: 'Saved Product not found' });
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSavedProduct = async (req, res) => {
  try {
    const savedProduct = new SavedProduct(req.body);
    await savedProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSavedProduct = async (req, res) => {
  try {
    const savedProduct = await SavedProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!savedProduct) return res.status(404).json({ message: 'Saved Product not found' });
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSavedProduct = async (req, res) => {
  try {
    const savedProduct = await SavedProduct.findByIdAndDelete(req.params.id);
    if (!savedProduct) return res.status(404).json({ message: 'Saved Product not found' });
    res.status(204).json({ message: 'Saved Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

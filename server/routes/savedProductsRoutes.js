const express = require("express");
const router = express.Router();
const savedProductsController = require("../controllers/savedProductsController");

router.get("/", savedProductsController.getAllSavedProducts);
router.get("/:id", savedProductsController.getSavedProductById);
router.post("/", savedProductsController.createSavedProduct);
router.put("/:id", savedProductsController.updateSavedProduct);
router.delete("/:id", savedProductsController.deleteSavedProduct);

module.exports = router;

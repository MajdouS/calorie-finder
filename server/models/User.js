const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dailyNutritionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  totalCalories: Number,
  totalFat: Number,
  totalProtein: Number,
  totalCarbs: Number,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Password is not required for social logins
  provider: { type: String, enum: ["google", "facebook"], required: false },
  providerId: { type: String, required: false },
  savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  dailyNutrition: [dailyNutritionSchema],
});

// Hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

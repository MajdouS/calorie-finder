const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv-flow").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
//Routes
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const savedProductsRoutes = require("./routes/savedProductsRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/saved-products", savedProductsRoutes);
app.use("/api/auth", authRoutes);
//Middleware
const { protect } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

app.use("/api/protected-route", protect, protectedRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

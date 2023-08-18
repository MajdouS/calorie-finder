require("dotenv-flow").config({ path: "./server" });

const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const cors = require("cors");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");

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
//Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const savedProductsRoutes = require("./routes/savedProductsRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/saved-products", savedProductsRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

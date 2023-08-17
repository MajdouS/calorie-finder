const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization required" });
  }
};
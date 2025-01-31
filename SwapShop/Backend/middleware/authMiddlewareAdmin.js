// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddlewareAdmin = (req, res, next) => {
  const adminToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!adminToken) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user is an admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddlewareAdmin;
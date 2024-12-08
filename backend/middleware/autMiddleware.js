const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Decoded Token:", decoded);
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    console.log("req.user set to:", req.user);
    next();
  });
};

module.exports = verifyToken;

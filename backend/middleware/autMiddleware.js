const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Hämta token från headers
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Tokenen kommer att vara i formatet "Bearer <token>"
  const tokenWithoutBearer = token.split(" ")[1]; // Ta bort "Bearer" från tokenen

  // Verifiera token
  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Lägg till decoded användardata i request objektet
    req.user = decoded;

    // Fortsätt till nästa middleware eller rutt
    next();
  });
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.user_id,
      email: user.email,
      is_admin: user.is_admin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = generateToken;

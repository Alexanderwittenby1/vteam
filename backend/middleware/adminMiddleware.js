const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = isAdmin;

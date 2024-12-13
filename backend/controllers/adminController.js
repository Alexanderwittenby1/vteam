const adminModel = require("../models/adminModel");

exports.getAllUsers = async (req, res) => {
  await adminModel.getAllUsers((error, users) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(users);
  });
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log("User ID:", userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  await adminModel.getUserById(userId, (error, user) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(user);
  });
};

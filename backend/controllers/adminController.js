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

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  console.log("User ID:", userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const { email, password, role } = req.body;
  await adminModel.updateUser(userId, email, password, role, (error, user) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};

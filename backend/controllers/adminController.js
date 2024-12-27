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
<<<<<<< HEAD
  const { email, password, role } = req.body;
=======
<<<<<<< HEAD
  const { email, password, role } = req.body;
=======
  console.log("User ID:", userId);
>>>>>>> main
>>>>>>> d7713f8385c38fad1b0b54efdbfcc18c1d1f7268

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d7713f8385c38fad1b0b54efdbfcc18c1d1f7268
  const userData = {};

  if (email) {
    userData.email = email;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;
  }

  if (role) {
    userData.role = role;
  }

  try {
    const updatedUser = await adminModel.updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
<<<<<<< HEAD
=======
=======
  const { email, password, role } = req.body;
  await adminModel.updateUser(userId, email, password, role, (error, user) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(user);
  });
>>>>>>> main
>>>>>>> d7713f8385c38fad1b0b54efdbfcc18c1d1f7268
};

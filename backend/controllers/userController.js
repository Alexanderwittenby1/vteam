const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const token = require("jsonwebtoken");

exports.getUserByEmail = (req, res) => {
  // Använd användarens email som finns i req.user (från verifyToken)
  const email = req.user.email;

  userModel
    .getUserByEmail(email) // Vi anropar modellen och skickar emailet från token
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user); // Skicka användardatan tillbaka till frontend
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "E-post och lösenord krävs" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = { email, password: hashedPassword };

    userModel.createUser(userData, (error, userId) => {
      if (error) {
        console.error("Fel vid skapande av användare:", error); // Logga felet
        return res.status(500).json({ error: "Kunde inte skapa användaren" });
      }
      res.status(201).json({ message: "Användare skapad", userId });
    });
  } catch (error) {
    console.error("Fel vid skapande av användare:", error); // Logga felet
    return res.status(500).json({ error: "Kunde inte skapa användaren" });
  }
};

exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((error, users) => {
    if (error) {
      return res.status(500).json({ error: "Internt serverfel" });
    }

    // Filtrera användardatan om du bara vill ha vissa fält
    const filteredUsers = users.map((user) => ({
      email: user.email,
      balance: user.balance,
      created_at: user.created_at,
    }));

    res.status(200).json({
      message: "Användare hämtade framgångsrikt",
      data: filteredUsers,
    });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userModel.getUserByEmail(email); // Hämta användaren från databasen

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Jämför lösenordet

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Skapa en JWT-token
    const jwtToken = token.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Tokenens giltighetstid (1 timme här)
    );

    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

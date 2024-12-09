const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const generateToken = require("../services/authService");

exports.getUserByEmail = async (req, res) => {
  const email = req.user.email;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "E-post och lösenord krävs" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = { email, password: hashedPassword };

    await userModel.createUser(userData, (error, userId) => {
      if (error) {
        console.error("Fel vid skapande av användare:", error);
        return res.status(500).json({ error: "Kunde inte skapa användaren" });
      }
      res.status(201).json({ message: "Användare skapad", userId });
    });
  } catch (error) {
    console.error("Fel vid skapande av användare:", error);
    return res.status(500).json({ error: "Kunde inte skapa användaren" });
  }
};

exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((error, users) => {
    if (error) {
      return res.status(500).json({ error: "Internt serverfel" });
    }

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
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwtToken = generateToken(user);
    console.log("JWT Token:", jwtToken);

    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTripsByUserId = (req, res) => {
  const userId = req.user.userId;

  userModel.getTripsByUserId(userId, (error, trips) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(trips);
  });
};

exports.addTrip = async (req, res) => {
  console.log("User from token:", req.user);

  const {
    start_time,
    end_time,
    start_location,
    end_location,
    distance,
    cost,
    base_fee,
    time_fee,
    parking_fee,
    scooter_id,
    payment_status,
  } = req.body;

  const userId = req.user.userId;

  if (
    !userId ||
    !start_time ||
    !start_location ||
    !scooter_id ||
    !payment_status
  ) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields: {
        userId,
        start_time,
        start_location,
        scooter_id,
        payment_status,
      },
    });
  }

  const tripData = {
    user_id: userId,
    scooter_id,
    start_time,
    end_time,
    start_location,
    end_location,
    distance,
    cost,
    base_fee,
    time_fee,
    parking_fee,
    payment_status,
  };

  try {
    const tripId = await userModel.addTrip(tripData);
    res.status(201).json({
      message: "Trip added successfully",
      tripId,
    });
  } catch (error) {
    console.error("Error adding trip:", error);
    res.status(500).json({ error: "Internal server error", tripData });
  }
};

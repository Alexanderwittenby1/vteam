const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const logEvents = require("./middleware/logEvents");
const db = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const scooterRoutes = require("./routes/scooterRoutes");
const stationRoutes = require("./routes/stationRoutes");


dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
app.use(compression());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/bike", scooterRoutes);
app.use("/admin", adminRoutes);
app.use("/station", stationRoutes);





app.use(async (req, res, next) => {
  await logEvents(req, res, next);// Logga alla cookies som kommer med begäran
  next();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  process.exit();
});

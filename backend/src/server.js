const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Fitness Tracker API is running" });
});

app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  if (!MONGO_URI) {
    console.error("Missing MONGO_URI in environment (.env).");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

start();

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
  } finally {
    process.exit(0);
  }
});

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Import routes
const userRoutes = require("./routes/user.routes");

// Database Connection
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));
}

// Routes
app.use("/api/users", userRoutes);

module.exports = app;

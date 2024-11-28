const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const isTest = process.env.NODE_ENV === "test";
const User = mongoose.model(isTest ? "test_users" : "users", userSchema);

module.exports = User;

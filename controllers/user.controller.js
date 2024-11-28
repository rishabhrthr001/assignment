const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword, role });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};

// Get All Users (Admin Only)
exports.getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Get Admin Content
exports.getAdminContent = (req, res) => {
  res.json({ message: "Admin Content Accessed" });
};

// Get User Content (Admin and User)
exports.getUserContent = (req, res) => {
  res.json({ message: "User Content Accessed" });
};

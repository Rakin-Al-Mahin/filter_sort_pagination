const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_TOKEN = process.env.JWT_SECRET;

// Service to handle user signup
const signupService = async (name, email, password, role) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  return { message: "User created successfully" };
};

// Service to handle user login
const loginService = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Create a token
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_TOKEN, {
    expiresIn: "1h",
  });

  return { token, message: `Login successful! Welcome ${user.name}` };
};

module.exports = { signupService, loginService };

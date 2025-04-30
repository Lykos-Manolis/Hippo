const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUser, createUser } = require("../services/userService");
const pool = require("../config/db");

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use the userService to create the user
    const userId = await createUser(name, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user.id;

    // Get user details
    const [userRows] = await pool.query(
      "SELECT name, email FROM users WHERE user_id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRows[0];

    // Get active reservations (today and future)
    const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const [activeReservations] = await pool.query(
      "SELECT r.*, rest.* FROM reservations r JOIN restaurants rest ON r.restaurant_id = rest.restaurant_id WHERE r.user_id = ? AND r.date >= ? ORDER BY r.date ASC",
      [userId, today]
    );

    // Get past reservations history
    const [pastReservations] = await pool.query(
      "SELECT r.*, rest.* FROM reservations r JOIN restaurants rest ON r.restaurant_id = rest.restaurant_id WHERE r.user_id = ? AND r.date < ? ORDER BY r.date DESC",
      [userId, today]
    );

    res.json({
      name: user.name,
      email: user.email,
      activeReservations,
      reservationHistory: pastReservations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};

const getUserId = async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user.id;

    res.json({
      userId: userId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user ID",
      error: error.message,
    });
  }
};

module.exports = { register, login, getUserProfile, getUserId };

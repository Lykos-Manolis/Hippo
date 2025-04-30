const express = require("express");
const {
  register,
  login,
  getUserProfile,
  getUserId,
} = require("../controllers/authController");
const {
  handleGetUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUser,
} = require("../controllers/userController");
const {
  handleGetRestaurants,
  handleGetRestaurant,
  handleCreateRestaurant,
  handleUpdateRestaurant,
  handleDeleteRestaurant,
} = require("../controllers/restaurantController");
const {
  handleGetReservations,
  handleGetReservation,
  handleCreateReservation,
  handleUpdateReservation,
  handleDeleteReservation,
} = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/userid", authMiddleware, getUserId);

// User Routes
router.get("/users", handleGetUsers);
router.get("/users/:id", handleGetUser);
router.post("/users", handleCreateUser);
router.put("/users/:id", handleUpdateUser);
router.delete("/users/:id", handleDeleteUser);

// Restaurant Routes
router.get("/restaurants", handleGetRestaurants);
router.get("/restaurants/:id", handleGetRestaurant);
router.post("/restaurants", handleCreateRestaurant);
router.put("/restaurants/:id", handleUpdateRestaurant);
router.delete("/restaurants/:id", handleDeleteRestaurant);

// Reservation Routes
router.get("/reservations", handleGetReservations);
router.get("/reservations/:id", handleGetReservation);
router.post("/reservations", handleCreateReservation);
router.put("/reservations/:id", handleUpdateReservation);
router.delete("/reservations/:id", handleDeleteReservation);

module.exports = router;

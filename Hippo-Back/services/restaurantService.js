const pool = require("../config/db");

const getRestaurants = async () => {
  const [rows] = await pool.query("SELECT * FROM restaurants");
  return rows;
};

const getRestaurant = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM restaurants WHERE restaurant_id = ?",
    [id]
  );
  return rows[0];
};

const createRestaurant = async (name, location, description, imageUrl) => {
  const [result] = await pool.query(
    "INSERT INTO restaurants (name, location, description, imageUrl) VALUES (?, ?, ?, ?)",
    [name, location, description, imageUrl]
  );

  return result.insertId;
};

const updateRestaurant = async (id, name, location, description, imageUrl) => {
  const [result] = await pool.query(
    "UPDATE restaurants SET name = ?, location = ?, description = ?, imageUrl = ? WHERE restaurant_id = ?",
    [name, location, description, imageUrl, id]
  );
  return result.affectedRows;
};

const deleteRestaurant = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM restaurants WHERE restaurant_id = ?",
    [id]
  );
  return result.affectedRows;
};

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

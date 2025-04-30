const pool = require("../config/db");

const getReservations = async () => {
  const [rows] = await pool.query("SELECT * FROM reservations");
  return rows;
};

const getReservation = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM reservations WHERE reservation_id = ?",
    [id]
  );
  return rows[0];
};

const createReservation = async (
  user_id,
  restaurant_id,
  date,
  time,
  people_count
) => {
  const [result] = await pool.query(
    "INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)",
    [user_id, restaurant_id, date, time, people_count]
  );

  return result.insertId;
};

const updateReservation = async (
  id,
  user_id,
  restaurant_id,
  date,
  time,
  people_count
) => {
  const [result] = await pool.query(
    "UPDATE reservations SET user_id = ?, restaurant_id = ?, date = ?, time = ?, people_count = ? WHERE reservation_id = ?",
    [user_id, restaurant_id, date, time, people_count, id]
  );
  return result.affectedRows;
};

const deleteReservation = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM reservations WHERE reservation_id = ?",
    [id]
  );
  return result.affectedRows;
};

module.exports = {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};

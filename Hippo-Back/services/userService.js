const pool = require("../config/db");

const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

const getUser = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
    id,
  ]);
  return rows[0];
};

const createUser = async (name, email, password) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  return result.insertId;
};

const updateUser = async (id, name, email, password) => {
  const [result] = await pool.query(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?",
    [name, email, password, id]
  );
  return result.affectedRows;
};

const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [
    id,
  ]);
  return result.affectedRows;
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };

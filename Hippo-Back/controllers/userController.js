const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/userService");

const handleGetUsers = async (req, res) => {
  const users = await getUsers();

  res.json(users);
};

const handleGetUser = async (req, res) => {
  const userId = req.params.id;
  const user = await getUser(userId);
  res.json(user);
};

const handleCreateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = await createUser(name, email, password);

  res.status(201).json({ message: `User created with ID ${userId}` });
};

const handleUpdateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;
  const updatedUser = await updateUser(userId, name, email, password);
  res.json(updatedUser);
};

const handleDeleteUser = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await deleteUser(userId);
  res.json(deletedUser);
};

module.exports = {
  handleGetUsers,
  handleGetUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
};

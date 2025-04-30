const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../services/restaurantService");

const handleGetRestaurants = async (req, res) => {
  const restaurants = await getRestaurants();

  res.json(restaurants);
};

const handleGetRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const restaurant = await getRestaurant(restaurantId);
  res.json(restaurant);
};

const handleCreateRestaurant = async (req, res) => {
  const { name, location, description, imageUrl } = req.body;
  const restaurantId = await createRestaurant(
    name,
    location,
    description,
    imageUrl
  );

  res
    .status(201)
    .json({ message: `Restaurant created with ID ${restaurantId}` });
};

const handleUpdateRestaurant = async (req, res) => {
  const { name, location, description, imageUrl } = req.body;
  const restaurantId = req.params.id;
  const updatedRestaurant = await updateRestaurant(
    restaurantId,
    name,
    location,
    description,
    imageUrl
  );
  res.json(updatedRestaurant);
};

const handleDeleteRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const deletedRestaurant = await deleteRestaurant(restaurantId);
  res.json(deletedRestaurant);
};

module.exports = {
  handleGetRestaurants,
  handleGetRestaurant,
  handleCreateRestaurant,
  handleUpdateRestaurant,
  handleDeleteRestaurant,
};

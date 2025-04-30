const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../services/reservationService");

const handleGetReservations = async (req, res) => {
  const reservations = await getReservations();

  res.json(reservations);
};

const handleGetReservation = async (req, res) => {
  const reservationId = req.params.id;
  const reservation = await getReservation(reservationId);
  res.json(reservation);
};

const handleCreateReservation = async (req, res) => {
  const { user_id, restaurant_id, date, time, people_count } = req.body;
  const reservationId = await createReservation(
    user_id,
    restaurant_id,
    date,
    time,
    people_count
  );

  res
    .status(201)
    .json({ message: `Reservation created with ID ${reservationId}` });
};

const handleUpdateReservation = async (req, res) => {
  const { user_id, restaurant_id, date, time, people_count } = req.body;
  const reservationId = req.params.id;
  const updatedReservation = await updateReservation(
    reservationId,
    user_id,
    restaurant_id,
    date,
    time,
    people_count
  );
  res.json(updatedReservation);
};

const handleDeleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  const deletedReservation = await deleteReservation(reservationId);
  res.json(deletedReservation);
};

module.exports = {
  handleGetReservations,
  handleGetReservation,
  handleCreateReservation,
  handleUpdateReservation,
  handleDeleteReservation,
};

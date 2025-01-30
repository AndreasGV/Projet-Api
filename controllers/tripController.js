const Trip = require("../models/Trip");

// CREE VOYAGE
exports.createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate } = req.body;

    const trip = await Trip.create({
      user: req.userId,
      destination,
      startDate,
      endDate
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// RECUP VOYAGE USER CONNECTER
exports.getAllTripsForUser = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.userId });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// RECUP VOYAGE PAR ID
exports.getTripById = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findOne({ _id: tripId, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: "Voyage introuvable" });
    }
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// AJOUTER
exports.addItemToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { name, quantity } = req.body;

    const trip = await Trip.findOne({ _id: tripId, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: "Voyage introuvable" });
    }

    trip.items.push({ name, quantity });
    await trip.save();

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// MAJ
exports.updateItemInTrip = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;
    const { name, quantity, taken } = req.body;

    const trip = await Trip.findOne({ _id: tripId, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: "Voyage introuvable" });
    }

    const item = trip.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item introuvable" });
    }

    if (name !== undefined) item.name = name;
    if (quantity !== undefined) item.quantity = quantity;
    if (taken !== undefined) item.taken = taken;

    await trip.save();
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// SUPPRIMER
exports.deleteItemFromTrip = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: "Voyage introuvable" });
    }

    const item = trip.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item introuvable" });
    }

    item.remove();
    await trip.save();

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

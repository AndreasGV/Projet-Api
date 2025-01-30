const Item = require("../models/Item");
const Trip = require("../models/Trip");

// ADD
exports.addItem = async (req, res) => {
    try {
      const { name, quantity, status } = req.body;
      const tripId = req.params.tripId;
  
      // VERIF VOYAGE EXISTE
      const tripExists = await Trip.findById(tripId);
      if (!tripExists) {
        return res.status(404).json({ message: "Voyage non trouvé" });
      }
  
      // CREER
      const newItem = new Item({
        name,
        quantity,
        status,
        tripId 
      });
  
      await newItem.save(); 
      
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'ajout de l'item", error });
    }
  };



// AFFICHER
exports.getItemsByTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const items = await Item.find({ tripId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des items", error });
  }
};

// MAJ
exports.updateItem = async (req, res) => {
  try {
    const { name, quantity, status } = req.body;
    const itemId = req.params.itemId;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, quantity, status },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item non trouvé" });
    }

    res.status(200).json({ message: "Item mis à jour avec succès", item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'item", error });
  }
};


// SUPP
exports.deleteItem = async (req, res) => {
    try {
      const itemId = req.params.itemId; 
  
      const deletedItem = await Item.findByIdAndDelete(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ message: "Item non trouvé" });
      }
  
      res.status(200).json({ message: "Item supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de l'item", error });
    }
  };
  
const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../middlewares/authMiddleware"); // VERIF USER CONN

// ADD
router.post("/:tripId/items", authMiddleware, itemController.addItem);

// AFFICHER
router.get("/:tripId/items", authMiddleware, itemController.getItemsByTrip);

// MAJ
router.put("/:tripId/items/:itemId", authMiddleware, itemController.updateItem);

// SUPP
router.delete("/:tripId/items/:itemId", authMiddleware, itemController.deleteItem);

module.exports = router;


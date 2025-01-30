const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", tripController.createTrip);
router.get("/", tripController.getAllTripsForUser);
router.get("/:tripId", tripController.getTripById);
router.post("/:tripId/items", tripController.addItemToTrip);
router.put("/:tripId/items/:itemId", tripController.updateItemInTrip);
router.delete("/:tripId/items/:itemId", tripController.deleteItemFromTrip);

module.exports = router;

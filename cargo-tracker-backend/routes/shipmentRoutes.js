const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

// Get all shipments
router.get("/shipments", async (req, res) => {
    const shipments = await Shipment.find();
    res.json(shipments);
});

// Get a specific shipment
router.get("/shipment/:id", async (req, res) => {
    const shipment = await Shipment.findById(req.params.id);
    res.json(shipment);
});

// Create a new shipment
router.post("/shipment", async (req, res) => {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    res.json(newShipment);
});

// Update shipment location
router.post("/shipment/:id/update-location", async (req, res) => {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).send("Shipment not found");

    shipment.currentLocation = req.body.currentLocation;
    await shipment.save();
    res.json(shipment);
});

// Get ETA of shipment
router.get("/shipment/:id/eta", async (req, res) => {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).send("Shipment not found");

    res.json({ eta: shipment.eta });
});

module.exports = router;

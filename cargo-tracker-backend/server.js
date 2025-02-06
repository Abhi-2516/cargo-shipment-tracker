const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cargoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// Define Shipment Schema and Model
const shipmentSchema = new mongoose.Schema({
    shipmentId: String,
    containerId: String,
    route: [String], // Array of locations
    currentLocation: String,
    currentETA: String,
    status: String
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

// Get all shipments
app.get("/api/shipments", async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.json(shipments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific shipment by ID
app.get("/api/shipment/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ message: "Shipment not found" });
        res.json(shipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new shipment
app.post("/api/shipment", async (req, res) => {
    try {
        const { shipmentId, containerId, route, currentLocation, currentETA, status } = req.body;
        const newShipment = new Shipment({ shipmentId, containerId, route, currentLocation, currentETA, status });
        await newShipment.save();
        res.status(201).json(newShipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update shipment location
app.post("/api/shipment/:id/update-location", async (req, res) => {
    try {
        const { currentLocation } = req.body;
        const updatedShipment = await Shipment.findByIdAndUpdate(req.params.id, { currentLocation }, { new: true });
        if (!updatedShipment) return res.status(404).json({ message: "Shipment not found" });
        res.json(updatedShipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get ETA for a shipment
app.get("/api/shipment/:id/eta", async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ message: "Shipment not found" });
        res.json({ ETA: shipment.currentETA });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

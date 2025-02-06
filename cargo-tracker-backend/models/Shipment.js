const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
    shipmentId: String,
    containerId: String,
    route: [String], // Array of locations
    currentLocation: String,
    eta: String,
    status: String
});

module.exports = mongoose.model("Shipment", shipmentSchema);

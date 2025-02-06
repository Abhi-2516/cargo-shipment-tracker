db.shipments.insertOne({
    shipmentId: "SHP002",
    containerId: "CONT456",
    route: ["Los Angeles", "Tokyo", "Dubai"],
    currentLocation: "Los Angeles",
    eta: "2025-02-20",
    status: "On the Way"
})

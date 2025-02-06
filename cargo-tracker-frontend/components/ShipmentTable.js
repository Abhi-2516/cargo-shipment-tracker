import React from "react";
import { useSelector } from "react-redux";
import './ShipmentTable.css';

const ShipmentTable = () => {
    const shipments = useSelector((state) => state.shipments || []);

    return (
        <div className="shipment-table-container">
            <h2>Shipment List</h2>
            <table className="shipment-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Container</th>
                        <th>Location</th>
                        <th>ETA</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.length > 0 ? (
                        shipments.map((shipment) => (
                            <tr key={shipment.shipmentId}>
                                <td>{shipment.shipmentId}</td>
                                <td>{shipment.containerId}</td>
                                <td>{shipment.currentLocation}</td>
                                <td>{new Date(shipment.eta).toLocaleString()}</td>
                                <td className={`status ${shipment.status ? shipment.status.toLowerCase() : ''}`}>
                                    {shipment.status || 'Unknown'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">No Shipments Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShipmentTable;

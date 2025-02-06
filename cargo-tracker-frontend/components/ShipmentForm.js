import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setShipments } from "../store/shipmentSlice";
import axios from "axios";
import "./ShipmentForm.css"; // Import the CSS for styling

const ShipmentForm = ({ isVisible, toggleForm }) => {
    const dispatch = useDispatch();
    const [newShipment, setNewShipment] = useState({
        shipmentId: '',
        containerId: '',
        currentLocation: '',
        eta: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewShipment({ ...newShipment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/shipments", newShipment);
            dispatch(setShipments((prev) => [...prev, response.data]));
            setNewShipment({ shipmentId: '', containerId: '', currentLocation: '', eta: '', status: '' });
            toggleForm(); // Hide form after submission
        } catch (error) {
            console.error("Error adding shipment:", error);
        }
    };

    return (
        <div className={`shipment-form ${isVisible ? '' : 'hidden'}`}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="shipmentId"
                    placeholder="Shipment ID"
                    value={newShipment.shipmentId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="containerId"
                    placeholder="Container ID"
                    value={newShipment.containerId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="currentLocation"
                    placeholder="Current Location"
                    value={newShipment.currentLocation}
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="eta"
                    value={newShipment.eta}
                    onChange={handleChange}
                    required
                />
                <select
                    name="status"
                    value={newShipment.status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In-Transit">In-Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button type="submit" className="add-button">Add Shipment</button>
            </form>
        </div>
    );
};

export default ShipmentForm;

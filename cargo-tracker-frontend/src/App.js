import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShipments } from "./store/shipmentSlice";
import axios from "axios";
import ShipmentForm from "./components/ShipmentForm";
import ShipmentTable from "./components/ShipmentTable";
import ShipmentMap from "./components/ShipmentMap";
import "./App.css";

function App() {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState(false); // State to toggle form visibility

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/shipments");
                dispatch(setShipments(response.data));
            } catch (error) {
                console.error("Error fetching shipments:", error);
            }
        };

        fetchShipments();
    }, [dispatch]);

    const toggleFormVisibility = () => {
        setFormVisible((prev) => !prev); // Toggle form visibility
    };

    return (
        <div className="container">
            <h1 className="title">Cargo Tracker</h1>
            <button onClick={toggleFormVisibility} className="toggle-form-button">
                {formVisible ? "Cancel" : "Add Shipment"}
            </button>
            <ShipmentForm isVisible={formVisible} toggleForm={toggleFormVisibility} />
            <ShipmentTable />
            <ShipmentMap />
        </div>
    );
}

export default App;

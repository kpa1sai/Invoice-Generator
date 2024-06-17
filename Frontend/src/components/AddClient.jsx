import axios from "axios";
import React, { useState } from "react";
import "./styles/AddClient.css";

function AddClient() {
  const initialSupplierId = localStorage.getItem('supplierId') || null;

  const [client, setClient] = useState({
    customer_name: "",
    customer_type: "",
    supplier: initialSupplierId, // Set initial state to the supplierId from local storage if available
    address_id: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prevClient => ({ ...prevClient, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/customers/", client)
      .then((response) => {
        alert("Client added successfully");
        const existingClients = JSON.parse(localStorage.getItem("clients")) || [];
        existingClients.push(client);
        localStorage.setItem("clients", JSON.stringify(existingClients));
        setClient({
          customer_name: "",
          customer_type: "",
          supplier: initialSupplierId, // Reset to initialSupplierId if needed or set to null
          address_id: null
        });
      })
      .catch((error) => {
        console.error("Error adding client:", error);
        alert("Failed to add client. Check console for details.");
      });
  };

  return (
    <div className="client-form content">
      <h2>Add Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            name="customer_name"
            value={client.customer_name}
            onChange={handleChange}
            placeholder="Customer Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Customer Type</label>
          <input
            type="text"
            name="customer_type"
            value={client.customer_type}
            onChange={handleChange}
            placeholder="Customer Type"
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier (ID or boolean)</label>
          <input
            type="text"
            name="supplier"
            value={client.supplier}
            onChange={handleChange}
            placeholder="Supplier ID or true/false"
            required
          />
        </div>
        <div className="form-group">
          <label>Address ID</label>
          <input
            type="number"
            name="address_id"
            value={client.address_id}
            onChange={handleChange}
            placeholder="Address ID"
            required
          />
        </div>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}

export default AddClient;

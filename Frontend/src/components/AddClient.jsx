import React, { useState } from "react";
import "./styles/AddClient.css";

function AddClient({ addClient }) {
  const [client, setClient] = useState({
    customer_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedClients = JSON.parse(localStorage.getItem("clients")) || [];
    const newClients = [...storedClients, client];
    localStorage.setItem("clients", JSON.stringify(newClients));
    alert("Client saved successfully");
    addClient(client);
    setClient({
      customer_name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
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
          <label>Contact Person</label>
          <input
            type="text"
            name="contact_person"
            value={client.contact_person}
            onChange={handleChange}
            placeholder="Contact Person"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={client.address}
            onChange={handleChange}
            placeholder="Address"
            required
          ></textarea>
        </div>
        <button type="submit">Save Client</button>
      </form>
    </div>
  );
}

export default AddClient;

import axios from "axios";
import React, { useState } from "react";
import "./styles/AddClient.css";

function AddClient() {
  const [client, setClient] = useState({
    name: "",
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
    axios
      .post("http://localhost:5000/api/clients", client)
      .then((response) => {
        alert("Client added successfully");
        setClient({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      })
      .catch((error) => console.error("Error adding client:", error));
  };

  return (
    <div className="client-form content">
      <h2>Add Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder="Client Name"
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
            placeholder="Client Email"
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
            placeholder="Client Phone"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={client.address}
            onChange={handleChange}
            placeholder="Client Address"
            required
          />
        </div>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}

export default AddClient;

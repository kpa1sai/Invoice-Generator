import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SupplierProfile.css";

function SupplierProfile() {
  const [profile, setProfile] = useState({
    username: "",            // Renamed from supplierName to username to match backend
    supplier_name: "",       // Matches the API field
    supplier_logo: null,     // Changed from logo to supplier_logo
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setProfile((prevProfile) => ({ ...prevProfile, supplier_logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("supplier_name", profile.supplier_name);
    formData.append("supplier_logo", profile.supplier_logo);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/suppliers/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile created successfully");
      localStorage.setItem('supplierId', response.data.supplierId); // Assuming response contains a supplierId field
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError("Failed to create profile: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Create Supplier Profile</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Supplier Name:</label>
            <input
              type="text"
              name="supplier_name"
              value={profile.supplier_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Logo:</label>
            <input
              type="file"
              name="supplier_logo"
              onChange={handleLogoChange}
              accept="image/*"
            />
          </div>
          <button type="submit">Create Profile</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SupplierProfile;

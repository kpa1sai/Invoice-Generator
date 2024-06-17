import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SupplierProfile.css";

function SupplierProfile() {
  const [profile, setProfile] = useState({
    supplierName: "",
    supplierEmail: "",
    logo: null,
    addressId: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setProfile((prevProfile) => ({ ...prevProfile, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("supplierName", profile.supplierName);
    formData.append("supplierEmail", profile.supplierEmail);
    formData.append("addressId", profile.addressId);
    formData.append("logo", profile.logo);

    try {
      await axios.post("http://localhost:5000/api/supplier", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError("Failed to create profile");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Create Supplier Profile</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="supplierName"
              value={profile.supplierName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="supplierEmail"
              value={profile.supplierEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="addressId"
              value={profile.addressId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Logo:</label>
            <input
              type="file"
              name="logo"
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

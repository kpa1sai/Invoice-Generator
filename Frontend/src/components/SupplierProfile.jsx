import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import './styles/SupplierProfile.css';

function SupplierProfile() {
  const [profile, setProfile] = useState({
<<<<<<< HEAD
    username: "",            // Renamed from supplierName to username to match backend
    supplier_name: "",       // Matches the API field
    supplier_logo: null,     // Changed from logo to supplier_logo
=======
    supplierName: '',
    supplierEmail: '',
    logo: null,
    addressId: ''
>>>>>>> origin/main
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setProfile((prevProfile) => ({ ...prevProfile, supplier_logo: e.target.files[0] }));
  };

  const handleAddressSave = (address) => {
    setProfile((prevProfile) => ({ ...prevProfile, addressId: address.id }));
    setShowAddressForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("supplier_name", profile.supplier_name);
    formData.append("supplier_logo", profile.supplier_logo);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/suppliers/", formData, {
=======
    const formData = {
      supplier_name: profile.supplierName,
      username: profile.supplierEmail,
      addressId: profile.addressId,
      logo: profile.logo
    };

    try {
      await axios.post('http://localhost:8000/api/suppliers', formData, {
>>>>>>> origin/main
        headers: {
          'Content-Type': 'application/json'
        }
      });
<<<<<<< HEAD
      alert("Profile created successfully");
      localStorage.setItem('supplierId', response.data.supplierId); // Assuming response contains a supplierId field
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError("Failed to create profile: " + (error.response ? error.response.data.message : error.message));
=======
      alert('Profile created successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      setError('Failed to create profile');
>>>>>>> origin/main
    }
  };

  return (
    <div className='container'>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <h2>Create Supplier Profile</h2>
<<<<<<< HEAD
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={profile.username}
=======
          <div className='form-group'>
            <label>Name:</label>
            <input
              type='text'
              name='supplierName'
              value={profile.supplierName}
>>>>>>> origin/main
              onChange={handleChange}
              required
            />
          </div>
<<<<<<< HEAD
          <div className="form-group">
            <label>Supplier Name:</label>
            <input
              type="text"
              name="supplier_name"
              value={profile.supplier_name}
=======
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              name='supplierEmail'
              value={profile.supplierEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Address:</label>
            <input
              type='text'
              name='addressId'
              value={profile.addressId}
>>>>>>> origin/main
              onChange={handleChange}
              readOnly
            />
            <button type='button' onClick={() => setShowAddressForm(true)}>
              {profile.addressId ? 'Update Address' : 'Add Address'}
            </button>
          </div>
          <div className='form-group'>
            <label>Upload Logo:</label>
            <input
<<<<<<< HEAD
              type="file"
              name="supplier_logo"
=======
              type='file'
              name='logo'
>>>>>>> origin/main
              onChange={handleLogoChange}
              accept='image/*'
            />
          </div>
          <button type='submit'>Create Profile</button>
          {error && <p className='error'>{error}</p>}
        </form>
        {showAddressForm && (
          <AddressForm
            addressId={profile.addressId}
            onSave={handleAddressSave}
          />
        )}
      </div>
    </div>
  );
}

export default SupplierProfile;

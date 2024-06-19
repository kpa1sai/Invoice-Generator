import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import './styles/SupplierProfile.css';

function SupplierProfile() {
  const [profile, setProfile] = useState({
    supplierName: '',
    supplierEmail: '',
    logo: null,
    addressId: '',
    customerName: '',
    customerType: 'Individual',
    createdAt: new Date().toISOString().slice(0, 10), // default to today's date
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setProfile((prevProfile) => ({ ...prevProfile, logo: e.target.files[0] }));
  };

  const handleAddressSave = (address) => {
    setProfile((prevProfile) => ({ ...prevProfile, addressId: address.id }));
    setShowAddressForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedProfiles = JSON.parse(localStorage.getItem("suppliers")) || [];
    const newProfile = { ...profile, id: Date.now() }; // Assign a unique ID based on the current timestamp
    const newProfiles = [...storedProfiles, newProfile];
    localStorage.setItem("suppliers", JSON.stringify(newProfiles));

    alert('Profile created successfully');
    navigate('/dashboard');
  };

  return (
    <div className='container'>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <h2>Create Supplier Profile</h2>
          <div className='form-group'>
            <label>Name:</label>
            <input
              type='text'
              name='supplierName'
              value={profile.supplierName}
              onChange={handleChange}
              required
            />
          </div>
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
            <label>Customer Name:</label>
            <input
              type='text'
              name='customerName'
              value={profile.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Customer Type:</label>
            <select
              name='customerType'
              value={profile.customerType}
              onChange={handleChange}
            >
              <option value='Individual'>Individual</option>
              <option value='Business'>Business</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Created At:</label>
            <input
              type='date'
              name='createdAt'
              value={profile.createdAt}
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
              type='file'
              name='logo'
              onChange={handleLogoChange}
              accept='image/*'
            />
          </div>
          <button type='submit'>Create Profile</button>
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

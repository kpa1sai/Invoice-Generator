import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import './styles/SupplierProfile.css';

function SupplierProfile() {
  const [profile, setProfile] = useState({
    supplierName: '',
    supplierEmail: '',
    logo: null,
    addressId: ''
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [error, setError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      supplier_name: profile.supplierName,
      username: profile.supplierEmail,
      addressId: profile.addressId,
      logo: profile.logo
    };

    try {
      await axios.post('http://localhost:8000/api/suppliers', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Profile created successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      setError('Failed to create profile');
    }
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressForm = ({ addressId, onSave }) => {
  const [address, setAddress] = useState({
    email: '',
    primary_mobile: '',
    address_line_1: '',
    address_line_2: '',
    address_type: 'Individual',
    zip_code: '',
    city: '',
    state: '',
    country: ''
  });

  useEffect(() => {
    if (addressId) {
      axios
        .get(`http://localhost:5000/api/addresses/${addressId}/`)
        .then((response) => setAddress(response.data))
        .catch((error) => console.error(error));
    }
  }, [addressId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressId) {
      axios
        .put(`http://localhost:8000/api/addresses/${addressId}/`, address)
        .then((response) => onSave(response.data))
        .catch((error) => console.error(error));
    } else {
      axios
        .post('http://localhost:8000/api/addresses/', address)
        .then((response) => onSave(response.data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={address.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Primary Mobile:</label>
        <input
          type='text'
          name='primary_mobile'
          value={address.primary_mobile}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Address Line 1:</label>
        <input
          type='text'
          name='address_line_1'
          value={address.address_line_1}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Address Line 2:</label>
        <input
          type='text'
          name='address_line_2'
          value={address.address_line_2}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Address Type:</label>
        <input
          type='text'
          name='address_type'
          value={address.address_type}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Zip Code:</label>
        <input
          type='text'
          name='zip_code'
          value={address.zip_code}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>City:</label>
        <input
          type='text'
          name='city'
          value={address.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>State:</label>
        <input
          type='text'
          name='state'
          value={address.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Country:</label>
        <input
          type='text'
          name='country'
          value={address.country}
          onChange={handleChange}
          required
        />
      </div>
      <button type='submit'>Save Address</button>
    </form>
  );
};

export default AddressForm;

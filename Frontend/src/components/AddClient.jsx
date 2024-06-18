import axios from 'axios';
import React, { useState } from 'react';
import AddressForm from './AddressForm';
import './styles/AddClient.css';

function AddClient() {
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    addressId: ''
  });

  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleAddressSave = (address) => {
    setClient((prevClient) => ({ ...prevClient, addressId: address.id }));
    setShowAddressForm(false);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/clients', client, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        alert('Client added successfully');
        setClient({
          name: '',
          email: '',
          phone: '',
          addressId: ''
        });
      })
      .catch((error) => console.error('Error adding client:', error));
  };

  return (
    <div className='client-form content'>
      <h2>Add Client</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={client.name}
            onChange={handleChange}
            placeholder='Client Name'
            required
          />
        </div>
        <div className='form-group'>
          <label>Customer Type</label>
          <input
            type='text'
            name='ctype'
            value={client.ctype}
            onChange={handleChange}
            placeholder='Individual / Business'
            required
          />
        </div>
        <div className='form-group'>
          <label>Address</label>
          <input
            type='text'
            name='addressId'
            value={client.addressId}
            onChange={handleChange}
            readOnly
          />
          <button type='button' onClick={() => setShowAddressForm(true)}>
            {client.addressId ? 'Update Address' : 'Add Address'}
          </button>
        </div>
        <button type='submit'>Add Client</button>
      </form>
      {showAddressForm && (
        <AddressForm addressId={client.addressId} onSave={handleAddressSave} />
      )}
    </div>
  );
}

export default AddClient;

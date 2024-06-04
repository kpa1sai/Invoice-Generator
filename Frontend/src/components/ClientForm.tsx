import React, { useState } from 'react';
import '../styles/ClientForm.css';

const ClientForm: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim() === '') {
      setError('Client name is required.');
    } else {
      setError('');
      // Submit the form
      console.log('Client added:', clientName);
      setClientName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <h2>Add New Client</h2>
      <div className="form-group">
        <label htmlFor="clientName">Client Name</label>
        <input
          type="text"
          id="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className={`form-control ${error ? 'is-invalid' : ''}`}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Add Client</button>
    </form>
  );
};

export default ClientForm;

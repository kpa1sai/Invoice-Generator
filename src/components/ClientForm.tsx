import React, { useState } from 'react';

const ClientForm: React.FC = () => {
  const [clientName, setClientName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <h2>Add New Client</h2>
      <div>
        <label>Client Name</label>
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </div>
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;

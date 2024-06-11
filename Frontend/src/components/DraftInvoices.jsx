import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DraftInvoices() {
  const [draftInvoices, setDraftInvoices] = useState([]);

  useEffect(() => {
    // Fetch draft invoices from the API
    axios.get('http://localhost:5000/api/draft-invoices')
      .then(response => {
        setDraftInvoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching draft invoices:', error);
      });
  }, []);

  return (
    <div>
      <h2>Draft Invoices</h2>
      <ul>
        {draftInvoices.map(invoice => (
          <li key={invoice.id}>
            <div>Invoice #: {invoice.invoiceNumber}</div>
            <div>Date: {invoice.date}</div>
            <div>Client: {invoice.clientName}</div>
            {/* Add more invoice details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DraftInvoices;

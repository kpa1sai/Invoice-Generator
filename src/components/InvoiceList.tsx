import React from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';

const InvoiceList: React.FC = () => {
  const { invoices } = useInvoiceContext();

  return (
    <div className="invoice-list">
      <h2>Invoice List</h2>
      {invoices.length > 0 ? (
        invoices.map(invoice => (
          <div key={invoice.id} className="invoice-item">
            <p>{invoice.clientName} - ${invoice.amount.toFixed(2)} ({invoice.status})</p>
          </div>
        ))
      ) : (
        <p>No invoices available.</p>
      )}
    </div>
  );
};

export default InvoiceList;

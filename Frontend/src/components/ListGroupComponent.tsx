import React from 'react';
import '../styles/ListGroupComponent.css';

interface InvoiceData {
  id: number;
  clientName: string;
  amount: number;
}

interface ListGroupProps {
  invoices: InvoiceData[];
  onSelect: (invoice: InvoiceData) => void;
}

const ListGroupComponent: React.FC<ListGroupProps> = ({ invoices, onSelect }) => {
  return (
    <div className="list-group">
      {invoices.map((invoice) => (
        <button 
          key={invoice.id} 
          onClick={() => onSelect(invoice)}
          className="list-group-item list-group-item-action"
          style={{ margin: '5px 0', textAlign: 'left' }}
        >
          {invoice.clientName} - ${invoice.amount.toFixed(2)}
        </button>
      ))}
    </div>
  );
};

export default ListGroupComponent;


import React, { useState } from 'react';
import ListGroupComponent from './components/ListGroupComponent';
import ClientForm from './components/ClientForm';
import InvoiceFormComponent from './components/InvoiceFormComponent';

interface InvoiceData {
  id: number;
  clientName: string;
  amount: number;
}

const App: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

  const invoices: InvoiceData[] = [
    { id: 1, clientName: 'John Doe', amount: 123.45 },
    { id: 2, clientName: 'Jane Smith', amount: 678.90 },
    // Add more invoices as needed
  ];

  const handleSelect = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div className="App">
      <h1>Invoices</h1>
      <ListGroupComponent invoices={invoices} onSelect={handleSelect} />
      {selectedInvoice && (
        <div>
          <h2>Selected Invoice</h2>
          <p>Client: {selectedInvoice.clientName}</p>
          <p>Amount: ${selectedInvoice.amount.toFixed(2)}</p>
        </div>
      )}
      <ClientForm />
      <InvoiceFormComponent />
    </div>
  );
};

export default App;

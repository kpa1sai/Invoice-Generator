import React, { useState } from 'react';
import ClientForm from './components/ClientForm';
import DeleteInvoice from './components/DeleteInvoice';
import EditInvoice from './components/EditInvoice';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import ListGroupComponent from './components/ListGroupComponent';
import { InvoiceContextProvider } from './context/InvoiceContext';
import './styles/App.css';

const App: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <ClientForm />
        <InvoiceContextProvider>
          <InvoiceForm />
          <InvoiceList />
          {selectedInvoice && (
            <>
              <EditInvoice invoiceId={selectedInvoice} />
              <DeleteInvoice invoiceId={selectedInvoice} onDelete={() => setSelectedInvoice(null)} />
            </>
          )}
          <ListGroupComponent
            invoices={[
              // Example data, replace with your actual invoice data
              { id: 1, clientName: 'Client A', amount: 100 },
              { id: 2, clientName: 'Client B', amount: 200 },
            ]}
            onSelect={(invoice) => setSelectedInvoice(invoice.id)}
          />
        </InvoiceContextProvider>
      </div>
    </div>
  );
};

export default App;

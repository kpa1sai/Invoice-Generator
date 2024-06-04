import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Client {
  id: number;
  name: string;
}

interface Invoice {
  id: number;
  clientName: string;
  amount: number;
  status: string;
  draft: boolean;
  date: string;
  tax?: number;
  discount?: number;
}

interface InvoiceContextProps {
  clients: Client[];
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoiceContext must be used within an InvoiceContextProvider');
  }
  return context;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceContextProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [clients] = useState<Client[]>([
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const addInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };

  return (
    <InvoiceContext.Provider value={{ clients, invoices, addInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

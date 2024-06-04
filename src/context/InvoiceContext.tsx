import React, { createContext, useContext, ReactNode } from 'react';
import { useInvoiceLogic } from './InvoiceLogic'; 

interface InvoiceData {
  id: number;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  draft: boolean;
  date: string;
  tax?: number;
  discount?: number;
}

interface ClientData {
  id: number;
  name: string;
  email: string;
}

interface InvoiceContextProps {
  invoices: InvoiceData[];
  clients: ClientData[];
  addInvoice: (invoice: InvoiceData) => void;
  updateInvoice: (invoice: InvoiceData) => void;
  deleteInvoice: (id: number) => void;
  addClient: (client: ClientData) => void;
  getInvoices: () => InvoiceData[];
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const invoiceLogic = useInvoiceLogic();

  return (
    <InvoiceContext.Provider value={invoiceLogic}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = (): InvoiceContextProps => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoiceContext must be used within an InvoiceProvider');
  }
  return context;
};

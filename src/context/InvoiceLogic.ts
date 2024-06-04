
import { useState } from 'react';

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

export const useInvoiceLogic = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [clients, setClients] = useState<ClientData[]>([]);

  const addInvoice = (invoice: InvoiceData) => {
    setInvoices([...invoices, invoice]);
  };

  const updateInvoice = (updatedInvoice: InvoiceData) => {
    setInvoices(invoices.map(invoice => (invoice.id === updatedInvoice.id ? updatedInvoice : invoice)));
  };

  const deleteInvoice = (id: number) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const addClient = (client: ClientData) => {
    setClients([...clients, client]);
  };

  const getInvoices = () => {
    return invoices;
  };

  return {
    invoices,
    clients,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addClient,
    getInvoices
  };
};

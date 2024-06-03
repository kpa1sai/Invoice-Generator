import React, { useState } from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';

const InvoiceForm: React.FC = () => {
  const { addInvoice, clients } = useInvoiceContext();
  const [clientId, setClientId] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [draft, setDraft] = useState(false);
  const [tax, setTax] = useState<number | undefined>(undefined);
  const [discount, setDiscount] = useState<number | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientId && amount !== undefined) {
      const client = clients.find(client => client.id === clientId);
      if (client) {
        addInvoice({
          id: Date.now(),
          clientName: client.name,
          amount,
          status: 'pending',
          draft,
          date: new Date().toISOString(),
          tax,
          discount,
        });
        setClientId(undefined);
        setAmount(undefined);
        setDraft(false);
        setTax(undefined);
        setDiscount(undefined);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>Create New Invoice</h2>
      <div>
        <label>Client</label>
        <select value={clientId} onChange={(e) => setClientId(Number(e.target.value))}>
          <option value={undefined}>Select a client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div>
        <label>Save as Draft</label>
        <input type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} />
      </div>
      <div>
        <label>Tax</label>
        <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
      </div>
      <div>
        <label>Discount</label>
        <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
      </div>
      <button type="submit">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;

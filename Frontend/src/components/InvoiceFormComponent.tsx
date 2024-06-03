import React, { useState } from 'react';

const InvoiceFormComponent: React.FC = () => {
  const [invoice, setInvoice] = useState({
    id: '',
    clientName: '',
    shipTo: '',
    date: '',
    paymentTerms: '',
    dueDate: '',
    poNumber: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number) => {
    if (index !== undefined) {
      const items = [...invoice.items];
      items[index] = { ...items[index], [field]: e.target.value };
      setInvoice({ ...invoice, items });
    } else {
      setInvoice({ ...invoice, [field]: e.target.value });
    }
  };

  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 1, rate: 0 }],
    });
  };

  return (
    <div className="invoice-form">
      <h1>INVOICE</h1>
      <div className="invoice-header">
        <div className="invoice-logo">
          <div className="add-logo">+ Add Your Logo</div>
        </div>
        <div className="invoice-info">
          <div className="invoice-number">
            <label>#</label>
            <input
              type="text"
              value={invoice.id}
              onChange={(e) => handleChange(e, 'id')}
            />
          </div>
          <div className="invoice-date">
            <label>Date</label>
            <input
              type="text"
              value={invoice.date}
              onChange={(e) => handleChange(e, 'date')}
            />
          </div>
          <div className="invoice-terms">
            <label>Payment Terms</label>
            <input
              type="text"
              value={invoice.paymentTerms}
              onChange={(e) => handleChange(e, 'paymentTerms')}
            />
          </div>
          <div className="invoice-due-date">
            <label>Due Date</label>
            <input
              type="text"
              value={invoice.dueDate}
              onChange={(e) => handleChange(e, 'dueDate')}
            />
          </div>
          <div className="invoice-po-number">
            <label>PO Number</label>
            <input
              type="text"
              value={invoice.poNumber}
              onChange={(e) => handleChange(e, 'poNumber')}
            />
          </div>
        </div>
      </div>
      <div className="invoice-address">
        <div className="bill-to">
          <label>Bill To</label>
          <input
            type="text"
            value={invoice.clientName}
            onChange={(e) => handleChange(e, 'clientName')}
          />
        </div>
        <div className="ship-to">
          <label>Ship To</label>
          <input
            type="text"
            value={invoice.shipTo}
            onChange={(e) => handleChange(e, 'shipTo')}
          />
        </div>
      </div>
      <div className="invoice-items">
        <div className="item-header">
          <label>Item</label>
          <label>Quantity</label>
          <label>Rate</label>
          <label>Amount</label>
        </div>
        {invoice.items.map((item, index) => (
          <div className="item-row" key={index}>
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleChange(e, 'description', index)}
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(e, 'quantity', index)}
            />
            <input
              type="number"
              value={item.rate}
              onChange={(e) => handleChange(e, 'rate', index)}
            />
            <input
              type="number"
              value={item.quantity * item.rate}
              readOnly
            />
          </div>
        ))}
        <button onClick={handleAddItem}>+ Line Item</button>
      </div>
      <div className="invoice-subtotal">
        <label>Subtotal</label>
        <input
          type="number"
          value={invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0)}
          readOnly
        />
      </div>
    </div>
  );
};

export default InvoiceFormComponent;

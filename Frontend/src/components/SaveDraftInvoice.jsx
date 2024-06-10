import React, { useState } from 'react';
import axios from 'axios';

function SaveDraftInvoice() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    clientName: '',
    items: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { name: '', description: '', quantity: 1, rate: 0 }],
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...invoiceData.items];
    updatedItems[index][name] = value;
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const saveDraft = async () => {
    try {
      console.log('Saving draft with data:', invoiceData);
      const response = await axios.post('http://localhost:5000/api/invoices/save-draft', invoiceData);
      console.log('Response:', response);
      alert('Invoice saved as draft successfully');
    } catch (error) {
      console.error('Error saving invoice as draft:', error);
      alert('Failed to save invoice as draft');
    }
  };

  return (
    <div>
      <h2>Save Invoice as Draft</h2>
      <label>
        Invoice Number:
        <input type="text" name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        Invoice Date:
        <input type="date" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleChange} />
      </label>
      <br />
      <label>
        Due Date:
        <input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleChange} />
      </label>
      <br />
      <label>
        Client Name:
        <input type="text" name="clientName" value={invoiceData.clientName} onChange={handleChange} />
      </label>
      <br />
      <h3>Invoice Items</h3>
      {invoiceData.items.map((item, index) => (
        <div key={index}>
          <label>
            Item Name:
            <input type="text" name="name" value={item.name} onChange={(e) => handleItemChange(index, e)} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
          </label>
          <label>
            Rate:
            <input type="number" name="rate" value={item.rate} onChange={(e) => handleItemChange(index, e)} />
          </label>
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>
      <br />
      <button onClick={saveDraft}>Save Draft</button>
    </div>
  );
}

export default SaveDraftInvoice;

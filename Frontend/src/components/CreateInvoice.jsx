import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/CreateInvoice.css";

function CreateInvoice() {
  const location = useLocation();
  const [invoice, setInvoice] = useState(location.state?.invoice || {
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    clientName: "",
    items: [{ item_name: "", item_description: "", quantity: 1, price: 0, tax_rate: 0 }],
    logo: null,
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadedClients = JSON.parse(localStorage.getItem("clients")) || [];
    setClients(loadedClients);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...invoice.items];
    newItems[index][name] = value;
    setInvoice((prevInvoice) => ({ ...prevInvoice, items: newItems }));
  };

  const handleAddItem = () => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      items: [...prevInvoice.items, { item_name: "", item_description: "", quantity: 1, price: 0, tax_rate: 0 }],
    }));
  };

  const handleRemoveItem = (index) => {
    const newItems = invoice.items.filter((item, i) => i !== index);
    setInvoice((prevInvoice) => ({ ...prevInvoice, items: newItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const newInvoices = [...storedInvoices, { ...invoice, isDraft: false }];
    localStorage.setItem("invoices", JSON.stringify(newInvoices));
    alert("Invoice saved successfully");
    setInvoice({
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      clientName: "",
      items: [{ item_name: "", item_description: "", quantity: 1, price: 0, tax_rate: 0 }],
      logo: null,
    });
  };

  const handleSaveDraft = () => {
    const storedDrafts = JSON.parse(localStorage.getItem("drafts")) || [];
    const newDrafts = [...storedDrafts, { ...invoice, isDraft: true }];
    localStorage.setItem("drafts", JSON.stringify(newDrafts));
    alert("Draft saved successfully");
    setInvoice({
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      clientName: "",
      items: [{ item_name: "", item_description: "", quantity: 1, price: 0, tax_rate: 0 }],
      logo: null,
    });
  };

  return (
    <div className="invoice-form content">
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Invoice #</label>
            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleChange}
              placeholder="Invoice Number"
              required
            />
          </div>
          <div className="form-group">
            <label>Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              value={invoice.invoiceDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Bill to:</label>
            <select
              name="clientName"
              value={invoice.clientName}
              onChange={handleChange}
              required
            >
              <option value="">Select a Client</option>
              {clients.map((client, index) => (
                <option key={index} value={client.customer_name}>
                  {client.customer_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={invoice.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="items-section">
          <h3>Items</h3>
          {invoice.items.map((item, index) => (
            <div key={index} className="item-row">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  name="item_name"
                  value={item.item_name}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Item Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Item Description</label>
                <input
                  type="text"
                  name="item_description"
                  value={item.item_description}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Item Description"
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Quantity"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Price"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tax Rate (%)</label>
                <input
                  type="number"
                  name="tax_rate"
                  value={item.tax_rate}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Tax Rate"
                  required
                />
              </div>
              <button type="button" onClick={() => handleRemoveItem(index)}>
                Remove Item
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddItem}>
            Add Item
          </button>
        </div>

        <button type="submit">Generate Invoice</button>
        <button type="button" onClick={handleSaveDraft}>
          Save as Draft
        </button>
      </form>
    </div>
  );
}

export default CreateInvoice;

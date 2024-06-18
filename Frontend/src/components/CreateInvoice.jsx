import axios from "axios";
import React, { useState } from "react";
import "./styles/CreateInvoice.css";

function CreateInvoice() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    clientName: "",
    items: [{ name: "", description: "", quantity: 1, rate: 0 }],
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    items[index][name] = value;
    setInvoice((prevInvoice) => ({ ...prevInvoice, items }));
  };

  const handleLogoChange = (e) => {
    setInvoice((prevInvoice) => ({ ...prevInvoice, logo: e.target.files[0] }));
  };

  //   const handleAddItem = () => {
  //     setInvoice((prevInvoice) => ({
  //       ...prevInvoice,
  //       items: [
  //         ...prevInvoice.items,
  //         { name: "", description: "", quantity: 1, rate: 0 },
  //       ],
  //     }));
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("invoiceNumber", invoice.invoiceNumber);
    formData.append("invoiceDate", invoice.invoiceDate);
    formData.append("dueDate", invoice.dueDate);
    formData.append("clientName", invoice.clientName);
    formData.append("logo", invoice.logo);
    formData.append("items", JSON.stringify(invoice.items));

    try {
      await axios.post("http://localhost:5000/api/invoices", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Invoice saved successfully");
      // Reset form
      setInvoice({
        invoiceNumber: "",
        invoiceDate: "",
        dueDate: "",
        clientName: "",
        items: [{ name: "", description: "", quantity: 1, rate: 0 }],
        logo: null,
      });
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
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
            <input
              type="text"
              name="clientName"
              value={invoice.clientName}
              onChange={handleChange}
              placeholder="Who is this invoice for?"
              required
            />
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
        <div className="form-row">
          <div className="form-group">
            <label>Item</label>
            <input
              type="text"
              name="name"
              value={invoice.items[0].name}
              onChange={(e) => handleItemChange(0, e)}
              placeholder="Item name"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={invoice.items[0].description}
              onChange={(e) => handleItemChange(0, e)}
              placeholder="Description"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={invoice.items[0].quantity}
              onChange={(e) => handleItemChange(0, e)}
              placeholder="1"
              required
            />
          </div>
          <div className="form-group">
            <label>Rate</label>
            <input
              type="number"
              name="rate"
              value={invoice.items[0].rate}
              onChange={(e) => handleItemChange(0, e)}
              placeholder="0.00"
              required
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={(
                invoice.items[0].quantity * invoice.items[0].rate
              ).toFixed(2)}
              placeholder="0.00"
              disabled
            />
          </div>
        </div>
        <div className="form-group">
          <label>Upload Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleLogoChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
}


export default CreateInvoice;

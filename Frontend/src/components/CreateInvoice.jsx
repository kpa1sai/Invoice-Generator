import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/CreateInvoice.css";

function CreateInvoice({ addInvoice, addDraft }) {
  const location = useLocation();
  const [invoice, setInvoice] = useState(location.state?.invoice || {
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    clientName: "",
    items: [{ name: "", description: "", quantity: 1, rate: 0 }],
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
      await axios.post("http://127.0.0.1:8000/api/invoices/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Invoice saved successfully");
      addInvoice(invoice);
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

  const handleSaveDraft = () => {
    addDraft(invoice);
    alert("Draft saved successfully");
    setInvoice({
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      clientName: "",
      items: [{ name: "", description: "", quantity: 1, rate: 0 }],
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
        <button type="submit">Generate Invoice</button>
        <button type="button" onClick={handleSaveDraft}>
          Save as Draft
        </button>
      </form>
    </div>
  );
}

export default CreateInvoice;

import axios from "axios";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
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

  const [generatedInvoice, setGeneratedInvoice] = useState(null);

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
      const response = await axios.post(
        "http://localhost:5000/api/invoices",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGeneratedInvoice(response.data);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 20);
    doc.text(`Invoice Number: ${generatedInvoice.invoiceNumber}`, 20, 30);
    doc.text(`Invoice Date: ${generatedInvoice.invoiceDate}`, 20, 40);
    doc.text(`Due Date: ${generatedInvoice.dueDate}`, 20, 50);
    doc.text(`Client Name: ${generatedInvoice.clientName}`, 20, 60);

    const items = generatedInvoice.items.map((item) => [
      item.name,
      item.description,
      item.quantity,
      item.rate,
      (item.quantity * item.rate).toFixed(2),
    ]);

    doc.autoTable({
      head: [["Item", "Description", "Quantity", "Rate", "Amount"]],
      body: items,
    });

    doc.save(`Invoice_${generatedInvoice.invoiceNumber}.pdf`);
  };

  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:5000/api/send-invoice", {
        invoiceId: generatedInvoice.id,
      });
      alert("Invoice sent via email successfully");
    } catch (error) {
      console.error("Error sending invoice via email:", error);
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
        {invoice.items.map((item, index) => (
          <div className="form-row" key={index}>
            <div className="form-group">
              <label>Item</label>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="Item name"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="Description"
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Rate</label>
              <input
                type="number"
                name="rate"
                value={item.rate}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={(item.quantity * item.rate).toFixed(2)}
                placeholder="0.00"
                disabled
              />
            </div>
          </div>
        ))}
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

      {generatedInvoice && (
        <div className="invoice-preview">
          <h3>Invoice Preview</h3>
          <div>
            <strong>Invoice Number:</strong> {generatedInvoice.invoiceNumber}
          </div>
          <div>
            <strong>Invoice Date:</strong> {generatedInvoice.invoiceDate}
          </div>
          <div>
            <strong>Due Date:</strong> {generatedInvoice.dueDate}
          </div>
          <div>
            <strong>Client Name:</strong> {generatedInvoice.clientName}
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {generatedInvoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{(item.quantity * item.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDownloadPDF}>Download as PDF</button>
          <button onClick={handleSendEmail}>Send to Email</button>
        </div>
      )}
    </div>
  );
}

export default CreateInvoice;

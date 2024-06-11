import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import DraftInvoices from "./DraftInvoices"; // Import the new component
import "./styles/ViewInvoices.css";

function ViewInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewOption, setViewOption] = useState("All"); // Default view option
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/invoices")
      .then((response) => setInvoices(response.data))
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/invoices/${id}`)
      .then(() => {
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
      })
      .catch((error) => console.error("Error deleting invoice:", error));
  };

  const handleEdit = (invoice) => {
    navigate("/dashboard/create-invoice", { state: { invoice } });
  };

  const handleViewOptionChange = (option) => {
    setViewOption(option);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  let filteredInvoices = invoices;
  if (selectedDate) {
    filteredInvoices = filteredInvoices.filter(
      (invoice) => invoice.date.split("T")[0] === selectedDate
    );
  }

  if (viewOption === "Drafts") {
    return <DraftInvoices />;
  }

  return (
    <div className="view-invoices content">
      <h2>Invoices</h2>
      
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
        />
      </div>
      {selectedDate && (
        <div className="invoice-list">
          <h3>Invoices for {selectedDate}</h3>
          {filteredInvoices.length === 0 ? (
            <p>No Invoices Available</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.dueDate}</td>
                    <td>{invoice.clientName}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <button onClick={() => handleEdit(invoice)}>Edit</button>
                      <button onClick={() => handleDelete(invoice.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      <div className="options">
        <button onClick={() => handleViewOptionChange("All")}>All Invoices</button>
        <button onClick={() => handleViewOptionChange("Drafts")}>Draft Invoices</button>
      </div>
    </div>
  );
}

export default ViewInvoices;

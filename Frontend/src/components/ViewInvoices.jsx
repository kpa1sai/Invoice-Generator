import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./styles/ViewInvoices.css";

function ViewInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
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

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      const invoiceDates = invoices.map(
        (invoice) => invoice.date.split("T")[0]
      );
      if (invoiceDates.includes(dateStr)) {
        return "react-calendar__tile--highlight";
      }
    }
    return null;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const filteredInvoices = invoices.filter(
    (invoice) => invoice.date.split("T")[0] === selectedDate
  );

  return (
    <div className="view-invoices content">
      <h2>Invoices</h2>
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={getTileClassName}
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
    </div>
  );
}

export default ViewInvoices;

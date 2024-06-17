import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./styles/ViewInvoices.css";

function ViewInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [draftInvoices, setDraftInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/invoice-items/")
      .then((response) => {
        const finalInvoices = response.data.filter((invoice) => !invoice.isDraft);
        const drafts = response.data.filter((invoice) => invoice.isDraft);
        setInvoices(finalInvoices);
        setDraftInvoices(drafts);
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/invoices/${id}`)
      .then(() => {
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
        setDraftInvoices(draftInvoices.filter((invoice) => invoice.id !== id));
      })
      .catch((error) => console.error("Error deleting invoice:", error));
  };

  const handleEdit = (invoice) => {
    navigate("/create-invoice", { state: { invoice } });
  };

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      const invoiceDates = invoices.map((invoice) => invoice.invoiceDate.split("T")[0]);
      const draftDates = draftInvoices.map((invoice) => invoice.invoiceDate.split("T")[0]);
      const allDates = [...invoiceDates, ...draftDates];
      if (allDates.includes(dateStr)) {
        return "react-calendar__tile--highlight";
      }
    }
    return null;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      (!selectedDate || invoice.invoiceDate.split("T")[0] === selectedDate) &&
      (invoice.invoiceNumber.includes(searchQuery) ||
        invoice.clientName.includes(searchQuery))
  );

  const filteredDraftInvoices = draftInvoices.filter(
    (invoice) =>
      (!selectedDate || invoice.invoiceDate.split("T")[0] === selectedDate) &&
      (invoice.invoiceNumber.includes(searchQuery) ||
        invoice.clientName.includes(searchQuery))
  );

  return (
    <div className="view-invoices content">
      <h2>Invoices</h2>
      <div className="invoice-container">
        <div className="invoice-list">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h3>Invoices for {selectedDate || "All Dates"}</h3>
          {filteredInvoices.length === 0 && filteredDraftInvoices.length === 0 ? (
            <p>No Invoices Available</p>
          ) : (
            <>
              <h4>Final Invoices</h4>
              {filteredInvoices.length === 0 ? (
                <p>No Final Invoices Available</p>
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
                        <td>{invoice.invoiceDate}</td>
                        <td>{invoice.dueDate}</td>
                        <td>{invoice.clientName}</td>
                        <td>{invoice.amount}</td>
                        <td>
                          <button onClick={() => handleEdit(invoice)}>Edit</button>
                          <button onClick={() => handleDelete(invoice.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <h4>Draft Invoices</h4>
              {filteredDraftInvoices.length === 0 ? (
                <p>No Draft Invoices Available</p>
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
                    {filteredDraftInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>{invoice.invoiceNumber}</td>
                        <td>{invoice.invoiceDate}</td>
                        <td>{invoice.dueDate}</td>
                        <td>{invoice.clientName}</td>
                        <td>{invoice.amount}</td>
                        <td>
                          <button onClick={() => handleEdit(invoice)}>Edit</button>
                          <button onClick={() => handleDelete(invoice.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
        <div className="calendar-container">
          <Calendar onClickDay={handleDateClick} tileClassName={getTileClassName} />
        </div>
      </div>
    </div>
  );
}

export default ViewInvoices;

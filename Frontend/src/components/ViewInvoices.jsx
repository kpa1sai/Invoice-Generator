import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./styles/ViewInvoices.css";

function ViewInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today for initial load
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/invoices");
        const allInvoices = response.data;
        setInvoices(allInvoices.filter(invoice => !invoice.isDraft));
        setDrafts(allInvoices.filter(invoice => invoice.isDraft));
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      setInvoices(invoices.filter((invoice) => invoice.id !== id));
      setDrafts(drafts.filter((draft) => draft.id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleEdit = (invoice) => {
    navigate("/dashboard/create-invoice", { state: { invoice } });
  };

  const handleDownload = async (invoiceId) => {
    window.location.href = `http://localhost:5000/api/invoices/download/${invoiceId}`;
  };

  const handleEmail = async (invoiceId) => {
    try {
      await axios.post(`http://localhost:5000/api/invoices/email/${invoiceId}`);
      alert("Invoice emailed successfully");
    } catch (error) {
      console.error("Error emailing invoice:", error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const filteredInvoices = invoices.filter(
    (invoice) => new Date(invoice.date).toLocaleDateString() === selectedDate.toLocaleDateString()
  );

  return (
    <div className="view-invoices content">
      <div className="left-section">
        <h2>Generated Invoices</h2>
        <div className="invoice-list">
          <h3>Invoices for {selectedDate.toDateString()}</h3>
          {filteredInvoices.length === 0 ? (
            <p>No Invoices Available</p>
          ) : (
            filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="invoice-bar">
                <span className="invoice-number">#{invoice.invoiceNumber}</span>
                <span className="invoice-status">Created</span>
                <div className="invoice-actions">
                  <button onClick={() => handleEdit(invoice)}>Edit</button>
                  <button onClick={() => handleDelete(invoice.id)}>Delete</button>
                  <button onClick={() => handleDownload(invoice.id)}>Download</button>
                  <button onClick={() => handleEmail(invoice.id)}>Email</button>
                </div>
              </div>
            ))
          )}
        </div>
        <h2>Saved Drafts</h2>
        {drafts.map((draft) => (
          <div key={draft.id} className="invoice-bar draft">
            <span className="invoice-number">#{draft.invoiceNumber}</span>
            <span className="invoice-status">Draft</span>
            <div className="invoice-actions">
              <button onClick={() => handleEdit(draft)}>Edit</button>
              <button onClick={() => handleDelete(draft.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="right-section">
        <h2>Calendar</h2>
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDate}
            tileClassName={({ date, view }) => view === 'month' && new Date(date).toLocaleDateString() === selectedDate.toLocaleDateString() ? 'react-calendar__tile--highlight' : null}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewInvoices;

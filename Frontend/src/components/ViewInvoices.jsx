import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import './styles/ViewInvoices.css';

function ViewInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [draftInvoices, setDraftInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const storedDrafts = JSON.parse(localStorage.getItem("drafts")) || [];
    setInvoices(storedInvoices);
    setDraftInvoices(storedDrafts);
  }, []);

  const handleDelete = (id, isDraft) => {
    const key = isDraft ? "drafts" : "invoices";
    const items = JSON.parse(localStorage.getItem(key)) || [];
    const updatedItems = items.filter((item) => item.invoiceNumber !== id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
    if (isDraft) {
      setDraftInvoices(updatedItems);
    } else {
      setInvoices(updatedItems);
    }
  };

  const handleEdit = (invoice) => {
    navigate('/dashboard/create-invoice', { state: { invoice } });
  };

  const handleDownload = (invoice) => {
    // Logic to download the invoice
    alert(`Downloading invoice #${invoice.invoiceNumber}`);
  };

  const handleEmail = (invoice) => {
    // Logic to email the invoice
    alert(`Emailing invoice #${invoice.invoiceNumber}`);
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const invoiceDates = invoices.map(invoice => invoice.invoiceDate.split('T')[0]);
      const draftDates = draftInvoices.map(invoice => invoice.invoiceDate.split('T')[0]);
      const allDates = [...invoiceDates, ...draftDates];
      if (allDates.includes(dateStr)) {
        return 'react-calendar__tile--highlight';
      }
    }
    return null;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const filteredInvoices = invoices.filter(
    (invoice) => 
      (selectedDate === null || invoice.invoiceDate.split('T')[0] === selectedDate) &&
      (invoice.invoiceNumber.includes(searchQuery) || invoice.clientName.includes(searchQuery))
  );

  const filteredDraftInvoices = draftInvoices.filter(
    (invoice) => 
      (selectedDate === null || invoice.invoiceDate.split('T')[0] === selectedDate) &&
      (invoice.invoiceNumber.includes(searchQuery) || invoice.clientName.includes(searchQuery))
  );

  return (
    <div className='view-invoices content'>
      <h2>Invoices</h2>
      <div className='invoice-calendar-container'>
        <div className='invoice-list'>
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {selectedDate && (
            <div>
              <h3>Invoices for {selectedDate}</h3>
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
                          <tr key={invoice.invoiceNumber}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.invoiceDate}</td>
                            <td>{invoice.dueDate}</td>
                            <td>{invoice.clientName}</td>
                            <td>{invoice.amount}</td>
                            <td>
                              <button className="btn btn-download" onClick={() => handleDownload(invoice)}>Download</button>
                              <button className="btn btn-email" onClick={() => handleEmail(invoice)}>Email</button>
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
                          <tr key={invoice.invoiceNumber}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.invoiceDate}</td>
                            <td>{invoice.dueDate}</td>
                            <td>{invoice.clientName}</td>
                            <td>{invoice.amount}</td>
                            <td>
                              <button className="btn btn-edit" onClick={() => handleEdit(invoice)}>Edit</button>
                              <button className="btn btn-delete" onClick={() => handleDelete(invoice.invoiceNumber, true)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className='calendar-container'>
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={getTileClassName}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewInvoices;

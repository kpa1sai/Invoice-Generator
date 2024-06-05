import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./styles/DashboardComponent.css";
import AddClient from "./AddClient.jsx";
import CreateInvoice from "./CreateInvoice.jsx";
import ViewInvoices from "./ViewInvoices.jsx";

function Welcome() {
  return (
    <div className="welcome-message">
      <h1>Welcome to the Invoice App</h1>
      <p>Please select an option from the sidebar to get started.</p>
    </div>
  );
}

function DashboardComponent() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div>
          <div className="sidebar-header">
            <div className="sidebar-brand">Invoice App</div>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="view-invoices" className="nav-link">
                View Invoices
              </Link>
            </li>
            <li>
              <Link to="create-invoice" className="nav-link">
                Create Invoice
              </Link>
            </li>
            <li>
              <Link to="add-client" className="nav-link">
                Add Client
              </Link>
            </li>
          </ul>
        </div>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </nav>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="view-invoices" element={<ViewInvoices />} />
          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route path="add-client" element={<AddClient />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardComponent;

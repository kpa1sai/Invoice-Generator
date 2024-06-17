import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardComponent from "./components/DashboardComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import SignupComponent from "./components/SignupComponent.jsx";
import SupplierProfile from "./components/SupplierProfile.jsx";
import CreateInvoice from "./components/CreateInvoice.jsx";
import ViewInvoices from "./components/ViewInvoices.jsx";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [drafts, setDrafts] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices((prevInvoices) => [...prevInvoices, invoice]);
  };

  const addDraft = (draft) => {
    setDrafts((prevDrafts) => [...prevDrafts, draft]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/dashboard/*" element={<DashboardComponent />} />
        <Route path="/supplier-profile" element={<SupplierProfile />} />
        <Route
          path="/create-invoice"
          element={<CreateInvoice addInvoice={addInvoice} addDraft={addDraft} />}
        />
        <Route
          path="/view-invoices"
          element={<ViewInvoices invoices={invoices} drafts={drafts} />}
        />
        <Route path="/" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

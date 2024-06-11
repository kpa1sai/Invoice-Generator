import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardComponent from "./components/DashboardComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import SignupComponent from "./components/SignupComponent.jsx";
import SupplierProfile from "./components/SupplierProfile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/dashboard/*" element={<DashboardComponent />} />
        <Route path="/supplier-profile" element={<SupplierProfile />} />
        <Route path="/" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

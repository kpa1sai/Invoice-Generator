import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import SignupComponent from "./components/SignupComponent.jsx";
import NotificationManager from "./components/NotificationManager";
import './App.css';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/dashboard/*" element={<DashboardComponent />} />
        <Route path="/" element={<LoginComponent />} />
      </Routes>
      <NotificationManager />
    </Router>
  );
}

export default App;

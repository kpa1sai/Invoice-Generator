import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/SignupComponent.css";

function SignupComponent() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", {
        usernameOrEmail,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError("Failed to create an account");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <div className="form-group">
            <label>Username or Email:</label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Re-enter Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Signup</button>
          {error && <p className="error">{error}</p>}
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupComponent;

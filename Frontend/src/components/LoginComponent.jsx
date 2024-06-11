import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/LoginComponent.css";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   const response = await axios.post("http://localhost:5000/login", { username, password });
    //   const { userId } = response.data;

    //   // Check if the profile exists
    //   const profileResponse = await axios.get(`http://localhost:5000/api/supplier/${userId}`);
    //   if (profileResponse.data.profileExists) {
    //     navigate("/dashboard");
    //   } else {
    //     navigate("/supplier-profile");
    //   }
    // } catch (err) {
    //   setError("Invalid username or password");
    //   alert("Invalid username or password");
    // }
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            //required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginComponent;

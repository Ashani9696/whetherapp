import React, { useState } from "react";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(username, password) {
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.ok; // True if registration was successful
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, password); // Implement this function to call your API
    if (success) {
      alert("Registration successful");
      onRegister();
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: "15px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginTop: "15px" }}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: "15px" }}
        />
        <br></br>
        <button type="submit" style={{ marginTop: "15px" }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

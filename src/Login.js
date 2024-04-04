import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(username, password) {
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.token; // Assuming the server responds with { token: '...' }
    }
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the login
    const token = await login(username, password); // Implement login function to call your API
    if (token) {
      onLogin(token);
    } else {
      alert("Login failed!");
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

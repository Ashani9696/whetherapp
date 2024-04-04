import React, { useEffect, useState } from "react";
import "./App.css";
import WeatherMap from "./WeatherMap";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Optionally call backend logout endpoint
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sri Lanka Weather Map</h1>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ margin: "15px 0" }}>
            Logout
          </button>
        ) : (
          <>
            {isRegistering ? (
              <>
                <Register onRegister={() => setIsRegistering(false)} />
                <button
                  onClick={() => setIsRegistering(false)}
                  style={{ marginLeft: " 15px" }}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <Login onLogin={handleLogin} />
                <button
                  onClick={() => setIsRegistering(true)}
                  style={{ marginLeft: " 15px" }}
                >
                  Register
                </button>
              </>
            )}
          </>
        )}
      </header>
      {isLoggedIn && <WeatherMap />}
    </div>
  );
}

export default App;

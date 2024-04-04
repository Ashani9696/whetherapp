import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icons
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker if they do not appear
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconPng,
  iconUrl: markerIconPng,
  shadowUrl: markerIconShadow,
});

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState([]);

  const isValidCoordinate = (coord) => {
    const num = parseFloat(coord);
    return !isNaN(num) && isFinite(num);
  };

  const isValidLatLng = (lat, lng) => {
    return (
      isValidCoordinate(lat) &&
      isValidCoordinate(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  };

  const fetchWeatherData = async () => {
    // Retrieve the token from storage
    const token = localStorage.getItem("token");

    // Proceed only if the token exists
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/weather", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response is unauthorized (HTTP 401)
        if (response.status === 401) {
          console.error("Unauthorized: Invalid token");
          // Handle unauthorized access here (e.g., redirect to login)
          return;
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    } else {
      console.log("No token found, user is not authenticated.");
      // Handle cases where there is no token (e.g., show login page)
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {weatherData
        .filter((station) => isValidLatLng(station.latitude, station.longitude))
        .map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
          >
            <Popup>
              District: {station.district}
              <br />
              Temperature: {station.temperature}
              <br />
              Humidity: {station.humidity}
              <br />
              Air Pressure: {station.airPressure}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default WeatherMap;

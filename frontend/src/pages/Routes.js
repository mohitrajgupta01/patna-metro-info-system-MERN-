import React, { useState, useEffect } from "react";
import { getAllRoutes } from "../services/api";
import "./Routes.css";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      console.log("Fetching routes...");
      const data = await getAllRoutes();
      console.log("Routes data received:", data);
      setRoutes(data.data);
      if (data.data.length > 0) {
        setSelectedRoute(data.data[0]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching routes:", err);
      console.error("Error details:", err.response?.data || err.message);
      setError("Failed to load routes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading routes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="routes-page">
      <div className="container">
        <h1>Metro Routes</h1>
        <p className="page-description">
          Complete route information for all Patna Metro lines
        </p>

        <div className="routes-container">
          {routes.map((route) => (
            <div
              key={route._id}
              className={`route-card ${
                selectedRoute?._id === route._id ? "active" : ""
              }`}
              onClick={() => setSelectedRoute(route)}
            >
              <div
                className="route-header"
                style={{ borderColor: route.color }}
              >
                <h2>{route.lineName}</h2>
                <span
                  className="route-status"
                  style={{ backgroundColor: route.color }}
                >
                  {route.status}
                </span>
              </div>

              <div className="route-summary">
                <div className="summary-item">
                  <span className="label">From:</span>
                  <span className="value">{route.startStation}</span>
                </div>
                <div className="summary-item">
                  <span className="label">To:</span>
                  <span className="value">{route.endStation}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Total Stations:</span>
                  <span className="value">{route.totalStations}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Distance:</span>
                  <span className="value">{route.totalDistance} km</span>
                </div>
                <div className="summary-item">
                  <span className="label">Estimated Time:</span>
                  <span className="value">{route.estimatedTime} mins</span>
                </div>
                <div className="summary-item">
                  <span className="label">Frequency:</span>
                  <span className="value">{route.frequency}</span>
                </div>
              </div>

              {selectedRoute?._id === route._id && (
                <div className="route-details">
                  <h3>Station Sequence</h3>
                  <div className="station-list">
                    {route.stations.map((station, index) => (
                      <div key={station.stationCode} className="station-item">
                        <div
                          className="station-dot"
                          style={{ backgroundColor: route.color }}
                        >
                          {station.sequence}
                        </div>
                        <div className="station-details">
                          <span className="station-name">
                            {station.stationName}
                          </span>
                          <span className="station-code">
                            {station.stationCode}
                          </span>
                        </div>
                        {index < route.stations.length - 1 && (
                          <div
                            className="connection-line"
                            style={{ backgroundColor: route.color }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="route-info-section">
          <h2>Important Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <h4>🕐 Operating Hours</h4>
              <p>6:00 AM - 10:00 PM (All Days)</p>
            </div>
            <div className="info-item">
              <h4>⚡ Frequency</h4>
              <p>Trains every 10-15 minutes during peak hours</p>
            </div>
            <div className="info-item">
              <h4>🎫 Smart Cards</h4>
              <p>Get 10% discount on fares with metro smart cards</p>
            </div>
            <div className="info-item">
              <h4>♿ Accessibility</h4>
              <p>All stations equipped with elevators and ramps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;

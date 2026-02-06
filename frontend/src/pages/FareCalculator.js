import React, { useState, useEffect } from "react";
import { getAllStations, calculateFare, getFareChart } from "../services/api";
import "./FareCalculator.css";

const FareCalculator = () => {
  const [stations, setStations] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [fareResult, setFareResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const data = await getAllStations();
      setStations(data.data);
    } catch (err) {
      console.error("Failed to fetch stations:", err);
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();

    if (!fromStation || !toStation) {
      setError("Please select both stations");
      return;
    }

    if (fromStation === toStation) {
      setError("Please select different stations");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await calculateFare(fromStation, toStation);
      setFareResult(data.data);
    } catch (err) {
      setError("Failed to calculate fare. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
    setFareResult(null);
    setError(null);
  };

  const handleReset = () => {
    setFromStation("");
    setToStation("");
    setFareResult(null);
    setError(null);
  };

  return (
    <div className="fare-calculator-page">
      <div className="container">
        <h1>Fare Calculator</h1>
        <p className="page-description">
          Calculate fare between any two stations on the Patna Metro network
        </p>

        <div className="calculator-section">
          <form onSubmit={handleCalculate} className="calculator-form">
            <div className="form-group">
              <label htmlFor="from-station">From Station</label>
              <select
                id="from-station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                required
              >
                <option value="">Select origin station</option>
                {stations.map((station) => (
                  <option key={station._id} value={station.code}>
                    {station.name} ({station.code})
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="swap-btn" onClick={handleSwap}>
              ⇅
            </button>

            <div className="form-group">
              <label htmlFor="to-station">To Station</label>
              <select
                id="to-station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                required
              >
                <option value="">Select destination station</option>
                {stations.map((station) => (
                  <option key={station._id} value={station.code}>
                    {station.name} ({station.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Calculating..." : "Calculate Fare"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}

          {fareResult && (
            <div className="fare-result">
              <h2>Journey Details</h2>
              <div className="result-grid">
                <div className="result-item">
                  <span className="label">From:</span>
                  <span className="value">
                    {fareResult.fromStationName || fareResult.fromStation}
                  </span>
                </div>
                <div className="result-item">
                  <span className="label">To:</span>
                  <span className="value">
                    {fareResult.toStationName || fareResult.toStation}
                  </span>
                </div>
                <div className="result-item">
                  <span className="label">Distance:</span>
                  <span className="value">{fareResult.distance} km</span>
                </div>
                <div className="result-item">
                  <span className="label">Duration:</span>
                  <span className="value">{fareResult.duration} minutes</span>
                </div>
                {fareResult.interchangeVia && (
                  <div className="result-item interchange-info">
                    <span className="label">Via:</span>
                    <span className="value">{fareResult.interchangeVia}</span>
                  </div>
                )}
                <div className="result-item highlight">
                  <span className="label">Token Fare:</span>
                  <span className="value fare-amount">₹{fareResult.fare}</span>
                </div>
                {fareResult.cardFare && (
                  <div className="result-item highlight">
                    <span className="label">Smart Card Fare:</span>
                    <span className="value fare-amount">
                      ₹{fareResult.cardFare}
                    </span>
                  </div>
                )}
              </div>

              {fareResult.travelInstructions && (
                <div className="travel-instructions">
                  <h3>🗺️ Travel Instructions</h3>
                  <p className="instructions-text">
                    {fareResult.travelInstructions}
                  </p>
                </div>
              )}

              <div className="savings-info">
                {fareResult.cardFare && (
                  <p>
                    💡 Save ₹{fareResult.fare - fareResult.cardFare} with Smart
                    Card!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="fare-chart-section">
          <h2>Fare Chart</h2>
          <p>Standard fare structure based on travel distance</p>
          <div className="fare-chart">
            <table>
              <thead>
                <tr>
                  <th>Distance Range</th>
                  <th>Token Fare (₹)</th>
                  <th>Smart Card Fare (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0 - 3 km</td>
                  <td>₹10</td>
                  <td>₹9</td>
                </tr>
                <tr>
                  <td>3.1 - 6 km</td>
                  <td>₹15</td>
                  <td>₹14</td>
                </tr>
                <tr>
                  <td>6.1 - 9 km</td>
                  <td>₹20</td>
                  <td>₹18</td>
                </tr>
                <tr>
                  <td>9.1 - 12 km</td>
                  <td>₹25</td>
                  <td>₹23</td>
                </tr>
                <tr>
                  <td>Above 12 km</td>
                  <td>₹30</td>
                  <td>₹27</td>
                </tr>
                <tr className="cross-line-fare">
                  <td>Cross-line Journey (Base)</td>
                  <td>₹20+</td>
                  <td>₹18+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="fare-info-section">
          <h2>Fare Information</h2>
          <div className="info-cards">
            <div className="info-card">
              <h4>🎫 Token</h4>
              <p>Single journey token available at ticket counters</p>
            </div>
            <div className="info-card">
              <h4>💳 Smart Card</h4>
              <p>Rechargeable card with 10% discount on all journeys</p>
            </div>
            <div className="info-card">
              <h4>👨‍👩‍👧‍👦 Group Travel</h4>
              <p>Special discounts available for group bookings</p>
            </div>
            <div className="info-card">
              <h4>🎓 Concession</h4>
              <p>Senior citizens and students eligible for concession</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FareCalculator;

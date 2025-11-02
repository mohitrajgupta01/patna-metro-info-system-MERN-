import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Welcome to Patna Metro</h1>
          <p className="hero-subtitle">
            Your complete guide to Patna Metro Rail
          </p>
          <div className="hero-buttons">
            <Link to="/stations" className="btn btn-primary">
              Explore Stations
            </Link>
            <Link to="/fare-calculator" className="btn btn-secondary">
              Calculate Fare
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Quick Access</h2>
          <div className="feature-grid">
            <Link to="/stations" className="feature-card">
              <div className="feature-icon">🚉</div>
              <h3>Stations</h3>
              <p>
                Detailed information about all metro stations, facilities, and
                locations
              </p>
            </Link>

            <Link to="/routes" className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Routes</h3>
              <p>Complete route map with distance and time estimates</p>
            </Link>

            <Link to="/fare-calculator" className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Fare Calculator</h3>
              <p>Calculate fares between any two stations instantly</p>
            </Link>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Timings</h3>
              <p>Metro operates from 6:00 AM to 10:00 PM daily</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Plan Your Journey Today</h2>
          <p>Get accurate information about stations, routes, and fares</p>
          <Link to="/fare-calculator" className="btn btn-primary">
            Calculate Your Fare
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

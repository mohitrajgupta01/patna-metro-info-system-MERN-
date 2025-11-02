import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>🚇 Patna Metro Info</h1>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>

          <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/stations" onClick={() => setIsMenuOpen(false)}>
              Stations
            </Link>
            <Link to="/routes" onClick={() => setIsMenuOpen(false)}>
              Routes
            </Link>
            <Link to="/fare-calculator" onClick={() => setIsMenuOpen(false)}>
              Fare Calculator
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

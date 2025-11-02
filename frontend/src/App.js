import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Stations from "./pages/Stations";
import RoutesPage from "./pages/Routes";
import FareCalculator from "./pages/FareCalculator";
import About from "./pages/About";
import TestAPI from "./TestAPI";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/fare-calculator" element={<FareCalculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<TestAPI />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

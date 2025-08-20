import React from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Apple from "../Apple/Apple";
import Tesla from "../Tesla/Tesla";
import Business from "../Business/Business";
import StockMarket from "../StockMarket/StockMarket";
import TechNews from "../TechNews/TechNews";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    if (e.target.value) {
      navigate(e.target.value);
    }
  };

  return (
    <>
    
      <div className="mobile-nav">
        <div className="mobile-nav-head">
          <select onChange={handleSelect}>
            <option value="">News</option>
            <option value="/apple">Apple</option>
            <option value="/tesla">Tesla</option>
            <option value="/business">Business</option>
            <option value="/stockmarket">Stock Market</option>
            <option value="/technews">Tech News</option>
          </select>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="navbar-container">
        <nav className="navbar">
          <NavLink to="/apple" className="nav-item">Apple</NavLink>
          <NavLink to="/tesla" className="nav-item">Tesla</NavLink>
          <NavLink to="/business" className="nav-item">Business</NavLink>
          <NavLink to="/stockmarket" className="nav-item">Stock Market</NavLink>
          <NavLink to="/technews" className="nav-item">Tech News</NavLink>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/apple" replace />} />
            <Route path="/apple" element={<Apple />} />
            <Route path="/tesla" element={<Tesla />} />
            <Route path="/business" element={<Business />} />
            <Route path="/stockmarket" element={<StockMarket />} />
            <Route path="/technews" element={<TechNews />} />
            <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

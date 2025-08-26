import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Apple from "../Apple/Apple";
import Tesla from "../Tesla/Tesla";
import Business from "../Business/Business";
import StockMarket from "../StockMarket/StockMarket";
import TechNews from "../TechNews/TechNews";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // close drawer on navigation or Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const links = [
    { to: "/apple", label: "Apple", key: "apple" },
    { to: "/tesla", label: "Tesla", key: "tesla" },
    { to: "/business", label: "Business", key: "business" },
    { to: "/stockmarket", label: "Stocks", key: "stockmarket" },
    { to: "/technews", label: "Tech News", key: "technews" },
  ];

  function handleNavClick(to) {
    setDrawerOpen(false);
    navigate(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* MOBILE TOPBAR with hamburger (visible on small screens) */}
      <div className="mobile-topbar">
        <button
          className="hamburger-btn"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((s) => !s)}
        >
          {/* hamburger icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="mobile-topbar-title" onClick={() => navigate("/apple")}>
          News
        </div>

        <div className="mobile-topbar-spacer" />
      </div>

      {/* overlay */}
      <div
        className={`drawer-overlay ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={drawerOpen ? "false" : "true"}
      />

      {/* side drawer */}
      <aside className={`side-drawer ${drawerOpen ? "open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="drawer-header">
          <strong>Sections</strong>
          <button
            className="drawer-close"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Mobile menu">
          {links.map((l) => (
            <NavLink
              key={l.key}
              to={l.to}
              className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
              onClick={() => handleNavClick(l.to)}
            >
              <span className="drawer-link-label">{l.label}</span>
              <span className="drawer-link-chevron" aria-hidden>›</span>
            </NavLink>
          ))}
        </nav>

        <div className="drawer-footer">
          <small>Built with NewsAPI</small>
        </div>
      </aside>

      {/* DESKTOP NAV + PAGE CONTENT */}
      <div className="navbar-container">
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          <NavLink to="/apple" className="nav-item">Apple</NavLink>
          <NavLink to="/tesla" className="nav-item">Tesla</NavLink>
          <NavLink to="/business" className="nav-item">Business</NavLink>
          <NavLink to="/stockmarket" className="nav-item">Stock Market</NavLink>
          <NavLink to="/technews" className="nav-item">Tech News</NavLink>
        </nav>

        <div className="page-content" onClick={() => setDrawerOpen(false)}>
          <Routes>
            <Route path="/newsapp" element={<Apple/>} />
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

import React from "react";
import Navbar from "./Navbar/Navbar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Navbar />
      </BrowserRouter>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function Root() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000); // 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      {showWelcome ? (

        <div className="welcome-screen">
          <h1>👋 Welcome to News app</h1>
        </div>
      ) : (
        <App />
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();

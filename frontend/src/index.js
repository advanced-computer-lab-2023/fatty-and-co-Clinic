import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PackageDashboard from "./views/PackageDashboard";
import reportWebVitals from "./reportWebVitals";
import CustomNavbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CustomNavbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/PackageDashboard" element={<PackageDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

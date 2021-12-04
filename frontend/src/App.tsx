import * as React from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <HomePage />
    </Router>
  );
}

export default App;

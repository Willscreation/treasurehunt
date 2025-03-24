import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Round1 from "./components/Round1";
import Round2 from "./components/Round2";
import Round3 from "./components/Round3";
import FinalRound from "./components/FinalRound";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Treasure Hunt</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/round1" element={<Round1 />} />
          <Route path="/round2" element={<Round2 />} />
          <Route path="/round3" element={<Round3 />} />
          <Route path="/final" element={<FinalRound />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to the Treasure Hunt!</h2>
      <p>Click below to start:</p>
      <Link to="/round1"><button>Start Round 1</button></Link>
    </div>
  );
}


export default App;

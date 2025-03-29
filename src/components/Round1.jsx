import React, { useEffect, useState } from "react";
import "./styles/Round1.css";

function Round1() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Log clue to console
    console.log("Your next clue: /round2");
    
    // Trigger animation after a short delay
    setTimeout(() => {
      setVisible(true);
    }, 500);
  }, []);

  return (
    <div className="squid-game-container">
      <div className={`squid-game-card ${visible ? 'squid-game-card-visible' : ''}`}>
        <div className="squid-game-logo"></div>
        <h2 className="squid-game-title">Round 1</h2>
        <p className="squid-game-text">Find the hidden clue in the console!</p>
        <div className="squid-game-shapes">
          <div className="squid-game-circle"></div>
          <div className="squid-game-triangle"></div>
          <div className="squid-game-square"></div>
        </div>
        <button className="squid-game-button">Inspect Me</button>
      </div>
    </div>
  );
}

export default Round1;
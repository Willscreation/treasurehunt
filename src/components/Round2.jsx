import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Round2.css";

function Round2() {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => {
      setVisible(true);
    }, 500);
  }, []);

  const handleCheck = () => {
    if (answer.toLowerCase() === "42") {
      setIsCorrect(true);
      // Play success sound effect
      const audio = new Audio("/success.mp3");
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed:", e));
    } else {
      // Wrong answer animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      
      // Play error sound effect
      const audio = new Audio("/error.mp3");
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  return (
    <div className="squid-game-container">
      <div className={`squid-game-card ${visible ? 'squid-game-card-visible' : ''}`}>
        <div className="squid-game-number">
          <span>2</span>
        </div>
        
        <h2 className="squid-game-title">Round 2</h2>
        
        <div className="squid-game-puzzle">
          <p className="squid-game-question">
            Solve this puzzle: What is the answer to life, the universe, and everything?
          </p>
          
          <div className={`squid-game-input-group ${isShaking ? 'shake-animation' : ''}`}>
            <input
              type="text"
              className="squid-game-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer"
              autoFocus
            />
            <button 
              className="squid-game-button" 
              onClick={handleCheck}
            >
              Submit
            </button>
          </div>
        </div>
        
        {isCorrect && (
          <div className="squid-game-success">
            <div className="squid-game-confetti"></div>
            <p className="squid-game-correct">Correct! Here is your next clue:</p>
            <Link to="/round3" className="squid-game-next-link">
              <span className="squid-game-next-text">Go to Round 3</span>
              <svg className="squid-game-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        )}
        
        <div className="squid-game-timer">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Round2;
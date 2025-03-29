import React, { useState, useEffect, useRef } from "react";
import festLogo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import './styles/FinalRound.css';

function FinalRound() {
  const [grid, setGrid] = useState([
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", ""] // Empty space for movement
  ]);
  const [progress, setProgress] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const countdownRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown
  const [isPaused, setIsPaused] = useState(false);

  // Initialize and shuffle grid
  useEffect(() => {
    shuffleGrid();
    startCountdown();

    // Clean up countdown on unmount
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  // Watch for game completion
  useEffect(() => {
    if (progress === 100 && !gameCompleted) {
      setGameCompleted(true);
      if (countdownRef.current) clearInterval(countdownRef.current);
      
      // Play success sound
      const successSound = new Audio("/victory.mp3");
      successSound.play().catch(err => console.log("Audio play failed:", err));
      
      // Trigger confetti effect
      triggerConfetti();
    }
  }, [progress, gameCompleted]);

  const startCountdown = () => {
    countdownRef.current = setInterval(() => {
      if (!isPaused) {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(countdownRef.current);
            // Play failure sound
            const failureSound = new Audio("/failure.mp3");
            failureSound.play().catch(err => console.log("Audio play failed:", err));
            return 0;
          }
          return prevTime - 1;
        });
      }
    }, 1000);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerConfetti = () => {
    // This is a placeholder for confetti animation
    // In a real implementation, you would use a confetti library
    console.log("Confetti triggered!");
  };

  const shuffleGrid = () => {
    // Create a solvable puzzle
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
    let isSolvable = false;
    let shuffledGrid;
    
    while (!isSolvable) {
      numbers.sort(() => Math.random() - 0.5);
      shuffledGrid = [
        numbers.slice(0, 3),
        numbers.slice(3, 6),
        numbers.slice(6, 9)
      ];
      
      // Count inversions to ensure puzzle is solvable
      let inversions = 0;
      const flatNumbers = numbers.filter(n => n !== "");
      
      for (let i = 0; i < flatNumbers.length; i++) {
        for (let j = i + 1; j < flatNumbers.length; j++) {
          if (parseInt(flatNumbers[i]) > parseInt(flatNumbers[j])) {
            inversions++;
          }
        }
      }
      
      // Find row of empty space from bottom
      let emptyRow = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (shuffledGrid[i][j] === "") {
            emptyRow = 3 - i;
          }
        }
      }
      
      // Puzzle is solvable if inversions count is even when empty space is on odd row from bottom
      // or inversions count is odd when empty space is on even row from bottom
      isSolvable = (emptyRow % 2 === 1 && inversions % 2 === 0) || 
                   (emptyRow % 2 === 0 && inversions % 2 === 1);
    }
    
    setGrid(shuffledGrid);
    setMoves(0);
    setProgress(0);
    setGameCompleted(false);
  };

  const checkProgress = (newGrid) => {
    let correctTiles = 0;
    const totalTiles = 8; // Excluding the empty tile
    
    // Check each tile to see if it's in correct position
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const expectedValue = r * 3 + c + 1;
        if (expectedValue === 9) continue; // Skip the empty tile position
        if (newGrid[r][c] === expectedValue.toString()) {
          correctTiles++;
        }
      }
    }
    
    // Special case for the empty tile
    if (newGrid[2][2] === "") {
      correctTiles++;
    }
    
    const newProgress = Math.floor((correctTiles / 9) * 100);
    setProgress(newProgress);
  };

  const swapTiles = (r1, c1, r2, c2) => {
    const newGrid = grid.map(row => [...row]);
    [newGrid[r1][c1], newGrid[r2][c2]] = [newGrid[r2][c2], newGrid[r1][c1]];
    setGrid(newGrid);
    setMoves(moves + 1);
    checkProgress(newGrid);
    
    // Play move sound
    const moveSound = new Audio("/move.mp3");
    moveSound.volume = 0.3;
    moveSound.play().catch(err => console.log("Audio play failed:", err));
  };

  const handleTileClick = (r, c) => {
    if (gameCompleted || timeLeft === 0) return;
    
    const directions = [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1]
    ];
    
    for (const [newR, newC] of directions) {
      if (newR >= 0 && newR < 3 && newC >= 0 && newC < 3 && grid[newR][newC] === "") {
        swapTiles(r, c, newR, newC);
        break;
      }
    }
  };

  // Find empty tile position
  const findEmptyTile = () => {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[r][c] === "") {
          return [r, c];
        }
      }
    }
    return [2, 2]; // Default position
  };

  const getHint = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  };

  // Determine which tiles can be moved
  const canMove = (r, c) => {
    const [emptyR, emptyC] = findEmptyTile();
    return (
      (Math.abs(r - emptyR) === 1 && c === emptyC) || 
      (Math.abs(c - emptyC) === 1 && r === emptyR)
    );
  };

  return (
    <div className="squid-final-container">
      <div className="squid-final-header">
        <h2 className="squid-final-title">FINAL CHALLENGE</h2>
        <p className="squid-final-subtitle">Rearrange the tiles to reveal the fest logo</p>
        
        <div className="squid-final-timer-container">
          <div className="squid-final-timer">
            <span className={`squid-final-time ${timeLeft < 30 ? 'squid-final-time-warning' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button 
            className="squid-final-pause-btn"
            onClick={togglePause}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
      
      <div className="squid-final-game-area">
        <div className="squid-final-stats">
          <div className="squid-final-stat">
            <span className="squid-final-stat-label">Moves</span>
            <span className="squid-final-stat-value">{moves}</span>
          </div>
          <div className="squid-final-stat">
            <span className="squid-final-stat-label">Progress</span>
            <div className="squid-final-progress-bar">
              <div 
                className="squid-final-progress-fill" 
                style={{width: `${progress}%`}}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="squid-final-puzzle-grid">
          {grid.map((row, rIndex) =>
            row.map((num, cIndex) => (
              <button
                key={`${rIndex}-${cIndex}`}
                onClick={() => handleTileClick(rIndex, cIndex)}
                className={`squid-final-tile ${
                  num === "" ? 'squid-final-tile-empty' : ''
                } ${
                  canMove(rIndex, cIndex) ? 'squid-final-tile-movable' : ''
                } ${
                  showHint && canMove(rIndex, cIndex) ? 'squid-final-tile-hint' : ''
                }`}
                disabled={num === "" || !canMove(rIndex, cIndex) || gameCompleted || timeLeft === 0}
              >
                {num}
              </button>
            ))
          )}
        </div>
        
        <div className="squid-final-controls">
          <button 
            className="squid-final-control-btn squid-final-hint-btn" 
            onClick={getHint}
            disabled={gameCompleted || timeLeft === 0}
          >
            Hint
          </button>
          <button 
            className="squid-final-control-btn squid-final-reset-btn" 
            onClick={shuffleGrid}
            disabled={gameCompleted}
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="squid-final-logo-container">
        <div 
          className="squid-final-logo"
          style={{
            backgroundImage: `url(${festLogo})`,
            filter: progress === 100 ? "none" : `blur(${(100 - progress) / 5}px)`
          }}
        >
          <div 
            className="squid-final-logo-overlay"
            style={{opacity: 1 - progress / 100}}
          ></div>
        </div>
        
        {gameCompleted && (
          <div className="squid-final-completion">
            <h3 className="squid-final-completion-title">Challenge Complete!</h3>
            <p className="squid-final-completion-stats">
              Time Remaining: {formatTime(timeLeft)} | Moves: {moves}
            </p>
            <Link to="/completion" className="squid-final-next-btn">
              <span className="squid-final-next-text">Claim Your Prize</span>
            </Link>
          </div>
        )}
        
        {timeLeft === 0 && !gameCompleted && (
          <div className="squid-final-failure">
            <h3 className="squid-final-failure-title">Time's Up!</h3>
            <p className="squid-final-failure-message">You failed to complete the challenge in time.</p>
            <button 
              className="squid-final-retry-btn"
              onClick={shuffleGrid}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinalRound;
import React, { useState, useEffect } from "react";
import festLogo from "../assets/logo.webp";

function FinalRound() {
  const [grid, setGrid] = useState([
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", ""] // Empty space for movement
  ]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    shuffleGrid();
  }, []);

  const shuffleGrid = () => {
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
    numbers.sort(() => Math.random() - 0.5);
    const newGrid = [
      numbers.slice(0, 3),
      numbers.slice(3, 6),
      numbers.slice(6, 9)
    ];
    setGrid(newGrid);
  };

  const checkProgress = (newGrid) => {
    let newProgress = 0;
    if (newGrid[0].join("") === "123") newProgress = 25;
    if (newGrid[1].join("") === "456") newProgress = 50;
    if (newGrid[2].join("") === "78") newProgress = 100; // Last tile is empty
    setProgress(newProgress);
  };

  const swapTiles = (r1, c1, r2, c2) => {
    const newGrid = grid.map(row => [...row]);
    [newGrid[r1][c1], newGrid[r2][c2]] = [newGrid[r2][c2], newGrid[r1][c1]];
    setGrid(newGrid);
    checkProgress(newGrid);
  };

  const handleTileClick = (r, c) => {
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

  return (
    <div>
      <h2>Final Round - Solve the Number Puzzle</h2>
      <p>Rearrange the tiles to reveal the fest logo!</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: "5px", margin: "auto" }}>
        {grid.map((row, rIndex) =>
          row.map((num, cIndex) => (
            <button
              key={`${rIndex}-${cIndex}`}
              onClick={() => handleTileClick(rIndex, cIndex)}
              style={{
                width: "60px",
                height: "60px",
                fontSize: "20px",
                textAlign: "center",
                color:"black",
                backgroundColor: num === "" ? "lightgray" : "white",
                border: "1px solid black",
                cursor: num === "" ? "default" : "pointer"
              }}
            >
              {num}
            </button>
          ))
        )}
      </div>
      
      <div style={{
        position: "relative",
        width: "300px",
        height: "300px",
        margin: "20px auto",
        backgroundImage: `url(${festLogo})`,
        backgroundSize: "cover",
        filter: progress === 100 ? "none" : `blur(${(100 - progress) / 10}px)`,
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `rgba(255,255,255,${1 - progress / 100})`,
        }}></div>
      </div>
    </div>
  );
}

export default FinalRound;
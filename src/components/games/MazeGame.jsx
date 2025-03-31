import React, { useState, useEffect } from "react";
import "./MazeGame.css"; // External CSS for better styling

// Complex Maze Grid (1 = Wall, 0 = Path, 2 = Goal)
const mazeGrid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 2, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const MazeGame = ({ onComplete }) => {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (completed) return;
      let { x, y } = playerPos;
      if (e.key === "ArrowUp" && mazeGrid[y - 1][x] !== 1) y--;
      if (e.key === "ArrowDown" && mazeGrid[y + 1][x] !== 1) y++;
      if (e.key === "ArrowLeft" && mazeGrid[y][x - 1] !== 1) x--;
      if (e.key === "ArrowRight" && mazeGrid[y][x + 1] !== 1) x++;
      setPlayerPos({ x, y });
      if (mazeGrid[y][x] === 2) {
        setCompleted(true);
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos, completed, onComplete]);

  return (
    <div className="maze-container">
      <h3>Complex Maze Game</h3>
      <p>Navigate the maze with arrow keys.</p>
      <div className="maze-grid">
        {mazeGrid.flat().map((cell, index) => {
          const x = index % 15;
          const y = Math.floor(index / 15);
          return (
            <div
              key={index}
              className={`cell ${
                x === playerPos.x && y === playerPos.y
                  ? "player"
                  : cell === 1
                  ? "wall"
                  : cell === 2
                  ? "goal"
                  : "path"
              }`}
            >
              {x === playerPos.x && y === playerPos.y ? "⚽" : cell === 2 ? "🏰" : ""}
            </div>
          );
        })}
      </div>
      {completed && <p>🎉 You reached the goal! 🎉</p>}
    </div>
  );
};

export default MazeGame;

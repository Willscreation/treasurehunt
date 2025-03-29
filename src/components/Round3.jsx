<<<<<<< HEAD
import React, { useState } from "react";
import MazeGame from "./games/MazeGame";
import MemoryGame from "./games/MemoryGame";
import CardPuzzle from "./games/CardPuzzle";
import { Link } from "react-router-dom";

function Round3() {
  const [pieces, setPieces] = useState([]);
  const [messages, setMessages] = useState([]);
  const [mazeSolved, setMazeSolved] = useState(false);
  const [memorySolved, setMemorySolved] = useState(false);
  const [cardSolved, setCardSolved] = useState(false);

  const handleGameComplete = (newPiece, message, setSolved) => {
    if (!pieces.includes(newPiece)) {
      setPieces([...pieces, newPiece]);
      setMessages([...messages, message]);
      setSolved(true);
    }
  };

  return (
    <div>
      <h2>Round 3 - Tricky Games</h2>
      <p>Complete the games to unlock the full link!</p>
      
      <MazeGame onComplete={() => handleGameComplete("https://youtu.be/maze123", "Maze Game completed! First piece of the link unlocked!", setMazeSolved)} />
      <button onClick={() => mazeSolved && handleGameComplete("https://youtu.be/maze123", "Maze Game completed! First piece of the link unlocked!", setMazeSolved)} disabled={!mazeSolved}>Submit Maze Game</button>
      
      <MemoryGame onComplete={() => handleGameComplete("https://youtu.be/memory456", "Memory Game solved! Second piece of the link unlocked!", setMemorySolved)} />
      <button onClick={() => memorySolved && handleGameComplete("https://youtu.be/memory456", "Memory Game solved! Second piece of the link unlocked!", setMemorySolved)} disabled={!memorySolved}>Submit Memory Game</button>
      
      <CardPuzzle onComplete={() => handleGameComplete("https://youtu.be/card789", "Card Puzzle cracked! Final piece of the link unlocked!", setCardSolved)} />
      <button onClick={() => cardSolved && handleGameComplete("https://youtu.be/card789", "Card Puzzle cracked! Final piece of the link unlocked!", setCardSolved)} disabled={!cardSolved}>Submit Card Puzzle</button>
      
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
      
      {pieces.length === 3 && (
        <div>
          <p>Final Link: {pieces.join(" ")}</p>
          <a href={pieces.join(" ")} target="_blank" rel="noopener noreferrer">Go to Final Round</a>
        </div>
      )}
      <Link to="/final">Go to Final Round</Link>
    </div>
  );
}

export default Round3;
=======
import React, { useState } from "react";
import MazeGame from "./games/MazeGame";
import MemoryGame from "./games/MemoryGame";
import CardPuzzle from "./games/CardPuzzle";
import { Link } from "react-router-dom";

function Round3() {
  const [pieces, setPieces] = useState([]);
  const [messages, setMessages] = useState([]);
  const [mazeSolved, setMazeSolved] = useState(false);
  const [memorySolved, setMemorySolved] = useState(false);
  const [cardSolved, setCardSolved] = useState(false);

  const handleGameComplete = (newPiece, message, setSolved) => {
    if (!pieces.includes(newPiece)) {
      setPieces([...pieces, newPiece]);
      setMessages([...messages, message]);
      setSolved(true);
    }
  };

  return (
    <div>
      <h2>Round 3 - Tricky Games</h2>
      <p>Complete the games to unlock the full link!</p>
      
      <MazeGame onComplete={() => handleGameComplete("https://youtu.be/maze123", "Maze Game completed! First piece of the link unlocked!", setMazeSolved)} />
      <button onClick={() => mazeSolved && handleGameComplete("https://youtu.be/maze123", "Maze Game completed! First piece of the link unlocked!", setMazeSolved)} disabled={!mazeSolved}>Submit Maze Game</button>
      
      <MemoryGame onComplete={() => handleGameComplete("https://youtu.be/memory456", "Memory Game solved! Second piece of the link unlocked!", setMemorySolved)} />
      <button onClick={() => memorySolved && handleGameComplete("https://youtu.be/memory456", "Memory Game solved! Second piece of the link unlocked!", setMemorySolved)} disabled={!memorySolved}>Submit Memory Game</button>
      
      <CardPuzzle onComplete={() => handleGameComplete("https://youtu.be/card789", "Card Puzzle cracked! Final piece of the link unlocked!", setCardSolved)} />
      <button onClick={() => cardSolved && handleGameComplete("https://youtu.be/card789", "Card Puzzle cracked! Final piece of the link unlocked!", setCardSolved)} disabled={!cardSolved}>Submit Card Puzzle</button>
      
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
      
      {pieces.length === 3 && (
        <div>
          <p>Final Link: {pieces.join(" ")}</p>
          <a href={pieces.join(" ")} target="_blank" rel="noopener noreferrer">Go to Final Round</a>
        </div>
      )}
      <Link to="/final">Go to Final Round</Link>
    </div>
  );
}

export default Round3;
>>>>>>> 605f993 (Initial commit)

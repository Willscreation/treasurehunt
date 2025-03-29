<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Round2() {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = () => {
    if (answer.toLowerCase() === "42") {
      setIsCorrect(true);
    } else {
      alert("Wrong answer! Try again.");
    }
  };

  return (
    <div>
      <h2>Round 2</h2>
      <p>Solve this puzzle: What is the answer to life, the universe, and everything?</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <button onClick={handleCheck}>Submit</button>
      {isCorrect && (
        <div>
          <p>Correct! Here is your next clue:</p>
          <Link to="/round3">Go to Round 3</Link>
        </div>
      )}
    </div>
  );
}

export default Round2;
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Round2() {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = () => {
    if (answer.toLowerCase() === "42") {
      setIsCorrect(true);
    } else {
      alert("Wrong answer! Try again.");
    }
  };

  return (
    <div>
      <h2>Round 2</h2>
      <p>Solve this puzzle: What is the answer to life, the universe, and everything?</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <button onClick={handleCheck}>Submit</button>
      {isCorrect && (
        <div>
          <p>Correct! Here is your next clue:</p>
          <Link to="/round3">Go to Round 3</Link>
        </div>
      )}
    </div>
  );
}

export default Round2;
>>>>>>> 605f993 (Initial commit)

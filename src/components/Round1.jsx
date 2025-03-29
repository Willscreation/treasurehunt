import React, { useEffect } from "react";

function Round1() {
  useEffect(() => {
    console.log("Your next clue: /round2");
  }, []);

  return (
    <div>
      <h2>Round 1</h2>
      <p>Find the hidden clue in the console!</p>
    </div>
  );
}

export default Round1;

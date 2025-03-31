// import React, { useState, useEffect } from "react";
// import "./MazeGame.css"; // External CSS for better styling

// // Complex Maze Grid (1 = Wall, 0 = Path, 2 = Goal)
// const mazeGrid = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 2, 1],
//   [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
//   [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
//   [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
//   [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
//   [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
//   [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
//   [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
//   [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

// const MazeGame = ({ onComplete }) => {
//   const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
//   const [completed, setCompleted] = useState(false);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (completed) return;
//       let { x, y } = playerPos;
//       if (e.key === "ArrowUp" && mazeGrid[y - 1][x] !== 1) y--;
//       if (e.key === "ArrowDown" && mazeGrid[y + 1][x] !== 1) y++;
//       if (e.key === "ArrowLeft" && mazeGrid[y][x - 1] !== 1) x--;
//       if (e.key === "ArrowRight" && mazeGrid[y][x + 1] !== 1) x++;
//       setPlayerPos({ x, y });
//       if (mazeGrid[y][x] === 2) {
//         setCompleted(true);
//         onComplete();
//       }
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [playerPos, completed, onComplete]);

//   return (
//     <div className="maze-container">
//       <h3>Complex Maze Game</h3>
//       <p>Navigate the maze with arrow keys.</p>
//       <div className="maze-grid">
//         {mazeGrid.flat().map((cell, index) => {
//           const x = index % 15;
//           const y = Math.floor(index / 15);
//           return (
//             <div
//               key={index}
//               className={`cell ${
//                 x === playerPos.x && y === playerPos.y
//                   ? "player"
//                   : cell === 1
//                   ? "wall"
//                   : cell === 2
//                   ? "goal"
//                   : "path"
//               }`}
//             >
//               {x === playerPos.x && y === playerPos.y ? "⚽" : cell === 2 ? "🏰" : ""}
//             </div>
//           );
//         })}
//       </div>
//       {completed && <p>🎉 You reached the goal! 🎉</p>}
//     </div>
//   );
// };

// export default MazeGame;


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        <img src={this.props.element} style={{ display: this.props.display }} />
      </button>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.totalSquares = this.props.width * this.props.height;
    this.state = {
      squares: [],
      marioLocation: Math.floor(Math.random() * (this.totalSquares - 0) + 0),
      gameInitialized: false,
      moves: 0,
      yMoves: 0,
      xMoves: 0,
      lastMove: '+y'
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.checkForEnemies();
    }, 100);
  }

  handleClick(i) {
    if (i === this.state.marioLocation) this.checkForEnemies();
  }

  moveY(direction) {
    if (
      direction === '+'
      && (this.state.marioLocation + 1 - this.props.height) > 0
    ) {
      console.log('Moving in +y directions');
      let newSquares = this.state.squares.slice();
      newSquares[this.state.marioLocation] = {
        element: '', display: 'none'
      };
      newSquares[this.state.marioLocation - this.props.height] = {
        element: 'mario.png', display: 'block'
      };

      this.setState(
        {
          gameInitialized: true,
          marioLocation: this.state.marioLocation - this.props.height, squares: newSquares,
          moves: this.state.moves + 1,
          yMoves: this.state.yMoves + 1,
          xMoves: 0,
          lastMove: '+y'
        }
      );
    } else if (
      direction === '-' &&
      (this.state.marioLocation + this.props.height) < this.totalSquares
    ) {
      console.log('Moving in -y direction');
      let newSquares = this.state.squares.slice();
      newSquares[this.state.marioLocation] = {
        element: '', display: 'none'
      };
      newSquares[this.state.marioLocation + this.props.height] = {
        element: 'mario.png', display: 'block'
      };
      this.setState(
        {
          gameInitialized: true,
          marioLocation: this.state.marioLocation + this.props.height,
          squares: newSquares,
          moves: this.state.moves + 1, yMoves: this.state.yMoves + 1, xMoves: 0, lastMove: '-y'
        }
      );
    } else {
      this.state.lastMove === '+y'
        ? this.moveY('-')
        : this.state.lastMove === '-y'
          ? this.moveY('+')
          : this.setState({ lastMove: '+y' });
    }
  }

  moveX(direction) {
    if (
      direction === '+'
      && (this.state.marioLocation + 2) % this.props.width !== 1
      && (this.state.marioLocation + 1) < this.totalSquares
    ) {
      console.log('Moving in +x directions');
      let newSquares = this.state.squares.slice();
      newSquares[this.state.marioLocation] = {
        element: '', display: 'none'
      };
      newSquares[this.state.marioLocation + 1] = {
        element: 'mario.png', display: 'block'
      };
      this.setState(
        {
          gameInitialized: true,
          marioLocation: this.state.marioLocation + 1,
          squares: newSquares,
          moves: this.state.moves + 1,
          xMoves: this.state.xMoves + 1,
          yMoves: 0,
          lastMove: '+x'
        }
      );
    } else if (
      direction === '-'
      && (this.state.marioLocation) % this.props.width !== 0
      && (this.state.marioLocation - 1) >= 0
    ) {
      console.log('Moving in -x direction');
      let newSquares = this.state.squares.slice();
      newSquares[this.state.marioLocation] = {
        element: '', display: 'none'
      };
      newSquares[this.state.marioLocation - 1] = {
        element: 'mario.png', display: 'block'
      };
      this.setState(
        {
          gameInitialized: true,
          marioLocation: this.state.marioLocation - 1,
          squares: newSquares,
          moves: this.state.moves + 1,
          xMoves: this.state.xMoves + 1,
          yMoves: 0,
          lastMove: '-x'
        }
      );
    } else {
      this.state.lastMove === '+x'
        ? this.moveX('-')
        : this.state.lastMove === '-x'
          ? this.moveX('+')
          : this.setState({ lastMove: '+x' });
    }
  }

  getMarioRange() {
    let marioLoc = this.state.marioLocation;
    let marioRange = [];
    for (let i = 0; i < this.props.height; i++) {
      if (
        marioLoc >= (i * this.props.width)
        && marioLoc < (i * this.props.width) + this.props.width
      ) {
        marioRange = [
          (i * this.props.width),
          (i * this.props.width) + this.props.width
        ];
      }

    }
    console.log('Mario Range: ', marioRange);
    return marioRange
  }

  numberInRange(x, range) {
    return x >= range[0] && x < range[1];
  }

  decideMove(enemyLocations) {
    console.log('Enemy Locations: ', enemyLocations);
    let distance = Math.abs(
      enemyLocations[0] - this.state.marioLocation
    );
    let marioRange = this.getMarioRange();
    if (
      distance < this.props.width
      && enemyLocations[0] < this.state.marioLocation
      && this.numberInRange(enemyLocations[0], marioRange)
    ) {
      this.moveX('-');
    } else if (
      distance < this.props.width
      && enemyLocations[0] < this.state.marioLocation
      && !this.numberInRange(enemyLocations[0], marioRange)
    ) {
      this.moveY('+');
    } else if (
      distance < this.props.width
      && enemyLocations[0] > this.state.marioLocation
      && this.numberInRange(enemyLocations[0], marioRange)
    ) {
      this.moveX('+');
    } else if (
      distance < this.props.width
      && enemyLocations[0] > this.state.marioLocation
      && !this.numberInRange(enemyLocations[0], marioRange)
    ) {
      this.moveY('-');
    } else if (
      distance >= this.props.width
      && enemyLocations[0] < this.state.marioLocation
    ) {
      this.moveY('+');
    } else {
      this.moveY('-');
    }
  }

  checkForEnemies() {
    console.log('checking for enemies: ', this.state);
    let enemies = this.state.squares.filter(square => {
      return square.element === 'enemy.png';
    });
    console.log('Total enemies: ', enemies);
    if (enemies.length === 0) {
      alert('Game over. Total moves to save princess: ' + this.state.moves);
    } else {
      this.decideMove(enemies.map((enemy) => enemy.value));
    }
  }

  renderSquare(i, element, display) {
    return <Square key={i}
      value={i} element={this.state.squares[i].element} displayElement={this.state.squares[i].display}
      onClick={() => this.handleClick(i)}
    />;
  }

  renderRows(squares) {
    return (<div className="board-row">
      {squares}
    </div>);
  }

  renderBoard() {
    let board = [];
    let rows = [];
    for (let i = 0, squareNumber = 0; i < this.props.height; i++) {
      for (let j = 0; j < this.props.width; j++) {
        rows.push(
          this.renderSquare(
            squareNumber
          )
        );
        squareNumber++;
      }
      board.push(this.renderRows(rows));
      rows = [];
    }
    return board;
  }

  render() {
    if (!this.state.gameInitialized) {
      let luckySquares = [];
      for (let i = 0; i < Math.floor(Math.sqrt(this.totalSquares)) + 1; i++) {
        luckySquares.push(
          Math.floor(Math.random() * (this.totalSquares))
        );
      };
      console.log('calculating luck squares: ', luckySquares);
      let squareNumber = 0;
      for (let i = 0; i < this.props.height; i++) {
        for (let j = 0; j < this.props.width; j++) {
          let element = squareNumber === this.state.marioLocation ? "mario.png" : luckySquares.includes(squareNumber) ? "enemy.png" : "";
          let display = luckySquares.includes(squareNumber) || squareNumber === this.state.marioLocation ? "block" : "none";
          this.state.squares.push({ element, display, value: squareNumber });
          squareNumber++;
        }
      }
    }
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  sanitizeInput(input, dimension) {
    let output;
    output = parseInt(input);
    if (Number.isNaN(output)) {
      return {
        valid: false,
        msg: `${input} not valid. 
        Please enter a valid integer for ${dimension}`
      };
    } else if (output < 0) {
      return {
        valid: false,
        msg: `${input} not valid. 
          Please enter a positive integer for ${dimension}`
      };
    } else {
      return {
        valid: true,
        output
      };
    }

  }
  render() {
    let width = this.sanitizeInput(
      prompt("Please enter board width"),
      'width'
    );
    while (!width.valid) {
      width = this.sanitizeInput(prompt(width.msg), 'width');
    }

    let height = this.sanitizeInput(
      prompt("Please enter board height"),
      'height'
    );
    while (!height.valid) {
      height = this.sanitizeInput(prompt(height.msg), 'height');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board width={width.output} height={height.output} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
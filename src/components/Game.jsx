// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Board from './Board';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    const historyUpToCurrentStep = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrentStep[historyUpToCurrentStep.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = 'X';
    setHistory(historyUpToCurrentStep.concat([{ squares }]));
    setStepNumber(historyUpToCurrentStep.length);
    setIsXNext(false);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsXNext(step % 2 === 0);
  };

  const restartGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setIsXNext(true);
  };

  useEffect(() => {
    const current = history[stepNumber];
    if (!isXNext && !calculateWinner(current.squares)) {
      const emptySquares = current.squares
        .map((square, index) => (square === null ? index : null))
        .filter((val) => val !== null);
      if (emptySquares.length > 0) {
        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        const squares = current.squares.slice();
        squares[randomMove] = 'O';
        setTimeout(() => {
          setHistory(history.concat([{ squares }]));
          setStepNumber(stepNumber + 1);
          setIsXNext(true);
        }, 500);
      }
    }
  }, [isXNext, stepNumber, history]);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (isXNext ? 'X' : 'O');

  const moves = history.map((step, move) => {
    const desc = move >0 ? 'Go to move #' + move: "Start again ";
    return (
      <li key={move}>
        <button className='move-button' onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className='status-bar'>{status}</div>
        <button className="restart-btn" onClick={restartGame}>Restart Game</button>
        <ol className='moves'>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
import type { Cell, Player } from "../types/types";
import { useState } from "react";

// Winning patterns
const winPatterns: number[][] = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check winner
function checkWin(board: Cell[], player: Player): boolean {
  return winPatterns.some((pattern) =>
    pattern.every((index) => board[index] === player)
  );
}

// Function to check draw
function checkDraw(board: Cell[]): boolean {
  return board.every((cell) => cell !== null);
}

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  function handleClick(index: number) {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
      return;
    }

    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  }

  return (
    <div className="">
      <div className="">
        <h1>Tic Tac Toe</h1>
        <div>
          {board.map((cell, index) => (
            <button key={index} onClick={() => handleClick(index)} className="">
              {cell}
            </button>
          ))}
        </div>
        <div className="">
          {winner && <p> Grattis! {winner} vinner!</p>}
          {isDraw && <p>Ett oavgjort resultat!</p>}
          {!winner && !isDraw && <p>Nästa spelare: {currentPlayer}</p>}
        </div>
        <button onClick={resetGame} className="">
          Starta om spelet
        </button>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md flex flex-col items-center gap-6">
        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold tracking-wide">
          🎮 Tic Tac Toe 🎮
        </h1>
        {/* Board */}
        <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="aspect-square text-4xl font-bold border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-200 hover:cursor-pointer rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 duration-200"
            >
              {cell}
            </button>
          ))}
        </div>
        {/* Status */}
        <div className="text-center text-lg font-medium min-h-8">
          {winner && (
            <p className="text-green-600 font-semibold">
              {" "}
              Grattis! {winner} vinner!
            </p>
          )}
          {isDraw && (
            <p className="text-yellow-600 font-semibold">
              Ett oavgjort resultat!
            </p>
          )}
          {!winner && !isDraw && (
            <p>
              Nästa spelare: <span className="font-bold">{currentPlayer}</span>
            </p>
          )}
        </div>
        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md text-white font-semibold hover:cursor-pointer transition-all transform hover:scale-105 active:scale-95 duration-200"
        >
          Starta om spelet
        </button>
      </div>
    </div>
  );
}

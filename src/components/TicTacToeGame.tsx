import type { Cell, Player } from "../types/types";
import { checkWin, checkDraw } from "../utils/gameLogic";
import { useState } from "react";

export default function TicTacToeGame() {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  function handleClick(index: number) {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, currentPlayer, boardSize)) {
      setWinner(currentPlayer);
      return;
    }

    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetGame(size = boardSize) {
    setBoardSize(size);
    setBoard(Array(size * size).fill(null));
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
        {/* Board Size Selector */}
        <div className="flex gap-2 items-center">
          <label htmlFor="boardSize" className="font-medium">
            Storlek:
          </label>
          <select
            id="boardSize"
            value={boardSize}
            onChange={(e) => resetGame(Number(e.target.value))}
            className="border border-gray-400 rounded-lg p-1"
          >
            {[3, 4, 5, 6].map((size) => (
              <option key={size} value={size}>
                {size} x {size}
              </option>
            ))}
          </select>
        </div>
        {/* Board */}
        <div
          className="grid gap-3 w-full"
          style={{
            gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
          }}
        >
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
          onClick={() => resetGame()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md text-white font-semibold hover:cursor-pointer transition-all transform hover:scale-105 active:scale-95 duration-200"
        >
          Starta om spelet
        </button>
      </div>
    </div>
  );
}

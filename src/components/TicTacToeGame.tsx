import type { Cell, Player } from "../types/types";
import { checkWin, checkDraw } from "../utils/gameLogic";
import { useState } from "react";

export default function TicTacToeGame() {
  const [boardSize, setBoardSize] = useState<number>(3); // Default board 3x3
  const [winLength, setWinLength] = useState<number>(3); // Default winning for default board (3x3)
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  function handleClick(index: number) {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, currentPlayer, boardSize, winLength)) {
      setWinner(currentPlayer);
      return;
    }

    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  // Function to reset game
  function resetGame(size = boardSize, win = winLength) {
    // Set limits to board and winning combination
    const clampedSize = Math.max(3, Math.min(size, 7));
    const clampedWin = Math.max(3, Math.min(win, clampedSize));

    setBoardSize(clampedSize);
    setWinLength(clampedWin);
    setBoard(Array(clampedSize * clampedSize).fill(null));
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
        {/* Board Settings */}
        <div className="flex flex-col gap-4 items-center">
          {/* Board Size Selector */}
          <div className="flex gap-2 items-center">
            <label htmlFor="boardSize" className="font-medium">
              Brädstorlek:
            </label>
            <input
              id="boardSize"
              type="number"
              min={3}
              max={7}
              value={boardSize}
              onChange={(e) => resetGame(Number(e.target.value), winLength)}
              className="border border-gray-400 rounded-lg p-1 w-16 text-center"
            />
            ({boardSize} x {boardSize})
          </div>

          {/* Win Lenght Selector */}
          <div className="flex gap-2 items-center">
            <label htmlFor="winLength" className="font-medium">
              Vinst längd:
            </label>
            <select
              id="winLength"
              value={winLength}
              onChange={(e) => resetGame(boardSize, Number(e.target.value))}
              className="border border-gray-400 rounded-lg p-1"
            >
              {[...Array(boardSize - 2)].map((_, i) => {
                const len = i + 3;
                return (
                  <option key={len} value={len}>
                    {len} i rad
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Board */}
        <div
          className="grid gap-2 w-full max-w-[min(90vw, 500px)] aspect-square"
          style={{
            gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
          }}
        >
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="aspect-square font-bold border border-gray-300 flex items-center justify-center 
              bg-gray-50 hover:bg-gray-200 hover:cursor-pointer 
              rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 duration-200"
            >
              <span className="text-[clamp(1rem,4vw,3rem)] leading-none">
                {cell ?? ""}
              </span>
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="text-center text-lg font-medium min-h-8">
          {winner && (
            <p className="text-green-600 font-semibold">
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

        {/* Reset Game */}
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

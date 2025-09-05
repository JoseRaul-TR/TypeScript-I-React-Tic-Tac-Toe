import { useState } from "react";
import type { Board, Player } from "../types/types";
import { checkWin, checkDraw } from "../utils/gameLogic";
import GameControls from "./GameControls";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";

export default function TicTacToeGame() {
  // States
  const [boardSize, setBoardSize] = useState<number>(3); // Board size (default 3x3)
  const [winLength, setWinLength] = useState<number>(3); // How many in a row to win
  const [board, setBoard] = useState<Board>(
    Array.from({ length: 3 }, () => Array(3).fill(null))
  ); // The grid state
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X"); // Current player turn
  const [winner, setWinner] = useState<Player | null>(null); // Stores the winner
  const [isDraw, setIsDraw] = useState(false); // Stores draw state

  // Handle a move when a square is clicked
  function handleClick(row: number, col: number) {
    // Ignore clicks if cell is already filled or if game already won
    if (board[row][col] !== null || winner) return;

    // Place current player's symbol
    const newBoard: Board = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Check if current player won
    if (checkWin(newBoard, currentPlayer, winLength, row, col)) {
      setWinner(currentPlayer);
      return;
    }

    // Check if the board is full (draw)
    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  // Reset game (used on restart and when changing board settings)
  function resetGame(size = boardSize, win = winLength) {
    // Set limits to board size (3-7) and winning length (min 3, max = board size)
    const clampedSize = Math.max(3, Math.min(size, 7));
    const clampedWin = Math.max(3, Math.min(win, clampedSize));

    setBoardSize(clampedSize);
    setWinLength(clampedWin);
    setBoard(
      Array.from({ length: clampedSize }, () => Array(clampedSize).fill(null))
    );
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
        {/* Controls */}
        <GameControls
          boardSize={boardSize}
          winLength={winLength}
          resetGame={resetGame}
        />

        {/* Game Board */}
        <GameBoard board={board} handleClick={handleClick} />

        {/* Game Status Text */}
        <GameStatus
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
        />

        {/* Restart Button */}
        <button
          onClick={() => resetGame()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md text-white font-semibold hover:cursor-pointer transition-all transform hover:scale-105 active:scale-95 duration-200"
        >
          Starta nytt spel
        </button>
      </div>
    </div>
  );
}

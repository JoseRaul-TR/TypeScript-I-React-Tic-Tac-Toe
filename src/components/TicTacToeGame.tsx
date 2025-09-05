import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useReducer } from "react";
import { gameReducer, initialState } from "../reducers/gameReducer";
import GameControls from "./GameControls";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";

export default function TicTacToeGame() {
  // useReducer to manage state
  const [state, dispatch] = useReducer(gameReducer, initialState);
  // useContext
  const themeCtx = useContext(ThemeContext);
  if (!themeCtx) throw new Error("TicTacToeGame must be inside ThemeProvider");
  const { theme, toggleTheme } = themeCtx;

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Game Container */}
      <div
        className={`p-8 rounded-2xl shadow-lg w-[90%] max-w-md flex flex-col items-center gap-6
        ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold tracking-wide">
          🎮 Tic Tac Toe 🎮
        </h1>

        {/* Controls */}
        <GameControls
          boardSize={state.boardSize}
          winLength={state.winLength}
          dispatch={dispatch}
        />

        {/* Game Board */}
        <GameBoard board={state.board} dispatch={dispatch} />

        {/* Game Status Text */}
        <GameStatus
          winner={state.winner}
          isDraw={state.isDraw}
          currentPlayer={state.currentPlayer}
        />

        {/* Restart Button */}
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md text-white font-semibold hover:cursor-pointer transition-all transform hover:scale-105 active:scale-95 duration-200"
        >
          Starta nytt spel
        </button>
      </div>

      {/* Theme switch (ratio slider) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <span className="text-yellow-400">☀️</span>
        <label className="relative inline-flex items-center cursor-pointer w-14 h-6">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="sr-only"
          />
          {/* Track */}
          <div className="w-full h-6 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner transition-colors" />
          {/* Dot */}
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform
          ${theme === "dark" ? "translate-x-8" : "translate-x-1"}`}
          />
        </label>
        <span className="text-blue-400">🌙</span>
      </div>
    </div>
  );
}

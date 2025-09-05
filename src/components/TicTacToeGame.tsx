import { useReducer } from "react";
import { gameReducer, initialState } from "../reducers/gameReducer";
import GameControls from "./GameControls";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";

export default function TicTacToeGame() {
  // useReducer to manage state
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md flex flex-col items-center gap-6">
        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold tracking-wide">
          🎮 Tic Tac Toe 🎮
        </h1>
        {/* Controls */}
        <GameControls
          boardSize={state.boardSize}
          winLength={state.winLength}
          resetGame={(size, win) => dispatch({ type: "RESET", size, win })}
        />

        {/* Game Board */}
        <GameBoard
          board={state.board}
          handleClick={(row, col) => dispatch({ type: "MAKE_MOVE", row, col })}
        />

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
    </div>
  );
}

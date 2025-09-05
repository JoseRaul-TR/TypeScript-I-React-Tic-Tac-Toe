import type { Board, GameAction } from "../types/types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type GameBoardProps = {
  board: Board;
  dispatch: React.Dispatch<GameAction>;
};

export default function GameBoard({ board, dispatch }: GameBoardProps) {
  // Consume ThemeContext
  const themeCtx = useContext(ThemeContext);
  if (!themeCtx) throw new Error("GameBoard must be inside ThemeProvider");
  const { theme } = themeCtx;

  const boardSize = board.length;

  return (
    <div
      className={`grid gap-2 w-full max-w-[min(90vw, 500px)] aspect-square
        ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
      style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
      }}
    >
      {board.map((row, r) =>
        row.map((cell, c) => (
          <button
            key={`${r}-${c}`}
            onClick={() => dispatch({ type: "MAKE_MOVE", row: r, col: c })}
            className={`aspect-square font-bold border border-gray-300 flex items-center justify-center rounded-xl shadow-sm
              ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-50 hover:bg-gray-200"
              } hover:cursor-pointer 
               transition-all transform hover:scale-105 active:scale-95 duration-200`}
          >
            <span className="text-[clamp(1rem,4vw,3rem)] leading-none">
              {cell ?? ""}
            </span>
          </button>
        ))
      )}
    </div>
  );
}

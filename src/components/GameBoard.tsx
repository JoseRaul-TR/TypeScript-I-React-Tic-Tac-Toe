import type { Board } from "../types/types";

type GameBoardProps = {
  board: Board;
  handleClick: (row: number, col: number) => void;
};

export default function GameBoard({ board, handleClick }: GameBoardProps) {
  const boardSize = board.length;

  return (
    <div
      className="grid gap-2 w-full max-w-[min(90vw, 500px)] aspect-square"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleClick(rowIndex, colIndex)}
            className="aspect-square font-bold border border-gray-300 flex items-center justify-center 
              bg-gray-50 hover:bg-gray-200 hover:cursor-pointer 
              rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 duration-200"
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

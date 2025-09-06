import { useContext } from "react";
import type { GameAction } from "../types/types";
import { ThemeContext } from "../context/ThemeContext";

type GameControlsProps = {
  boardSize: number;
  winLength: number;
  dispatch: React.Dispatch<GameAction>;
  disabled: boolean;
};

export default function GameControls({
  boardSize,
  winLength,
  dispatch,
  disabled,
}: GameControlsProps) {
  // Consume ThemeContext
  const themeCtx = useContext(ThemeContext);
  if (!themeCtx) throw new Error("GameControls must be inside ThemeProvider");
  const { theme } = themeCtx;

  return (
    <div className={`flex flex-col gap-4 items-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {/* Board Size Input */}
      <div className="flex gap-2 items-center">
        <label htmlFor="boardSize" className="font-medium text-sm  md:text-base">
          Brädstorlek:
        </label>
        <input
          id="boardSize"
          type="number"
          min={3}
          max={7}
          value={boardSize}
          onChange={(e) => dispatch({ type: "RESET", size: Number(e.target.value) })}
          disabled={disabled}
          className="border border-gray-400 rounded-lg p-1 w-16 text-center text-sm  md:text-base"
        />
        <span className="text-sm  md:text-base">({boardSize} x {boardSize})</span>
      </div>

      {/* Win Length Selector */}
      <div className="flex gap-2 items-center">
        <label htmlFor="winLength" className="font-medium text-sm md:text-base">
          Vinst längd:
        </label>
        <select
          id="winLength"
          value={winLength}
          onChange={(e) => dispatch({ type: "RESET", win: Number(e.target.value) })}
          disabled={disabled}
          className="border border-gray-400 rounded-lg p-1 text-sm md:text-base"
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
  );
}

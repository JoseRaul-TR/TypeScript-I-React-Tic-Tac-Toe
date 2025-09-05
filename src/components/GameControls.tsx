type GameControlsProps = {
  boardSize: number;
  winLength: number;
  resetGame: (size?: number, win?: number) => void;
};

export default function GameControls({
  boardSize,
  winLength,
  resetGame,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Board Size Input */}
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

      {/* Win Length Selector */}
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
  );
}

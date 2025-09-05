import type { Player } from "../types/types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type GameStatusProps = {
  winner: Player | null;
  isDraw: boolean;
  currentPlayer: Player;
};

export default function GameStatus({
  winner,
  isDraw,
  currentPlayer,
}: GameStatusProps) {
  // Consume ThemeContext
  const themeCtx = useContext(ThemeContext);
  if (!themeCtx) throw new Error("GameStatus must be inside ThemeProvider");
  const { theme } = themeCtx;

  return (
    <div
      className={`text-center text-lg font-medium min-h-8 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {winner && (
        <p className="text-green-600 font-semibold">
          Grattis! {winner} vinner!
        </p>
      )}
      {isDraw && (
        <p className="text-yellow-600 font-semibold">Ett oavgjort resultat!</p>
      )}
      {!winner && !isDraw && (
        <p>
          Nästa spelare: <span className="font-bold">{currentPlayer}</span>
        </p>
      )}
    </div>
  );
}

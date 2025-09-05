import type { Player } from "../types/types";

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
  return (
    <div className="text-center text-lg font-medium min-h-8">
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

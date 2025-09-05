export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[][];

export type GameState = {
    boardSize: number;
    winLength: number;
    board: Board;
    currentPlayer: Player;
    winner: Player | null;
    isDraw: boolean;
};

export type GameAction =
    | { type: "MAKE_MOVE"; row: number; col: number }
    | { type: "RESET"; size?: number; win?: number };
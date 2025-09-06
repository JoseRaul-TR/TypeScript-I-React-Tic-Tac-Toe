import type { GameState, GameAction } from "../types/types";
import { checkWin, checkDraw, createEmptyBoard } from "../utils/gameLogic";

// Reducer for game logic
export function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "MAKE_MOVE": {
            const { row, col } = action;
            if (state.board[row][col] !== null || state.winner || state.isDraw) return state;

            const newBoard = state.board.map((r) => [...r]);
            newBoard[row][col] = state.currentPlayer;

            if (checkWin(newBoard, state.currentPlayer, state.winLength, row, col)) {
                return { ...state, board: newBoard, winner: state.currentPlayer };
            }

            if (checkDraw(newBoard)) {
                return { ...state, board: newBoard, isDraw: true };
            }

            return {
                ...state,
                board: newBoard,
                currentPlayer: state.currentPlayer === "X" ? "O" : "X",
            };
        }

        case "RESET": {
            const clampedSize = Math.max(3, Math.min(action.size ?? state.boardSize, 7));
            const clampedWin = Math.max(3, Math.min(action.win ?? state.winLength, clampedSize));

            return {
                boardSize: clampedSize,
                winLength: clampedWin,
                board: createEmptyBoard(clampedSize),
                currentPlayer: "X",
                winner: null,
                isDraw: false,
            };
        }

        default:
            return state;
    }
}

// Initial Satate
export const initialState: GameState = {
    boardSize: 3,
    winLength: 3,
    board:createEmptyBoard(3),
    currentPlayer: "X",
    winner: null,
    isDraw: false,
};
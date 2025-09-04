import type { Cell, Player } from "../types/types";

// Function to check winner
export function checkWin(board: Cell[], player: Player, boardSize: number): boolean {
    // Rows
    for (let row = 0; row < boardSize; row++) {
        if (board.slice(row * boardSize, (row + 1) * boardSize).every(c => c === player)) {
            return true;
        }
    }
    // Columns
    for (let col = 0; col < boardSize; col++) {
        if (board.filter((_, i) => i % boardSize === col).every(c => c === player)) {
            return true;
        }
    }
    // Diagonal ↘
    if (Array.from({ length: boardSize }, (_, i) => board[i * boardSize + i]).every(c => c === player)) {
        return true;
    }
    // Diagonal ↙
    if (Array.from({ length: boardSize }, (_, i) => board[i * boardSize + (boardSize -1 - i)]).every(c => c === player)) {
        return true;
    }

    return false;
}

// Function to check draw
export function checkDraw(board: Cell[]): boolean {
    return board.every((cell) => cell !== null);
}

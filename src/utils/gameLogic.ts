import type { Cell, Player } from "../types/types";

// Winning patterns
const winPatterns: number[][] = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
];

// Function to check winner
export function checkWin(board: Cell[], player: Player): boolean {
    return winPatterns.some((pattern) =>
        pattern.every((index) => board[index] === player)
    );
}

// Function to check draw
export function checkDraw(board: Cell[]): boolean {
    return board.every((cell) => cell !== null);
}
import type { Cell, Player } from "../types/types";

// Function to check winner
export function checkWin(board: Cell[], player: Player, boardSize: number, winLength: number): boolean {

    // Check a line in any direction
    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal ↘
        [1, -1],  // diagonal ↙
    ];

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row * boardSize + col] !== player) continue;

            for (const [dRow, dCol] of directions) {
                let count = 0;
                let r = row;
                let c = col;

                while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r * boardSize + c] === player) {
                    count++;
                    if (count >= winLength) return true;
                    r += dRow;
                    c += dCol;
                }
            }
        }
    }

    return false;
}

// Function to check draw
export function checkDraw(board: Cell[]): boolean {
    return board.every((cell) => cell !== null);
}

import type { Board, Player } from "../types/types";

/**
 * Check if a move results in a win for the current player
 * @param board The game board as a 2D array (Board = Cell[][])
 * @param player The player who made the last moved ("X" or "O")
 * @param winLength How many in a row are required to win
 * @param row Row index of the last move
 * @param col Column index of the last move
 * @returns true if the player has won, otherwise false
 */
export function checkWin(
    board: Board,
    player: Player,
    winLength: number,
    row: number,
    col: number
): boolean {
    const boardSize = board.length; // The board is square, so length = number of row/columns

    // Directions to check: each is a vector [rowStep, colStep]
    const directions: Array<[number, number]> = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal ↘
        [1, -1],  // diagonal ↙
    ];

    /**
     * Count consecutive cells in a given direction starting from the last move
     * @param dRow Step in row direction
     * @param dCol Step in column direction
     * @returns Number of consecutive cells matching the player in this direction
     */
    function countDirection(dRow: number, dCol: number): number {
        let r = row + dRow; // Start one step away from last move
        let c = col + dCol;
        let count = 0;

        // Keep moving in the direction while the cell is inside the board
        // and belongs to the same player
        while (
            r >= 0 &&
            r < boardSize &&
            c >= 0 &&
            c < boardSize &&
            board[r][c] === player
        ) {
            count++;
            r += dRow;
            c += dCol;
        }

        return count;
    }

    // Check each direction for a winning sequence
    for (const [dRow, dCol] of directions) {
        // Count cells in both forward and backward directions
        // Add 1 for the last move itself
        const total =
            1 + countDirection(dRow, dCol) + countDirection(-dRow, -dCol);

        // If total consecutive cells >= winLength, player wins
        if (total >= winLength) return true;
    }

    // No winning pattern found
    return false;
}

/**
 * Check if the board is completely filled (no empty cells)
 * @param board The game board (2D array)
 * @returns true if all cells are filled, otherwise false
 */
export function checkDraw(board: Board): boolean {
    // `every` on rows, then `every` on cells in each row
    return board.every((row) => row.every((cell) => cell !== null));
}

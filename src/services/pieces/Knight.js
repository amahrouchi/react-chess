import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a pawn
 */
class Knight extends AbstractPiece {

    /**
     * Whether the knight can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        // Check from != to
        if (!super.canMove(from, to)) {
            return false;
        }

        // Check available squares
        let hasMatched = false;
        for (let move of this.getAvailableMoves()) {
            const currSquare = {
                x : from.x + move[0],
                y : from.y + move[1]
            };

            if (currSquare.x === to.x && currSquare.y === to.y ) {
                hasMatched = true;
                break;
            }
        }

        if (!hasMatched) {
            return false;
        }

        // Check if there is a piece on the targeted square
        const targetPiece = this.chessBoard.getPiece(to.x, to.y);

        return targetPiece === null || targetPiece.getColor() !== this.getColor();
    }

    /**
     * Lists the knight's available moves
     * @return {Array}
     */
    getAvailableMoves() {
        return [
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
        ];
    }
}

export default Knight;

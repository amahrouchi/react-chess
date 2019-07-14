import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a king
 */
class King extends AbstractPiece {
    /**
     * Whether the king can move from a location to another
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
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
        ];
    }
}

export default King;

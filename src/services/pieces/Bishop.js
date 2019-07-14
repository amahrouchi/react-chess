import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a bishop
 */
class Bishop extends AbstractPiece {

    /**
     * Whether the bishop can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        // Check from != to
        if (!super.canMove(from, to)) {
            return false;
        }

        // Check the basic movement + path
        const checkDirectionAndPath = Bishop.checkDirectionAndPath(from, to, this.chessBoard);
        if (!checkDirectionAndPath) {
            return false;
        }

        // Check if there is a piece on the targeted square
        const targetPiece = this.chessBoard.getPiece(to.x, to.y);

        return targetPiece === null || targetPiece.getColor() !== this.getColor();
    }

    /**
     * Check the bishop basic movement (in diagonal) + the obstacle on its path
     * @param {object} from
     * @param {object} to
     * @param {ChessBoard} chessBoard
     * @return {boolean}
     */
    static checkDirectionAndPath(from, to, chessBoard) {

        // Check the basic movement
        const basicMovement = Math.abs(from.x - to.x) === Math.abs(from.y - to.y);
        if (!basicMovement) {
            return false;
        }

        // Check obstacle on the path
        const distance   = Math.abs(from.x - to.x);
        const xIncrement = to.x > from.x ? 1 : -1;
        const yIncrement = to.y > from.y ? 1 : -1;

        for (
            let i = 1;
            i < distance;
            i++
        ) {
            const xCheck = from.x + i * xIncrement;
            const yCheck = from.y + i * yIncrement;

            const hasPiece = chessBoard.hasPiece(xCheck, yCheck);
            if (hasPiece) {
                return false;
            }
        }

        return true;
    }
}

export default Bishop;

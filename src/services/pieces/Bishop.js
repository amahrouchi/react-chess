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
        const differentSquares = super.canMove(from, to);
        if (!differentSquares) {
            return false;
        }

        // Check the basi movement
        const basicMovement = Math.abs(from.x - to.x) === Math.abs(from.y - to.y);
        if (!basicMovement) {
            return false;
        }

        // Check obstacle on the path
        const distance = Math.abs(from.x - to.x);
        const xIncrement = to.x > from.x ? 1 : -1;
        const yIncrement = to.y > from.y ? 1 : -1;

        for (
            let i = 1;
            i < distance;
            i++
        ) {
            const xCheck = from.x + i * xIncrement;
            const yCheck = from.y + i * yIncrement;

            const hasPiece = this.chessBoard.hasPiece(xCheck, yCheck);
            if (hasPiece) {
                return false;
            }
        }

        // Check if there is a piece on the targeted square
        const targetPiece = this.chessBoard.getPiece(to.x, to.y);

        return targetPiece === null || targetPiece.getColor() !== this.getColor();
    }
}

export default Bishop;

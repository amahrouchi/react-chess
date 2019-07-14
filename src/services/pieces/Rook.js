import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a rook
 */
class Rook extends AbstractPiece {

    /**
     * Whether the rook can move from a location to another
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

        // Check the basic movement
        const movementLooksValid = from.x === to.x || from.y === to.y;
        if (!movementLooksValid) {
            return false;
        }

        // Check obstacle on the path
        const movementType = from.x === to.x ? 'y' : 'x';
        const pathMap      = [to[movementType], from[movementType]];
        pathMap.sort();

        for (
            let i = pathMap[0] + 1;
            i <= pathMap[1] - 1;
            i++
        ) {

            let hasPiece;
            if (movementType === 'y') {
                hasPiece = this.chessBoard.hasPiece(from.x, i);
            } else {
                hasPiece = this.chessBoard.hasPiece(i, from.y);
            }

            if (hasPiece) {
                return false;
            }
        }

        // Check if there is a piece on the targeted square
        const targetPiece = this.chessBoard.getPiece(to.x, to.y);

        return targetPiece === null || targetPiece.getColor() !== this.getColor();
    }
}

export default Rook;

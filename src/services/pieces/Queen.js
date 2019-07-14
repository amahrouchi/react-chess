import AbstractPiece from "./AbstractPiece";
import Bishop        from "./Bishop";
import Rook          from "./Rook";

/**
 * Handles the behaviour of a queen
 */
class Queen extends AbstractPiece {
    /**
     * Whether the queen can move from a location to another
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
        const bishopMove = Bishop.checkDirectionAndPath(from, to, this.chessBoard);
        const rookMove   = Rook.checkDirectionAndPath(from, to, this.chessBoard);
        if (!bishopMove && !rookMove) {
            return false;
        }

        // Check if there is a piece on the targeted square
        const targetPiece = this.chessBoard.getPiece(to.x, to.y);

        return targetPiece === null || targetPiece.getColor() !== this.getColor();
    }
}

export default Queen;

/**
 * Handles the behaviour of a chess piece
 */
class AbstractPiece {

    /**
     * Constructor
     * @param {ChessBoard} chessBoard
     * @param color
     */
    constructor(chessBoard, color) {
        this.chessBoard = chessBoard;
        this.color      = color;
    }

    /**
     * Whether the piece can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        return true;
    }
}

export default AbstractPiece;

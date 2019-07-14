/**
 * Handles the behaviour of a chess piece
 */
class AbstractPiece {

    /**
     * Constructor
     * @param {ChessBoard} chessBoard
     * @param {string} type
     * @param {string} color
     */
    constructor(chessBoard, type, color) {
        this.chessBoard = chessBoard;
        this.type       = type;
        this.color      = color;
    }

    /**
     * Gets the piece color
     * @return {string}
     */
    getColor() {
        return this.color;
    }

    /**
     * Gets the piece type
     * @return {string}
     */
    getType() {
        return this.type;
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

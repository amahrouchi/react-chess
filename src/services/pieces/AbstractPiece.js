/**
 * Handles the behaviour of a chess piece
 */
import mainConfig from "../../config/main";

class AbstractPiece {

    /**
     * Constructor
     * @param {ChessBoard} chessBoard
     * @param {string} type
     * @param {string} color
     * @param {object} coords {x : [value], y : [value]}
     */
    constructor(chessBoard, type, color, coords) {
        this.chessBoard = chessBoard;
        this.type       = type;
        this.color      = color;
        this.coords     = coords;
        this.hasMoved   = false;
    }

    /**
     * Sets the chessboard
     * @param {ChessBoard} chessBoard
     * @return {void}
     */
    setChessBoard(chessBoard) {
        this.chessBoard = chessBoard;
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
     * Sets whether the piece has moved
     * @param {boolean} hasMoved
     * @return {void}
     */
    setHasMoved(hasMoved) {
        this.hasMoved = hasMoved;
    }

    /**
     * Sets the piece coords
     * @param {int} x
     * @param {int} y
     */
    setCoords(x, y) {
        this.coords = {
            x : x,
            y : y,
        };
    }

    /**
     * Whether the piece can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        return from.x !== to.x || from.y !== to.y;
    }

    /**
     * Whether the current piece is attacked
     * @return {boolean}
     */
    isAttacked() {

        for (let y = 0; y < mainConfig.BOARD_SIZE; y++) {
            for (let x = 0; x < mainConfig.BOARD_SIZE; x++) {
                // Get the current piece
                const piece = this.chessBoard.getPiece(x, y);
                if (
                    piece === null
                    || piece.getColor() === this.getColor()
                ) {
                    continue;
                }

                const attacking = piece.canMove(
                    {x : x, y : y},
                    {x : this.coords.x, y : this.coords.y}
                );

                if (attacking) {
                    console.log(piece);
                    return true;
                }
            }
        }

        return false;
    }
}

export default AbstractPiece;

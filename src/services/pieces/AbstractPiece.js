/**
 * Handles the behaviour of a chess piece
 */
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
        this.type       = type; // TODO: this parameter is useless, it can be set (hard coded) in child constructors
        this.color      = color;
        this.coords     = coords;
        this.nbMoves    = 0;
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
     * Gets piece coords
     * @return {Object}
     */
    getCoords() {
        return this.coords;
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
     * Returns the number of moves played by a piece
     * @return {int}
     */
    getNbMoves() {
        return this.nbMoves;
    }

    /**
     * Increment the number of moves played by a piece
     * @return {void}
     */
    incrementNbMoves() {
        this.nbMoves++;
    }

    /**
     * Whether the piece has moved
     * @return {boolean}
     */
    hasMoved() {
        return this.nbMoves > 0;
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
     * What to do after a move
     * @return {void}
     */
    afterMove() {
        return;
    }

    /**
     * Whether the current piece is attacked
     * @return {boolean}
     */
    isAttacked() {
        return this.chessBoard.isAttacked(this.color, this.coords);
    }
}

export default AbstractPiece;

import pieceConfig from '../config/piece';

/**
 * The ChessBoard class
 */
class ChessBoard {

    /**
     * Constructor
     */
    constructor(matrix, selectedCoords) {
        // Init matrix
        if (typeof matrix !== 'undefined') {
            this.matrix = matrix;
        } else {
            this.matrix = this.initMatrix();
        }

        // Init selected coordinates
        this.selectedCoords = null;
        if (typeof selectedCoords !== 'undefined') {
            this.selectedCoords = selectedCoords;
        }
    }

    /**
     * Gets the matrix
     * @return {Array}
     */
    getMatrix() {
        return this.matrix;
    }

    /**
     * Init the matrix
     * @return {Array}
     */
    initMatrix() {
        return this.matrix = [
            [pieceConfig.BLACK_ROOK, pieceConfig.BLACK_KNIGHT, pieceConfig.BLACK_BISHOP, pieceConfig.BLACK_QUEEN, pieceConfig.BLACK_KING, pieceConfig.BLACK_BISHOP, pieceConfig.BLACK_KNIGHT, pieceConfig.BLACK_ROOK],
            Array(8).fill(pieceConfig.BLACK_PAWN),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(pieceConfig.WHITE_PAWN),
            [pieceConfig.WHITE_ROOK, pieceConfig.WHITE_KNIGHT, pieceConfig.WHITE_BISHOP, pieceConfig.WHITE_QUEEN, pieceConfig.WHITE_KING, pieceConfig.WHITE_BISHOP, pieceConfig.WHITE_KNIGHT, pieceConfig.WHITE_ROOK],
        ];
    }

    /**
     * Moves a piece
     * @param {int} x
     * @param {int} y
     * @return {void}
     */
    moveSelectedTo(x, y) {
        if (!this.hasSelectedCoords()) {
            return;
        }

        const piece                                               = this.matrix[this.selectedCoords.y][this.selectedCoords.x];
        this.matrix[this.selectedCoords.y][this.selectedCoords.x] = null;
        this.matrix[y][x]                                         = piece;
    }

    /**
     * Returns the square piece
     * @param {int} x
     * @param {int} y
     * @return {string}
     */
    getPieceId(x, y) {
        return this.matrix[y][x];
    }

    /**
     * Whether a square is occupied by a piece
     * @param {int} x
     * @param {int} y
     * @return {boolean}
     */
    hasPiece(x, y) {
        return this.matrix[y][x] !== null;
    }

    /**
     * Gets the selected coords
     * @return {object}
     */
    getSelectedCoords() {
        return this.selectedCoords;
    }

    /**
     * Whether the board has selected coords
     * @return {boolean}
     */
    hasSelectedCoords() {
        return this.selectedCoords !== null;
    }

    /**
     * Checks if a position is selected
     * @param {int} x
     * @param {int} y
     * @return {boolean}
     */
    isSelected(x, y) {
        return this.hasSelectedCoords()
            && this.selectedCoords.x === x
            && this.selectedCoords.y === y
    }

    /**
     * Selected coordinates
     * @param {int} x
     * @param {int} y
     * @return {void}
     */
    selectCoords(x, y) {
        this.selectedCoords = {x : x, y : y};
    }

    /**
     * Reset selected coords
     * @return {void}
     */
    unselectCoords() {
        this.selectedCoords = null;
    }
}

export default ChessBoard;

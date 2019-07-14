import pieceConfig  from '../config/piece';
import mainConfig   from "../config/main";
import PieceFactory from "./pieces/PieceFactory";

/**
 * The ChessBoard class
 */
class ChessBoard {

    /**
     * Constructor
     * @param {Array} matrix The matrix representing the board state
     * @param {object} selectedCoords {x : <value>, y : <value>}
     * @param {string} player Current player ('w' or 'b')
     */
    constructor(matrix, selectedCoords, player) {
        // Init matrix
        if (typeof matrix !== 'undefined') {
            this.matrix = matrix;
        } else {
            this.initMatrix();
        }

        // Init selected coordinates
        this.selectedCoords = null;
        if (typeof selectedCoords !== 'undefined') {
            this.selectedCoords = selectedCoords;
        }

        this.player = pieceConfig.WHITE;
        if (typeof player !== 'undefined') {
            this.player = player;
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
     * @return {void}
     */
    initMatrix() {
        const initialMatrix = mainConfig.INITIAL_MATRIX;

        this.matrix = [[],[],[],[],[],[],[],[]];
        for (let y = 0; y < mainConfig.BOARD_SIZE; y++) {
            for (let x = 0; x < mainConfig.BOARD_SIZE; x++) {
                const pieceId     = initialMatrix[y][x];
                this.matrix[y][x] = pieceId !== null
                                    ? PieceFactory.create(pieceId, this)
                                    : null;
            }
        }
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
     * @return {AbstractPiece|null}
     */
    getPiece(x, y) {
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

    /**
     * Gets the current player
     * @return {string|string}
     */
    getPlayer() {
        return this.player;
    }

    /**
     * Changes the current player
     * @return {void}
     */
    changePlayer() {
        this.player = this.player === pieceConfig.BLACK ? pieceConfig.WHITE : pieceConfig.BLACK;
    }
}

export default ChessBoard;

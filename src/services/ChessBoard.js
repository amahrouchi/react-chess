import pieceConfig  from '../config/piece';
import mainConfig   from "../config/main";
import PieceFactory from "./pieces/PieceFactory";
import {cloneDeep}  from "lodash";

/**
 * The ChessBoard class
 */
class ChessBoard {

    /**
     * Constructor
     * @param {Array} matrix The matrix representing the board state
     * @param {object} selectedCoords {x : <value>, y : <value>}
     * @param {string} player Current player ('w' or 'b')
     * @param {AbstractPiece} lastPieceMoved
     */
    constructor(
        matrix         = null,
        selectedCoords = null,
        player         = pieceConfig.WHITE,
        lastPieceMoved = null
    ) {
        // Init matrix
        if (matrix !== null) {
            this.matrix = matrix;
        } else {
            this.initMatrix();
        }

        // Init selected coordinates
        this.selectedCoords = selectedCoords;

        // Init the player to play
        this.player = player;

        // Inits the last piece moved
        this.lastPieceMoved = lastPieceMoved;
    }

    /**
     * Gets the matrix
     * @return {Array}
     */
    getMatrix() {
        return this.matrix;
    }

    /**
     * Gets the matrix copy
     * @return {Array}
     */
    getMatrixCopy() {

        const matrix = [[], [], [], [], [], [], [], []];
        for (let y = 0; y < mainConfig.BOARD_SIZE; y++) {
            for (let x = 0; x < mainConfig.BOARD_SIZE; x++) {
                matrix[y][x] = this.matrix[y][x];
            }
        }

        return matrix;
    }

    /**
     * Initializes the matrix
     * @return {void}
     */
    initMatrix() {
        const initialMatrix = mainConfig.INITIAL_MATRIX;

        this.matrix = [[], [], [], [], [], [], [], []];
        for (let y = 0; y < mainConfig.BOARD_SIZE; y++) {
            for (let x = 0; x < mainConfig.BOARD_SIZE; x++) {
                const pieceId     = initialMatrix[y][x];
                this.matrix[y][x] = pieceId !== null
                                    ? PieceFactory.create(pieceId, {x : x, y : y}, this)
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
        piece.setHasMoved(true);
        piece.setCoords(x, y);
        this.lastPieceMoved = piece;
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
     * Removes a piece from the board
     * @param {int} x
     * @param {int} y
     * @return {void}
     */
    removePiece(x, y) {
        this.matrix[y][x] = null;
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

    /**
     * Gets the last piece moved
     * @return {AbstractPiece|null}
     */
    getLastPieceMoved() {
        return this.lastPieceMoved;
    }

    /**
     * Whether the current piece is attacked
     * @return {boolean}
     */
    isAttacked(playerColor, coords) {

        for (let y = 0; y < mainConfig.BOARD_SIZE; y++) {
            for (let x = 0; x < mainConfig.BOARD_SIZE; x++) {
                // Get the current piece
                const piece = this.getPiece(x, y);
                if (
                    piece === null
                    || piece.getColor() === playerColor
                ) {
                    continue;
                }

                const attacking = piece.canMove(
                    {x : x, y : y},
                    {x : coords.x, y : coords.y}
                );

                if (attacking) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks if a playing king is check
     * @return {boolean}
     */
    kingInCheck() {
        for (let y = 0; y < mainConfig.BOARD_SIZE; y++) {
            for (let x = 0; x < mainConfig.BOARD_SIZE; x++) {
                const piece = this.getPiece(x, y);
                if (
                    piece !== null
                    && piece.getType() === pieceConfig.KING
                    && piece.getColor() === this.getPlayer()
                    && piece.isAttacked()
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks if the king is mate
     * @return {boolean}
     */
    kingIsMate(isCheck = true) {

        /*
         * This algorithm is probably the worst to check for a mate
         * TODO: improve it!
         */

        if (!isCheck) {
            return false;
        }

        // Find all player's pieces
        for (let pieceY = 0; pieceY < mainConfig.BOARD_SIZE; pieceY++) {
            for (let pieceX = 0; pieceX < mainConfig.BOARD_SIZE; pieceX++) {
                const piece = this.getPiece(pieceX, pieceY);
                if (
                    piece !== null
                    && piece.getColor() === this.getPlayer()
                ) {

                    // Check all current piece moves
                    for (let moveY = 0; moveY < mainConfig.BOARD_SIZE; moveY++) {
                        for (let moveX = 0; moveX < mainConfig.BOARD_SIZE; moveX++) {

                            const canMove = piece.canMove(
                                {x : pieceX, y : pieceY},
                                {x : moveX, y : moveY}
                            );

                            if (!canMove) {
                                continue;
                            }

                            // Move the piece and check if the king is still in check
                            let chessBoardClone = cloneDeep(this);
                            chessBoardClone.selectCoords(pieceX, pieceY);
                            chessBoardClone.moveSelectedTo(moveX, moveY);

                            // If the king is not in check after this move, it means that it is not a mate
                            if (!chessBoardClone.kingInCheck()) {
                                return false;
                            }
                        }
                    }
                }
            }
        }

        // All available moves cannot prevent the current check, so it is mate
        return true;
    }
}

export default ChessBoard;

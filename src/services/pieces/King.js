import AbstractPiece from "./AbstractPiece";
import pieceConfig   from "../../config/piece";
import Rook          from "./Rook";

/**
 * Handles the behaviour of a king
 */
class King extends AbstractPiece {

    /**
     * Constructor
     * @param {ChessBoard} chessBoard
     * @param {string} type
     * @param {string} color
     * @param {object} coords {x : [value], y : [value]}
     */
    constructor(chessBoard, type, color, coords) {
        super(chessBoard, type, color, coords);

        this.castlingRook = null;
    }

    /**
     * Whether the king can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        // Check from != to
        if (!super.canMove(from, to)) {
            return false;
        }

        // Check available squares
        let hasMatched = false;

        move_loop:
            for (let move of this.getAvailableMoves()) {
                const currSquare = {
                    x : from.x + move.coords[0],
                    y : from.y + move.coords[1]
                };

                if (
                    currSquare.x === to.x
                    && currSquare.y === to.y
                ) {
                    switch (move.type) {
                        case 'one_square':
                            hasMatched = true;
                            break move_loop;

                        case 'castle1':
                        case 'castle2':
                            // Check if the king has already moved
                            if (this.hasMoved) {
                                return false;
                            }

                            // Potential rook coordinates
                            const rookCoords = {
                                x : this.coords.x + move.rookCoords[0],
                                y : this.coords.y + move.rookCoords[1]
                            };

                            // Check pieces on the path
                            const checkPath = Rook.checkDirectionAndPath(
                                {x : this.coords.x, y : this.coords.y},
                                {x : rookCoords.x, y : rookCoords.y},
                                this.chessBoard
                            );
                            if (!checkPath) {
                                return false;
                            }

                            // Check if the king's path is safe
                            const rookCoordsAfter = {
                                x : this.coords.x + move.rookCoordsAfter[0],
                                y : this.coords.y + move.rookCoordsAfter[1]
                            };
                            if (
                                this.chessBoard.isAttacked(this.color, this.coords)
                                || this.chessBoard.isAttacked(this.color, rookCoordsAfter)
                                || this.chessBoard.isAttacked(this.color, to)
                            ) {
                                return false;
                            }

                            // Get the rook position piece
                            const rook = this.chessBoard.getPiece(rookCoords.x, rookCoords.y);

                            // Check if the piece on this square is a rook
                            if (
                                rook === null
                                || rook.getType() !== pieceConfig.ROOK
                            ) {
                                return false;
                            }

                            // Check if the rook has moved
                            const rookHasMoved = rook.getHasMoved();
                            if (!rookHasMoved) {
                                // Store the castling rook data
                                this.castlingRook = {
                                    piece : rook,
                                    after : {
                                        x : rookCoordsAfter.x,
                                        y : rookCoordsAfter.y,
                                    },
                                };

                                return true;
                            }

                            return false;

                        default:
                            throw new Error('unknown king move type : ' + move.type);
                    }
                }
            }

        if (!hasMatched) {
            return false;
        }

        // Check if there is a piece on the targeted square
        const targetPiece = this.chessBoard.getPiece(to.x, to.y);

        return targetPiece === null || targetPiece.getColor() !== this.getColor();
    }

    /**
     * After validating and performing the castling move, move the rook
     * @return {void}
     */
    afterMove() {
        if (this.castlingRook !== null) {
            const matrix = this.chessBoard.getMatrix();

            // Move the rook to is final location
            matrix[this.castlingRook.piece.getCoords().y][this.castlingRook.piece.getCoords().x] = null;
            matrix[this.castlingRook.after.y][this.castlingRook.after.x]                         = this.castlingRook.piece;

            this.castlingRook.piece.setCoords(this.castlingRook.after.x, this.castlingRook.after.y);
            this.castlingRook.piece.setHasMoved(true);

            this.castlingRook = null;
        }
    }

    /**
     * Lists the knight's available moves
     * @return {Array}
     */
    getAvailableMoves() {
        return [
            {
                type   : 'one_square',
                coords : [0, -1]
            },
            {
                type   : 'one_square',
                coords : [0, 1]
            },
            {
                type   : 'one_square',
                coords : [1, -1]
            },
            {
                type   : 'one_square',
                coords : [1, 0]
            },
            {
                type   : 'one_square',
                coords : [1, 1]
            },
            {
                type   : 'one_square',
                coords : [-1, -1]
            },
            {
                type   : 'one_square',
                coords : [-1, 0]
            },
            {
                type   : 'one_square',
                coords : [-1, 1]
            },
            {
                type            : 'castle1',
                coords          : [2, 0],
                rookCoords      : [3, 0],
                rookCoordsAfter : [1, 0],
            },
            {
                type            : 'castle2',
                coords          : [-2, 0],
                rookCoords      : [-4, 0],
                rookCoordsAfter : [-1, 0],
            }
        ];
    }
}

export default King;

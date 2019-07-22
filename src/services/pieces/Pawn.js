import pieceConfig   from '../../config/piece';
import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a pawn
 */
class Pawn extends AbstractPiece {

    /**
     * Constructor
     * @param {ChessBoard} chessBoard
     * @param {string} type
     * @param {string} color
     * @param {object} coords {x : [value], y : [value]}
     */
    constructor(chessBoard, type, color, coords) {
        super(chessBoard, type, color, coords);

        this.pieceToRemoveAfter = null;
    }

    /**
     * Whether the pawn can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        // Check from != to
        if (!super.canMove(from, to)) {
            return false;
        }

        const availableMoves = this.getAvailableMoves()[this.color];
        for (const moveInfo of availableMoves) {
            const currTo = {};
            currTo.x     = from.x + moveInfo.coords.x;
            currTo.y     = from.y + moveInfo.coords.y;

            if (currTo.x !== to.x || currTo.y !== to.y) {
                continue;
            }

            switch (moveInfo.type) {

                // Move one square forward
                case 'forward':
                    return !this.chessBoard.hasPiece(to.x, to.y);

                // Move 2 squares forward
                case 'forward2':
                    return !this.hasMoved
                        && !this.chessBoard.hasPiece(to.x, to.y);

                // Take opponent pawn "en passant"
                case 'en_passant':
                case 'en_passant2':

                    // TODO Bug: on peut prendre en passant meme si ce n'est pas le premier move du pion adverse

                    if (
                        (this.color === pieceConfig.WHITE && from.y !== 3)
                        || (this.color === pieceConfig.BLACK && from.y !== 4)
                    ) {
                        continue; // continue here to check the "take" moves too
                    }

                    const increment       = this.color === pieceConfig.WHITE ? 1 : -1;
                    const opponentPawn    = this.chessBoard.getPiece(to.x, to.y + increment);
                    const hasOpponentPawn = opponentPawn !== null
                        && opponentPawn.type === pieceConfig.PAWN
                        && this.chessBoard.getLastPieceMoved() === opponentPawn;

                    if (hasOpponentPawn) {
                        this.pieceToRemoveAfter = {
                            x : to.x,
                            y : to.y + increment
                        };
                        return true;
                    }

                    continue; // continue here to check the "take" moves too

                // Take an opponent piece
                case 'take':
                case 'take2':
                    const targetPiece = this.chessBoard.getPiece(to.x, to.y);
                    return targetPiece !== null
                        && this.color !== targetPiece.getColor();

                // Unknown move...
                default:
                    return false;
            }

        }

        return false;
    }

    /**
     * Remove the opponent pawn after taking "en passant"
     * @return {void}
     */
    afterMove() {
        if (this.pieceToRemoveAfter !== null) {
            this.chessBoard.removePiece(
                this.pieceToRemoveAfter.x,
                this.pieceToRemoveAfter.y
            );
            this.pieceToRemoveAfter = null;
        }
    }

    /**
     * Returns the list of available moves
     */
    getAvailableMoves() {
        const moves = {};

        // When white
        moves[pieceConfig.WHITE] = [
            {
                type   : 'forward',
                coords : {x : 0, y : -1},
            },
            {
                type   : 'forward2',
                coords : {x : 0, y : -2},
            },
            {
                type   : 'en_passant',
                coords : {x : -1, y : -1},
            },
            {
                type   : 'en_passant2',
                coords : {x : 1, y : -1},
            },
            {
                type   : 'take',
                coords : {x : -1, y : -1},
            },
            {
                type   : 'take2',
                coords : {x : 1, y : -1},
            },
        ];

        // When black
        moves[pieceConfig.BLACK] = [
            {
                type   : 'forward',
                coords : {x : 0, y : 1},
            },
            {
                type   : 'forward2',
                coords : {x : 0, y : 2},
            },
            {
                type   : 'en_passant',
                coords : {x : -1, y : 1},
            },
            {
                type   : 'en_passant2',
                coords : {x : 1, y : 1},
            },
            {
                type   : 'take',
                coords : {x : -1, y : 1},
            },
            {
                type   : 'take2',
                coords : {x : 1, y : 1},
            },
        ];

        return moves;
    }
}

export default Pawn;

import pieceConfig from '../../config/piece';

/**
 * Handles the behaviour of a pawn
 */
class Pawn {

    /**
     * Pawn constructor
     * @param {ChessBoard} chessBoard
     */
    constructor(chessBoard, color) {
        this.chessBoard = chessBoard;
        this.color      = color;
        this.hasMoved   = false;
    }

    /**
     * Whether the piece has moved
     * @return {boolean}
     */
    getHasMoved() {
        return this.hasMoved;
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
     * Whether the pawn can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {

        const availableMoves = this.getAvailableMoves()[this.color];

        for (const moveInfo of availableMoves) {
            const currTo = {};
            currTo.x     = from.x + moveInfo.square.x;
            currTo.y     = from.y + moveInfo.square.y;

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

                // Take an opponent piece
                case 'take':
                case 'take2':

                    const targetPiece = this.chessBoard.getPieceId(to.x, to.y);

                    return targetPiece !== null
                        && this.color !== targetPiece[0];

                // TODO
                // case 'en_passant':
                //     break;

                // Unknown move...
                default:
                    return false;
            }

        }

        return false;
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
                square : {x : 0, y : -1},
            },
            {
                type   : 'forward2',
                square : {x : 0, y : -2},
            },
            {
                type   : 'take',
                square : {x : -1, y : -1},
            },
            {
                type   : 'take2',
                square : {x : 1, y : -1},
            },
        ];

        // When black
        moves[pieceConfig.BLACK] = [
            {
                type   : 'forward',
                square : {x : 0, y : 1},
            },
            {
                type   : 'forward2',
                square : {x : 0, y : 2},
            },
            {
                type   : 'take',
                square : {x : -1, y : 1},
            },
            {
                type   : 'take2',
                square : {x : 1, y : 1},
            },
        ];

        return moves;
    }
}

export default Pawn;

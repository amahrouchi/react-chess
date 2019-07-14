import pieceConfig from '../../config/piece';
import Pawn        from "./Pawn";
import Knight      from "./Knight";
import Bishop      from "./Bishop";
import Queen       from "./Queen";
import King        from "./King";
import Rook        from "./Rook";

/**
 * Handles the creation of the chess piece objects
 */
class PieceFactory {

    /**
     * Creates a chess piece object
     * @param {string} pieceId
     * @param {ChessBoard} chessBoard
     * @return {AbstractPiece}
     */
    static create(pieceId, chessBoard) {

        const pieceColor = pieceId[0];
        const pieceType  = pieceId[1];

        switch (pieceType) {
            case pieceConfig.PAWN:
                return new Pawn(chessBoard, pieceType, pieceColor);

            case pieceConfig.KNIGHT:
                return new Knight(chessBoard, pieceType, pieceColor);

            case pieceConfig.BISHOP:
                return new Bishop(chessBoard, pieceType, pieceColor);

            case pieceConfig.ROOK:
                return new Rook(chessBoard, pieceType, pieceColor);

            case pieceConfig.QUEEN:
                return new Queen(chessBoard, pieceType, pieceColor);

            case pieceConfig.KING:
                return new King(chessBoard, pieceType, pieceColor);

            default:
                throw new Error('Unknown chess piece type: "' + pieceType + '"')
        }
    }
}

export default PieceFactory;

import pieceConfig from "./piece";

const mainConfig = {

    BOARD_SIZE : 8,

    PIECE_PATH : '/assets/pieces/',

    INITIAL_MATRIX : [
        [pieceConfig.BLACK_ROOK, pieceConfig.BLACK_KNIGHT, pieceConfig.BLACK_BISHOP, pieceConfig.BLACK_QUEEN, pieceConfig.BLACK_KING, pieceConfig.BLACK_BISHOP, pieceConfig.BLACK_KNIGHT, pieceConfig.BLACK_ROOK],
        Array(8).fill(pieceConfig.BLACK_PAWN),
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill(pieceConfig.WHITE_PAWN),
        [pieceConfig.WHITE_ROOK, pieceConfig.WHITE_KNIGHT, pieceConfig.WHITE_BISHOP, pieceConfig.WHITE_QUEEN, pieceConfig.WHITE_KING, pieceConfig.WHITE_BISHOP, pieceConfig.WHITE_KNIGHT, pieceConfig.WHITE_ROOK],
    ],

};

export default mainConfig;

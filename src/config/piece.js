const config = {

    // Colors
    WHITE : 'w',
    BLACK : 'b',

    // Pieces
    KING   : 'K',
    QUEEN  : 'Q',
    BISHOP : 'B',
    KNIGHT : 'N',
    ROOK   : 'R',
    PAWN   : 'p',

};

// White pieces
config.WHITE_KING   = config.WHITE + config.KING;
config.WHITE_QUEEN  = config.WHITE + config.QUEEN;
config.WHITE_BISHOP = config.WHITE + config.BISHOP;
config.WHITE_KNIGHT = config.WHITE + config.KNIGHT;
config.WHITE_ROOK   = config.WHITE + config.ROOK;
config.WHITE_PAWN   = config.WHITE + config.PAWN;

// Black pieces
config.BLACK_KING   = config.BLACK + config.KING;
config.BLACK_QUEEN  = config.BLACK + config.QUEEN;
config.BLACK_BISHOP = config.BLACK + config.BISHOP;
config.BLACK_KNIGHT = config.BLACK + config.KNIGHT;
config.BLACK_ROOK   = config.BLACK + config.ROOK;
config.BLACK_PAWN   = config.BLACK + config.PAWN;

export default config;

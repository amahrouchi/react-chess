import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a rook
 */
class Rook extends AbstractPiece {

    /**
     * Whether the rook can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        return from.x === to.x || from.y === to.y;
    }


}

export default Rook;

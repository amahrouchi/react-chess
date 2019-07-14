import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a bishop
 */
class Bishop extends AbstractPiece {

    /**
     * Whether the bishop can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        return Math.abs(from.x - to.x) === Math.abs(from.y - to.y);
    }

}

export default Bishop;

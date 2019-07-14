import AbstractPiece from "./AbstractPiece";

/**
 * Handles the behaviour of a queen
 */
class Queen extends AbstractPiece {
    /**
     * Whether the queen can move from a location to another
     * @param {object} from {x : x, y : y}
     * @param {object} to {x : x, y : y}
     * @return {boolean}
     */
    canMove(from, to) {
        const bishop = Math.abs(from.x - to.x) === Math.abs(from.y - to.y);
        const rook = from.x === to.x || from.y === to.y;
        return bishop || rook;
    }
}

export default Queen;

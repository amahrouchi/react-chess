import React from "react";
import Piece from "./Piece";

/**
 * The Square component
 */
class Square extends React.Component {

    /**
     * Renders the Square component
     * @return {*}
     */
    render() {
        // Square style
        const colorClass = this.props.isWhite ? 'white' : 'black';
        const className  = 'square ' + colorClass;

        // Piece on the square
        const pieceId = this.props.chessBoard.getMatrix()[this.props.y][this.props.x];
        const piece = pieceId !== null
            ? <Piece type={pieceId}/>
            : '';

        return (
            <div className={className}>
                {piece}
            </div>
        );
    }
}

export default Square;

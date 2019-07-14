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
        const colorClass    = this.props.isWhite ? ' white' : ' black';
        const selectedClass = this.props.chessBoard.isSelected(this.props.x, this.props.y) ? ' selected' : '';
        const className     = 'square' + colorClass + selectedClass;

        // Piece on the square
        const hasPiece = this.props.chessBoard.hasPiece(this.props.x, this.props.y);
        const pieceObject  = hasPiece ? this.props.chessBoard.getPiece(this.props.x, this.props.y) : null;
        const piece    = hasPiece
                         ? <Piece object={pieceObject}/>
                         : '';

        return (
            <div className={className}
                 onClick={() => this.props.onClick(this.props.x, this.props.y)}
            >
                {piece}
            </div>
        );
    }
}

export default Square;

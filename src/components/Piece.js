import React from "react";

/**
 * Piece component
 */
class Piece extends React.Component
{
    constructor(props) {
        super(props);

        // Piece folder path
        this.piecePath = '/assets/pieces/';

        // Set the current type of the piece
        this.state = {
            type : props.type
        };
    }

    render() {
        return (
            <img src={this.getPath()}
                 alt="A piece"
                 className="piece"
            />
        );
    }

    getPath() {
        return this.piecePath + this.state.type + '.svg';
    }
}

export default Piece;

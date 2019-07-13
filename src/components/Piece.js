import React from "react";
import mainConfig from "../config/main";

/**
 * Piece component
 */
class Piece extends React.Component
{
    /**
     * Renders the component
     * @return {*}
     */
    render() {
        return (
            <img src={this.getPath()}
                 alt="A piece"
                 className="piece"
            />
        );
    }

    /**
     * Gets the piece image file path
     * @return {string}
     */
    getPath() {
        return mainConfig.PIECE_PATH + this.props.type + '.svg';
    }
}

export default Piece;

import React       from "react";
import pieceConfig from "../config/piece";

/**
 * The promotion component
 */
class Promotion extends React.Component {

    /**
     * Renders the component
     * @return {*}
     */
    render() {
        const isWhite = this.props.chessBoard.getPlayer() === pieceConfig.WHITE;
        let className = "who-plays ";
        className += isWhite ? 'white' : 'black';

        return (
            <div className={className}>Promote to:</div>
        );
    }

}

export default Promotion;

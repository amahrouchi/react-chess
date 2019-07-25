import React       from "react";
import pieceConfig from "../config/piece";

/**
 * Handles the display of the board information
 */
class BoardInfo extends React.Component {

    /**
     * Renders the component
     * @return {*}
     */
    render() {
        const isWhite = this.props.chessBoard.getPlayer() === pieceConfig.WHITE;

        let whoPlaysClass = 'who-plays ';
        whoPlaysClass += isWhite ? 'white' : 'black';

        const inCheck = this.props.chessBoard.kingInCheck();
        let checkMessage  = inCheck
                        ? <span className="check">(check!)</span>
                        : '';
        // Check the mate
        let message       = isWhite ? 'White to play' : 'Black to play';
        if (this.props.chessBoard.kingIsMate(inCheck)) {
            // Game over
            const winner = isWhite ? 'Black' : 'White';
            message      = '';
            checkMessage = (
                <span className="check">
                        Check mate! <br/>
                    {winner} wins!
                    </span>
            );
        }

        return (
            <div className={whoPlaysClass}>
                {message} {checkMessage}
            </div>
        );
    }
}

export default BoardInfo;

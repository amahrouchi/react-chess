import React from "react";

/**
 * Handles the display of the board information
 */
class BoardInfo extends React.Component {

    /**
     * Renders the component
     * @return {*}
     */
    render() {
        let whoPlaysClass = 'who-plays ';
        whoPlaysClass += this.props.isWhite ? 'white' : 'black';

        const inCheck = this.props.chessBoard.kingInCheck();
        let checkMessage  = inCheck
                        ? <span className="check">(check!)</span>
                        : '';
        // Check the mate
        let message       = this.props.isWhite ? 'White to play' : 'Black to play';
        if (this.props.chessBoard.kingIsMate(inCheck)) {
            // Game over
            const winner = this.props.isWhite ? 'Black' : 'White';
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

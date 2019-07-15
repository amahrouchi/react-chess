import React       from 'react';
import _           from 'lodash';
import Square      from './Square';
import ChessBoard  from '../services/ChessBoard';
import mainConfig  from '../config/main';
import pieceConfig from '../config/piece';

/**
 * The chess board component
 */
class Board extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            chessBoard : new ChessBoard(),
        };
    }

    /**
     * Renders the component
     * @return {*}
     */
    render() {
        let whoPlays      = this.state.chessBoard.getPlayer() === pieceConfig.WHITE ? 'White to play' : 'Black to play';
        let whoPlaysClass = 'who-plays ';
        whoPlaysClass += this.state.chessBoard.getPlayer() === pieceConfig.WHITE ? 'white' : 'black';

        const inCheck = this.state.chessBoard.kingInCheck();
        let check     = inCheck
                        ? <span className="check">(check!)</span>
                        : '';
        // Check the mate
        if (
            inCheck
            && this.state.chessBoard.kingIsMate()
        ) {
            // Game over
            const winner = this.state.chessBoard.getPlayer() === pieceConfig.WHITE ? 'Black' : 'White';
            whoPlays     = '';
            check        = (
                <span className="check">
                    Check mate! <br/>
                    {winner} wins!
                </span>
            );
        }

        return (
            <div className="board">
                {this.buildBoard()}
                <div className={whoPlaysClass}>
                    {whoPlays} {check}
                </div>
            </div>
        );
    }

    /**
     * Builds the board
     * @return {Array}
     */
    buildBoard() {
        let board = [];
        for (let y = 0; y < mainConfig.BOARD_SIZE; y++) {

            let line = [];
            for (let x = 0; x < mainConfig.BOARD_SIZE; x++) {

                const isWhite = (x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0);

                const key = '' + y + x;
                line.push(
                    <Square isWhite={isWhite}
                            chessBoard={this.state.chessBoard}
                            x={x}
                            y={y}
                            onClick={this.clickSquare.bind(this)}
                            key={key}
                    />
                );
            }

            board.push(
                <div className="line"
                     key={y}
                >
                    {line}
                </div>
            );
        }

        return board;
    }

    /**
     * Click on a square
     * @param {int} x
     * @param {int} y
     * @return {void}
     */
    clickSquare(x, y) {
        const chessBoard = _.cloneDeep(this.state.chessBoard);

        // Select a piece to move
        if (
            !chessBoard.hasSelectedCoords()
            && chessBoard.hasPiece(x, y)
        ) {
            const player     = chessBoard.getPlayer();
            const pieceColor = chessBoard.getPiece(x, y).getColor();
            if (pieceColor !== player) {
                return;
            }

            chessBoard.selectCoords(x, y);
            this.setState({chessBoard : chessBoard});
        }
        // Move the piece to its new location
        else if (chessBoard.hasSelectedCoords()) {

            // Change the selected piece
            const targetPiece = chessBoard.getPiece(x, y);
            if (
                targetPiece !== null
                && targetPiece.getColor() === chessBoard.getPlayer()
            ) {
                chessBoard.selectCoords(x, y);
                this.setState({chessBoard : chessBoard});
                return;
            }

            // Get the selected piece
            const selectedCoords = chessBoard.getSelectedCoords();
            const selectedPiece  = chessBoard.getPiece(
                selectedCoords.x,
                selectedCoords.y
            );

            // Check if the piece can move
            let canMove = selectedPiece.canMove(
                selectedCoords,
                {x : x, y : y}
            );

            if (!canMove) {
                return;
            }

            // Move the piece
            chessBoard.moveSelectedTo(x, y);
            if (chessBoard.kingInCheck()) {
                return;
            }

            chessBoard.unselectCoords();
            chessBoard.changePlayer();
            this.setState({chessBoard : chessBoard});
        }
    }

}

export default Board;

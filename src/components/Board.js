import React      from 'react';
import Square     from "./Square";
import ChessBoard from "../services/ChessBoard";
import mainConfig from '../config/main';

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
        return (
            <div className="board">
                {this.buildBoard()}
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
        const matrix         = this.state.chessBoard.getMatrix().slice();
        const selectedCoords = this.state.chessBoard.getSelectedCoords();
        const chessBoard     = new ChessBoard(matrix, selectedCoords);

        // Select a piece to move
        if (
            !chessBoard.hasSelectedCoords()
            && chessBoard.hasPiece(x, y)
        ) {
            chessBoard.selectCoords(x, y);
            this.setState({chessBoard : chessBoard});
        }
        // Move the piece to its new location
        else if (chessBoard.hasSelectedCoords()) {
            chessBoard.moveSelectedTo(x, y);
            chessBoard.unselectCoords();
            this.setState({chessBoard : chessBoard});
        }
    }

}

export default Board;

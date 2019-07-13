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
            chessBoard     : new ChessBoard(),
            selectedCoords : null,
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

                const isWhite    = (x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0);
                const isSelected = this.state.selectedCoords !== null
                    && this.state.selectedCoords.x === x
                    && this.state.selectedCoords.y === y;

                const key = '' + y + x;
                line.push(
                    <Square isWhite={isWhite}
                            isSelected={isSelected}
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
     * @param x
     * @param y
     */
    clickSquare(x, y) {

        if (
            this.state.selectedCoords === null
            && this.state.chessBoard.hasPiece(x, y)
        ) {
            this.setState({
                selectedCoords : {
                    x : x,
                    y : y
                },
            })
        }

        // const matrix     = this.state.chessBoard.getMatrix();
        // const chessBoard = new ChessBoard(matrix);

    }

}

export default Board;

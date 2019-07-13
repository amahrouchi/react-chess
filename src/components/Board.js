import React  from 'react';
import Square from "./Square";

/**
 * The chess board component
 */
class Board extends React.Component {

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
        const boardSize = 8;

        let board = [];
        for (let i = 0; i < boardSize; i++) {

            let line = [];
            for (let j = 0; j < boardSize; j++) {

                const isWhite = (j % 2 === 0 && i % 2 === 0) || (j % 2 !== 0 && i % 2 !== 0);

                const key = '' + i + j;
                line.push(
                    <Square isWhite={isWhite}
                            key={key}
                    />
                );
            }

            board.push(
                <div className="line"
                     key={i}
                >
                    {line}
                </div>
            );
        }

        return board;
    }

}

export default Board;

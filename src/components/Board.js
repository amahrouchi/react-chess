import React        from 'react';
import {cloneDeep}  from 'lodash';
import Square       from './Square';
import BoardInfo    from './BoardInfo';
import Promotion    from './Promotion';
import ChessBoard   from '../services/ChessBoard';
import mainConfig   from '../config/main';
import PieceFactory from "../services/pieces/PieceFactory";
import pieceConfig  from "../config/piece";

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

        let boardInfo;
        if (this.state.chessBoard.getCanPromote()) {
            boardInfo = (
                <Promotion chessBoard={this.state.chessBoard}
                           onPromotionClick={this.clickPromotion.bind(this)}
                />
            );
        } else {
            boardInfo = (
                <BoardInfo chessBoard={this.state.chessBoard}/>
            );
        }

        // Change the board orientation
        let lineContainerClass = 'line-container ';
        if (this.state.chessBoard.getCanRotate()) {
            lineContainerClass += this.state.chessBoard.getPlayer() === pieceConfig.BLACK ? 'black' : '';
        }

        return (
            <div className="board">
                <div className="rotation-selection">
                    <label>
                        <input type="checkbox" onClick={this.rotationSelection.bind(this)} />
                        <span>Rotate the chessboard for Black</span>
                    </label>
                </div>
                <div className={lineContainerClass}>
                    {this.buildBoard()}
                </div>
                {boardInfo}
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
        if (this.state.chessBoard.getCanPromote()) {
            return;
        }

        const chessBoard = cloneDeep(this.state.chessBoard);

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

            selectedPiece.afterMove();

            // Pawn promotion
            let changePlayer = true;
            if (chessBoard.isPromotion()) {
                chessBoard.setCanPromote(true);
                changePlayer = false;
            }

            chessBoard.unselectCoords();
            if (changePlayer) {
                chessBoard.changePlayer();
            }

            this.setState({chessBoard : chessBoard});
        }
    }

    /**
     * Click on the promotion piece
     * @param {string} pieceType
     * @return {void}
     */
    clickPromotion(pieceType) {

        const chessBoard = cloneDeep(this.state.chessBoard);
        const coords     = chessBoard.getLastPieceMoved().getCoords();

        // Create the new piece
        const piece = PieceFactory.create(
            chessBoard.getPlayer() + pieceType,
            coords,
            chessBoard
        );

        chessBoard.getMatrix()[coords.y][coords.x] = piece;
        chessBoard.setLastPieceMoved(piece);
        chessBoard.setCanPromote(false);
        chessBoard.unselectCoords();
        chessBoard.changePlayer();

        this.setState({chessBoard : chessBoard});
    }

    /**
     * Select whether the board should rotate between moves
     * @param {Event} e
     * @return {void}
     */
    rotationSelection(e) {
        const chessBoard = cloneDeep(this.state.chessBoard);
        chessBoard.setCanRotate(e.currentTarget.checked);
        this.setState({chessBoard : chessBoard});
    }
}

export default Board;

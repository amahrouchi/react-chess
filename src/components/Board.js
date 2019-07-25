import React       from 'react';
import {cloneDeep} from 'lodash';
import Square      from './Square';
import BoardInfo   from './BoardInfo';
import Promotion   from './Promotion';
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

        return (
            <div className="board">
                {this.buildBoard()}
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

            let changePlayer = true;
            if (chessBoard.isPromotion()) {
                /*
                 * TODO
                 * Metre a jour le flag canPromote (true)
                 * Ne pas changer de joueur
                 * setState()
                 *
                 * Empecher de jouer en etat de promotion
                 * Proposer la promotion : Q, R, N, B
                 * Selectionner : Q, R, N, B
                 * Mettre à jour ma matrice
                 * Mettre à jour la lastPieceMoved sur la piece promue
                 * Metre a jour le flag canPromote (false)
                 * Changer de joueur
                 * setState()
                 */
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
        alert(pieceType);
    }

}

export default Board;

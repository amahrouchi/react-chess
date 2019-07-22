import React       from 'react';
import {cloneDeep} from 'lodash';
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

        let message, checkMessage;

        const isWhite     = this.state.chessBoard.getPlayer() === pieceConfig.WHITE;
        let whoPlaysClass = 'who-plays ';
        whoPlaysClass += isWhite ? 'white' : 'black';


        if (this.state.chessBoard.getCanPromote()) {

            // TODO
            message      = 'Promote to:';
            checkMessage = '';

        } else {

            // TODO: Put this in a method
            const inCheck = this.state.chessBoard.kingInCheck();
            checkMessage  = inCheck
                            ? <span className="check">(check!)</span>
                            : '';
            // Check the mate
            message       = isWhite ? 'White to play' : 'Black to play';
            if (this.state.chessBoard.kingIsMate(inCheck)) {
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
        }

        return (
            <div className="board">
                {this.buildBoard()}
                <div className={whoPlaysClass}>
                    {message} {checkMessage}
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
                // alert('promote!');
                // chessBoard.getMatrix()[y][x] = new Queen(
                //     chessBoard,
                //     pieceConfig.QUEEN,
                //     chessBoard.getPlayer(),
                //     {x : x, y : y}
                // );


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

}

export default Board;

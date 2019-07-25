import React       from "react";
import pieceConfig from "../config/piece";
import mainConfig  from "../config/main";

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
            <div className={className}>
                Promote to:
                {this.buildPromotionSelection(this.props.chessBoard.getPlayer())}
            </div>
        );
    }

    /**
     * Build the promotion selection
     * @param color
     * @return {*}
     */
    buildPromotionSelection(color) {
        const Qpath = mainConfig.PIECE_PATH + color + 'Q' + '.svg';
        const Rpath = mainConfig.PIECE_PATH + color + 'R' + '.svg';
        const Bpath = mainConfig.PIECE_PATH + color + 'B' + '.svg';
        const Npath = mainConfig.PIECE_PATH + color + 'N' + '.svg';

        return (
            <div className="promotion-pieces">
                <div className="piece" onClick={() => this.props.onPromotionClick(pieceConfig.QUEEN)}><img src={Qpath} alt="Queen"/></div>
                <div className="piece" onClick={() => this.props.onPromotionClick(pieceConfig.ROOK)}><img src={Rpath} alt="Rook"/></div>
                <div className="piece" onClick={() => this.props.onPromotionClick(pieceConfig.BISHOP)}><img src={Bpath} alt="Bishop"/></div>
                <div className="piece" onClick={() => this.props.onPromotionClick(pieceConfig.KNIGHT)}><img src={Npath} alt="Knight"/></div>
            </div>
        );
    }

}

export default Promotion;

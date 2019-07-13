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
                <Square isWhite={true}/>
                <Square isWhite={false}/>
            </div>
        );
    }
}

export default Board;

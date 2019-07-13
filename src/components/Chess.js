import React from 'react';
import Board from "./Board";

/**
 * Chess app main component
 */
class Chess extends React.Component {
    /**
     * Renders the component
     * @return {*}
     */
    render() {
        return (
            <div className="chess">
                <Board />
            </div>
        );
    }
}

export default Chess;

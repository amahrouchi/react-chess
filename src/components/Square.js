import React from "react";
import Piece from "./Piece";

/**
 * The Square component
 */
class Square extends React.Component {

    /**
     * The Square constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.isWhite = props.isWhite;
    }

    /**
     * Renders the Square component
     * @return {*}
     */
    render() {
        const colorClass = this.isWhite ? 'white' : 'black';
        const className = 'square ' + colorClass;

        return (
            <div className={className}>
                <Piece type="bK"/>
            </div>
        );
    }
}

export default Square;

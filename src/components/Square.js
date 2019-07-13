import React from "react";

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
                <img src="/assets/pieces/bQ.svg"
                     alt="Black Queen"
                    className="piece"
                />
            </div>
        );
    }
}

export default Square;

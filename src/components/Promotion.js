import React from "react";

/**
 * The promotion component
 */
class Promotion extends React.Component {

    /**
     * Renders the component
     * @return {*}
     */
    render() {
        let className = "who-plays ";
        className += this.props.isWhite ? 'white' : 'black';

        return (
            <div className={className}>Promote to:</div>
        );
    }

}

export default Promotion;

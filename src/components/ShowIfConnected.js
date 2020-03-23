import React from "react";

class IfConnected extends React.Component {

    render() {
        let isLogged = localStorage.getItem('logged');

        return(
            <React.Fragment>
                { (isLogged) && (
                        this.props.children
                    )
                }
                { (!isLogged) && (
                    'You need to log in.'
                )}
            </React.Fragment>
        );
    }
}

export default IfConnected;
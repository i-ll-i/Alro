import { Component } from "react";

class Error404 extends Component {
    constructor( props ) {
        super( props );
    }

    render( ) {
        return(
            <div>
                <h1>Простите, такой страницы не существует!</h1>
            </div>
        );
    }
}

export default Error404;
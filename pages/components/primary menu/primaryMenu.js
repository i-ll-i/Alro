import { Component } from "react";

import Logotip from '../shared files/logotip.js';
import SearchForArticles from '../shared files/searchForArticles.js';

import Style from '../../../styles/PrimaryMenu.module.css'

class PrimaryMenu extends Component {
    constructor( props ) {
        super( props );
    }

    render ( ) {
        return (
            <div
                className={ Style.base }
            >
                <Logotip />
                <SearchForArticles />
            </div>
        );
    }
}

export default PrimaryMenu;
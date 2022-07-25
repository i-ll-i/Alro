import { Component } from "react";

import Image from 'next/image'

import Style from '../../../styles/PrimaryMenu.module.css';
// import SearchIcon from '../../../public/Search.png';

class SearchForArticles extends Component {
    constructor( props ) {
        super( props );
    }

    render ( ) {
        return (
            <div
                className={ Style.container }
            >
                <form
                    className={ Style.article_search_form }
                >
                    <div
                        className={ Style.shape_strip }
                    ></div>
                    <input
                        className={ Style.search_field }
                        type='text'
                        placeholder="Введите запрос"
                    />
                    <button
                        className={ Style.search_form_button }
                        width="30px"
                    >
                        <Image
                            src="/Search.png"
                            width="24px"
                            height="24px"
                            className={ Style.magnifying_glass_icon }
                        />
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchForArticles;
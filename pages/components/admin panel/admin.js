import { Component } from "react";

import Logotip from '../shared files/logotip.js';
import SearchForArticles from '../shared files/searchForArticles.js';
import ArticleModule from './Article.module.js';
import StatisticsModule from "./Statistics.module.js";
import DraftModule from "./Draft.Module.js";
import BasketModule from "./Basket.Module.js";

import Style from '../../../styles/AdminPanel.module.css'

class AdminPage extends Component {
    constructor( props ) {
        super( props );

        this.state = { currentSection: null };

    }

    render( ) {
        return(
            <div
                className={ Style.shell }
            >
                <div
                    className={ Style.base }
                >
                    <Logotip />
                    <SearchForArticles />
                    <div
                        className={ Style.container }
                    >
                        <div
                            className={ Style.list_of_sections }
                        >
                            <button
                                className={ Style.section_selection_button }
                                onClick={ this.setState({ currentSection: "ArticleModule" }) }
                            >
                                <h5>
                                    Статьи
                                </h5>
                            </button>
                            <button
                                className={ Style.section_selection_button }
                                onClick={ this.setState({ currentSection: "StatisticsModule" }) }
                            >
                                <h5>
                                    Статистика
                                </h5>
                                
                            </button>
                            <button
                                className={ Style.section_selection_button }
                                onClick={ this.setState({ currentSection: "DraftModule" }) }
                            >
                                <h5>
                                    Черновики
                                </h5>
                            </button>
                            <button
                                className={ Style.section_selection_button }
                                onClick={ this.setState({ currentSection: "BasketModule" }) }
                            >
                                <h5>
                                    Корзина
                                </h5>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <Switch
                        value={ this.state.currentSection }
                    >
                        <Case
                            value={ "ArticleModule" }
                        >
                            <ArticleModule />
                        </Case>
                        <Case
                            value={ "StatisticsModule" }
                        >
                            <StatisticsModule />
                        </Case>
                        <Case
                            value={ "DraftModule" }
                        >
                            <DraftModule />
                        </Case>
                        <Case
                            value={ "BasketModule" }
                        >
                            <BasketModule />
                        </Case>
                        <Default>
                            <div>
                                <h1>Начальная страница панели администратора.</h1>
                            </div>
                        </Default>
                    </Switch> */}
                    { this.state.currentSection === "ArticleModule" &&
                        <ArticleModule />
                    }
                    { this.state.currentSection === "StatisticsModule" &&
                        <StatisticsModule />
                    }
                    { this.state.currentSection === null &&
                        <div>
                            <h1>Начальная страница панели администратора.</h1>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default AdminPage;
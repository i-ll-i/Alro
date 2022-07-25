import { Component } from 'react';


import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom';


import './App.css';


import Main from './pages/Main/Main.page.js';
import Admin from './pages/admin/Admin.page.js';


class App extends Component {

  render( ) {
    const { history } = this.props;

    return (

      <div className="App">
        <Switch>
          <Route exact path='/' component={ Main } history={ history } />
          <Route path='/admin' component={ Admin } history={ history } />
        </Switch>
      </div>

    );

  }

}


export default withRouter( App  );

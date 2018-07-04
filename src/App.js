import React, {Component} from 'react';
import './App.css';
import Express from "./express-server/express-server";
import {Router, Route, Switch, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import First from "./routes/first-route"
import Second from './routes/second-route'
import Third from './routes/third-rout'
import Fourth from './routes/fourth-route'
import Fifth from './routes/fifth-route'
const history = createBrowserHistory();

class App extends Component {

    render() {
        return (
            <div className="App">
             {/*<Express/>*/}

                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact path={'/'} component={Express}/>
                            <Route exact path={'/first-route'} component={First}/>
                            <Route exact path={'/second-route'} component={Second}/>
                            <Route exact path={'/third-route'} component={Third}/>
                            <Route exact path={'/fourth-route'} component={Fourth}/>
                            <Route exact path={'/fifth-route'} component={Fifth}/>
                        </Switch>
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;

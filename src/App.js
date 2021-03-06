import React, {Component} from 'react';
import './App.css';
//import Express from "./express-server/express-server";
import {Router, Route, Switch, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase'
import Main from './components/main/main.js';
import Post from './components/detail-items/post.js'
import ToolBar from './components/toolbar/toolbar.js'
import ViewItems from './components/view-items/view-item.js'
//import Drawer2 from './components/toolbar/drawer.js';
import MyProfile from './components/profile/my-profile.js';
import Category from './components/category/category.js';
import EditProfile from './components/profile/edit-profile.js';
import LocationSearchInput from './components/auto-complete/auto-complete.js';
import ViewAllItems from './components/view-all-items/view-all-items.js';
import MinMax from './components/min-max/min-max.js'


//import First from "./routes/first-route"
//import Second from './routes/second-route'
//import Third from './routes/third-rout'
//import Fourth from './routes/fourth-route'
//import Fifth from './routes/fifth-route'

const history = createBrowserHistory();
var config = {
    apiKey: "AIzaSyAJeJ7KJO8AoQe5KYjPrnX_O_TqkEb_FjI",
    authDomain: "todo-app-70ec2.firebaseapp.com",
    databaseURL: "https://todo-app-70ec2.firebaseio.com",
    projectId: "todo-app-70ec2",
    storageBucket: "todo-app-70ec2.appspot.com",
    messagingSenderId: "130211320230"
};
firebase.initializeApp(config);

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact path={'/'} component={Main}/>
                            <Route exact path={'/post'} component={Post}/>
                            <Route exact path={'/view-items/:category'} component={ViewItems}/>
                            <Route exact path={'/toolbar'} component={ToolBar}/>
                            <Route exact path={'/category'} component={Category}/>
                            <Route exact path={'/my-profile'} component={MyProfile}/>
                            <Route exact path={'/edit-profile'} component={EditProfile}/>
                            <Route exact path={'/view-all-items'} component={ViewAllItems}/>
                            <Route exact path={'/min-max'} component={MinMax}/>
                            <Route exact path={'/auto-complete'} component={LocationSearchInput}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;


//<Route exact path={'/first-route'} component={First}/>
//<Route exact path={'/second-route'} component={Second}/>
//    <Route exact path={'/third-route'} component={Third}/>
//    <Route exact path={'/fourth-route'} component={Fourth}/>
//    <Route exact path={'/fifth-route'} component={Fifth}/>
//<Route exact path={'/drawer'} component={Drawer2}/>

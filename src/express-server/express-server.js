import React, {Component} from 'react';
import axios from 'axios';
import 'whatwg-fetch'


class Express extends Component {

    get() {
        axios.get('http://localhost:5000/hello')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    post() {
        axios.post('http://localhost:5000/hi')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetch() {
        fetch('http://localhost:5000/hi', {mode: 'cors'})
            .then(function (response) {
                console.log(response);
            })
            .then(function (json) {
                console.log('parsed json', json)
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    firstRoute(){
        this.props.history.push('first-route')
    }

    render() {
        return (
            <div className="App">
                <button onClick={this.get.bind(this)}>Get</button>
                <br/>
                <button onClick={this.post.bind(this)}>Post</button>
                <br/>
                <button onClick={this.fetch.bind(this)}>Fetch</button>
                <br/>
                <button onClick={this.firstRoute.bind(this)}>First Route</button>
            </div>
        );
    }
}
// https://dashboard.heroku.com/apps/sadcsad/deploy/heroku-git
export default Express;
// hm jis application pr kaam kr rhey hotey hen wo client side hota hai yani jahan sey req bhej rhey hen,
//or server wo hota hai jahan sey data aarha hota hai jesey ye application client hai or "express server" app
//server hai.
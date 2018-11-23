import React, { Component } from 'react';
import ToolBar from './toolbar.js'
import firebase from 'firebase'


class MyProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }


    loadUserData(){
        var userID = localStorage.getItem('userID');
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('Users').doc(userID).get().then((data)=>{
            
        });
    }

    render(){
        return(
            <div>
                <ToolBar/>
            </div>
        )
    }
}
export default MyProfile;
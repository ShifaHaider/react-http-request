import React, { Component } from 'react';
import ToolBar from './toolbar.js'
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


class MyProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userData:{}
        };
        this.loadUserData();
    }


    loadUserData(){
        var userID = localStorage.getItem('userID');
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        console.log(userID);
        db.collection('Users').doc(userID).get().then((doc)=>{
            this.setState({userData: doc.data()});
        });
    }

    render(){
        return(
            <div>
                <ToolBar/>

                <div style={{border: 'solid 1px rgba(0,47,52,.2)', margin: '10px 130px' , height: '400px'}}><div>
                    <Avatar alt="Adelle Charles" src={this.state.userData.picture} style={{width: '120px', height: '120px'}}/>
                </div>
                    <div style={{padding: '30px' , color: '#002f34'}}>{this.state.userData.name}</div>
                    <div style={{padding: '20px' , color: '#002f34'}}>0 Following           0 Followers</div>
                    <div style={{padding: '10px' , color: '#002f34'}}>VERIFIED ACCOUNTS</div>

                </div>

            </div>
        )
    }
}
export default MyProfile;
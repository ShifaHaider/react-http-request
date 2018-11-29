import React, { Component } from 'react';
import ToolBar from './toolbar.js';
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


class MyProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        };
        this.loadUserData();
    }


    loadUserData() {
        var userID = localStorage.getItem('userID');
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('Users').doc(userID).get().then((doc)=> {
            this.setState({userData: doc.data()});
        });
    }


    editProfile(){
        this.props.history.push('/edit-profile');
    }
    render() {
        return (
            <div>
                <ToolBar/>
                <div style={{border: 'solid 1px rgba(0,47,52,.2)', margin: '10px 130px' , height: '400px'}}>
                    <div style={{textAlign: 'center'}}>
                        <div style={{padding: '30px' , color: '#002f34'}}>{this.state.userData.name}</div>
                        <div style={{padding: '20px' , color: '#002f34'}}>0 Following 0 Followers</div>
                        <div style={{padding: '10px' , color: '#002f34'}}>VERIFIED ACCOUNTS</div><br/><br/><br/>
                        <Button variant="outlined" color="primary" onClick={this.editProfile.bind(this)}>EDIT PROFILE</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyProfile;


//<Avatar alt="Adelle Charles" src={this.state.userData.picture} style={{width: '120px', height: '120px'}}/>

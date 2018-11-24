import React, {Component} from 'react';
import ToolBar from './toolbar.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import './style.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class EditProfile extends Component {


    constructor() {
        super();
        this.state = {
            newName: '',
            aboutMe: ''
        }
    }


    nameChange(e) {
        this.setState({newName: e.target.value});
    }

    aboutChange(e) {
        this.setState({aboutMe: e.target.value});
    }

    phoneChange(e) {
        this.setState({phone: e.target.value});
    }

    editProfile() {
        var userID = localStorage.getItem('userID');
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        //db.collection('Users').doc(userID).update({});

    }

    render() {
        return (
            <div>
                <ToolBar/>
                <div
                    style={{border: 'solid 1px rgba(0,47,52,.2)', margin: '10px 130px' , height: '400px', textAlign: 'center'}}>
                    <TextField autoFocus margin="dense" id="input" label="Name" type="text"
                               value={this.state.newName} onChange={this.nameChange.bind(this)}/><br/><br/><br/>
                    <TextField autoFocus margin="dense" id="input" label="About me" type="text"
                               value={this.state.aboutMe} onChange={this.aboutChange.bind(this)}/><br/><br/><br/>
                    <TextField autoFocus margin="dense" id="input" label="Phone Number" type="Number"
                               value={this.state.phone} onChange={this.phoneChange.bind(this)}/><br/><br/><br/>
                    <Button onClick={this.editProfile.bind(this)} variant="contained" color="primary">Edit Profile</Button>

                </div>
            </div>
        )
    }
}

export default EditProfile;

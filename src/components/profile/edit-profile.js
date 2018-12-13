import React, {Component} from 'react';
import ToolBar from './../toolbar/toolbar.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import './../style.css'

class EditProfile extends Component {


    constructor() {
        super();
        this.state = {
            aboutMe: '',
            userData: {},
            userName: ''
        };
        this.myProfile = localStorage.getItem('userProfile');
        this.userID = localStorage.getItem('userID');
        this.db = firebase.firestore();
        this.settings = {timestampsInSnapshots: true};
        this.db.settings(this.settings);
        this.loadUserData();
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

    loadUserData() {
        this.db.collection('Users').doc(this.userID).get().then((userData)=>{
            this.setState({userData: userData.data() , userName: userData.data().name});
        });
    }

    editProfile() {
        this.db.collection('Users').doc(this.userID).update({
            name: this.state.userName,
            userAbout: this.state.aboutMe,
            phone: this.state.phone
        }).then(()=>{
            alert('Update Profile!')
        })
    }

    render() {
        return (
            <div>
                <ToolBar/>

                <div
                    style={{border: 'solid 1px rgba(0,47,52,.2)', margin: '10px 130px' , height: '400px', textAlign: 'center'}}>
                    <TextField autoFocus margin="dense" id="input" label="Name" type="text"
                               value={this.state.userName} onChange={this.nameChange.bind(this)}/><br/><br/><br/>
                    <TextField autoFocus margin="dense" id="input" label="About me" type="text"
                               value={this.state.aboutMe} onChange={this.aboutChange.bind(this)}/><br/><br/><br/>
                    <TextField autoFocus margin="dense" id="input" label="Phone Number" type="Number"
                               value={this.state.phone} onChange={this.phoneChange.bind(this)}/><br/><br/><br/>
                    <Button onClick={this.editProfile.bind(this)} variant="contained" color="primary">Edit
                        Profile</Button>
                </div>

            </div>
        )
    }
}

export default EditProfile;

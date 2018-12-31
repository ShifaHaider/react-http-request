import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase'
import './style.css'
const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openModel: false,
            loginModel: false,
            name: '',
            email: '',
            password: '',
            phone: '',
            logEmail: '',
            logPassword: ''
        };

        this.loadUserData();
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen() {
        this.setState({openModel: true , open: false});
    }

    modelClose() {
        this.setState({openModel: false});
    }

    loginModelOpen() {
        this.setState({loginModel: true});
    }

    loginModelClose() {
        this.setState({loginModel: false});
    }

    loginGoogle() {
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then((result) => {
            var profile = result.additionalUserInfo.profile;
            var data = {};
            data.name = profile.name;
            data.email = profile.email;
            data.picture = profile.picture;
            data.id = result.user.uid;
            localStorage.setItem('userProfile', profile.picture);
            db.collection('Users').doc(data.id).set(data);
            localStorage.setItem('userID', data.id);
            this.props.history.push('/category');
        }).catch((function (error) {
                alert(error);
            })
        )
    }

    loginFacebook() {
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            //console.log(result);
            var data = {};
            data.name = result.additionalUserInfo.profile.name;
            data.email = result.additionalUserInfo.profile.email || '';
            data.phone = result.additionalUserInfo.profile.phone || '';
            data.id = result.user.uid;
            //console.log(data);
            //localStorage.setItem('userProfile' ,  profile.picture || null);
            db.collection('Users').doc(data.id).set(data);
            localStorage.setItem('userID', data.id);
            this.props.history.push('/category');
        }).catch((function (error) {
                alert(error);
            })
        )
    }

    nameChange(e) {
        this.setState({name: e.target.value});
    }

    emailChange(e) {
        this.setState({email: e.target.value});
    }

    passwordChange(e) {
        this.setState({password: e.target.value});
    }

    phoneChange(e) {
        this.setState({phone: e.target.value});
    }

    addAccount() {
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                //console.log(data);
                db.collection('Users').doc(data.user.uid).set({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    phone: this.state.phone,
                    id: data.user.uid
                })
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    loginEmail(e) {
        this.setState({logEmail: e.target.value});
    }

    loginPassword(e) {
        this.setState({logPassword: e.target.value});
    }

    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.logEmail, this.state.logPassword)
            .then((data) => {
                //console.log(data);
                localStorage.setItem('userId', data.user.uid);
                this.props.history.push('/category');
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    loadUserData(){
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('Users').get().then((userData)=>{
            userData.forEach((user)=>{
                var data = user.data();
                //console.log(data);
            })
        })
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            MY - OLX
                        </Typography>

                        <div style={{position: 'absolute', right: '10px'}}>
                            <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
                        </div>
                    </Toolbar>
                </AppBar>

                <Dialog style={{}}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle>
                    <IconButton aria-label="Close" onClick={this.handleClose}
                                style={{position: 'absolute' , top: '10px',  right: '5px' }}>
                        <CloseIcon />
                    </IconButton>
                    </DialogTitle>
                    <List>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="title" label="Email" type="text" fullWidth
                                       value={this.state.logEmail} onChange={this.loginEmail.bind(this)}/>
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="title" label="Password" type="password" fullWidth
                                       value={this.state.logPassword} onChange={this.loginPassword.bind(this)}/>
                        </ListItem>
                        <div style={{textAlign: 'center'}}>
                        <Button variant="contained" color="primary" size='large' onClick={this.loginAccount.bind(this)}>Login</Button>
                        </div>
                        <div style={{display: 'flex' , paddingTop: '25px'}}>
                        <ListItem>
                            <Button variant="contained" color="secondary" aria-label="Delete" onClick={this.loginGoogle.bind(this)}>
                                <svg height="24" width="24" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,
                                    16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7
                                    ,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7
                                    ,11.7 14.7,11.4 14.6,11H8Z" />
                                </svg>
                                SignIn with google
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="primary" aria-label="Delete" onClick={this.loginFacebook.bind(this)}>

                                <svg fill="#fff"
                                     xmlns="http://www.w3.org/2000/svg"
                                     xlink="http://www.w3.org/1999/xlink"
                                     version="1.1" width="24" height="24"
                                     viewBox="0 0 24 24">
                                    <path d="M17,2V2H17V6H15C14.31,6 14,6.81
                                         14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                                </svg>
                                SignIn with facebook
                            </Button>
                        </ListItem>
                            </div>

                        <ListItem button onClick={this.handleOpen.bind(this)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="add account" onClick={this.handleOpen.bind(this)}/>
                        </ListItem>
                    </List>
                </Dialog>

                <Dialog
                    onClose={this.modelClose.bind(this)}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.openModel}>
                    <DialogTitle id="customized-dialog-title" onClose={this.modelClose.bind(this)}>
                        Create Account
                    <IconButton aria-label="Close" onClick={this.modelClose.bind(this)}
                                style={{position: 'absolute' , top: '12px',  right: '5px' }}>
                        <CloseIcon />
                    </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Name" type="text" fullWidth
                                           value={this.state.name} onChange={this.nameChange.bind(this)}/><br/>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Email" type="text" fullWidth
                                           value={this.state.email} onChange={this.emailChange.bind(this)}/><br/>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Password" type="password" fullWidth
                                           value={this.state.password} onChange={this.passwordChange.bind(this)}/><br/>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Phone" type="number" fullWidth
                                           value={this.state.phone} onChange={this.phoneChange.bind(this)}/>
                            </ListItem>
                            <div style={{textAlign: 'center'}}>
                                <Button onClick={this.addAccount.bind(this)} color="primary" variant="contained">
                                    Create Account
                                </Button>
                            </div>
                            <div style={{display: 'flex' , paddingTop: '25px'}}>
                                <ListItem>
                                    <Button variant="contained" color="secondary" aria-label="Delete" onClick={this.loginGoogle.bind(this)}>
                                        <svg height="24" width="24" viewBox="0 0 24 24">
                                            <path fill="#fff" d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,
                                    16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7
                                    ,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7
                                    ,11.7 14.7,11.4 14.6,11H8Z" />
                                        </svg>
                                        SignIn with google
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button variant="contained" color="primary" aria-label="Delete" onClick={this.loginFacebook.bind(this)}>

                                        <svg fill="#fff"
                                             xmlns="http://www.w3.org/2000/svg"
                                             xlink="http://www.w3.org/1999/xlink"
                                             version="1.1" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path d="M17,2V2H17V6H15C14.31,6 14,6.81
                                         14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                                        </svg>
                                        SignIn with facebook
                                    </Button>
                                </ListItem>
                            </div>
                        </List>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}
export default Main;

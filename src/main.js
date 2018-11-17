import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from 'firebase'

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
            open: false
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    loginGoogle() {
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result);
            var profile = result.additionalUserInfo.profile;
            console.log(profile);
            var data = {};
            data.name = profile.name;
            data.email = profile.email;
            data.picture = profile.picture;
            data.id = result.user.uid;

            db.collection('Users').doc(data.id).set(data);
            this.props.history.push('/dashboard');
        }).catch((function (error) {
                alert(error);
            })
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                         MY - OLX
                        </Typography>
                        <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Dialog style={{width: '500px'}}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <List>
                        <ListItem>
                            <Button variant="extendedFab" aria-label="Delete" onClick={this.loginGoogle.bind(this)}>
                                <NavigationIcon />
                                SignIn with google
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button variant="extendedFab" aria-label="Delete" >
                                <NavigationIcon />
                                SignIn with facebook
                            </Button>
                        </ListItem>
                    </List>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default Main;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});
class Drawer2 extends Component {

    render(props) {
        const { classes } = props;

        return (

            <div className={classes.root}>
                <Dialog
                    onClose={this.modelClose.bind(this)}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.openModel}>
                    <DialogTitle id="customized-dialog-title" onClose={this.modelClose.bind(this)}>
                        Create Account
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Name" type="text"
                                           value={this.state.name} onChange={this.nameChange.bind(this)}/><br/>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Email" type="text"
                                           value={this.state.email} onChange={this.emailChange.bind(this)}/><br/>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Password" type="password"
                                           value={this.state.password} onChange={this.passwordChange.bind(this)}/><br/>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Phone" type="number"
                                           value={this.state.phone} onChange={this.phoneChange.bind(this)}/>
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.modelClose.bind(this)}>
                            Cancel
                        </Button>
                        <Button onClick={this.addAccount.bind(this)} color="primary" variant="contained">
                            Add Account
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    onClose={this.loginModelClose.bind(this)}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.loginModel}>
                    <DialogTitle id="customized-dialog-title" onClose={this.loginModelClose.bind(this)}>
                        Login
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Email" type="text" fullWidth
                                           value={this.state.logEmail} onChange={this.loginEmail.bind(this)}/>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="title" label="Password" type="password" fullWidth
                                           value={this.state.logPassword} onChange={this.loginPassword.bind(this)}/>
                            </ListItem><br/>
                            <ListItem button onClick={this.handleOpen.bind(this)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AddIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Create Account" onClick={this.handleOpen.bind(this)}/>
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.loginModelClose.bind(this)}>
                            Cancel
                        </Button>
                        <Button onClick={this.loginAccount.bind(this)} color="primary" variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Drawer2;
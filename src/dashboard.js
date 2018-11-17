import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import u from '@material-ui/core/Button

class Dashboard extends Component {
    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                           Post
                        </Typography>
                        <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Dashboard;

import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
   constructor(props){
       super(props);
       console.log(props);
   }

    render(){
        const { classes } = this.props;
        console.log({ classes } );
        return(
            <div className={styles.root} >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={styles.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={styles.grow}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Main;
Hellooooooooooooooooooooooooooo
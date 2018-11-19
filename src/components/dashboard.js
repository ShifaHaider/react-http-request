import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            category:[
                'Mobiles', 'Vehicles', 'Property for Sale', 'Property for Rent', 'Electronics & Home Appliances', 'Bikes', 'Business, ' +
                'Industrial & Agriculture', 'Services', 'Jobs', 'Animals', 'Furniture & Home Decor', 'Fashion & Beauty', 'Books, Sports & Hobbies', 'Kids'
            ],
            selectedCategory: ''
        }
    }

    handleClose(){
        this.setState({open: false });
    };
    handleClickOpen () {
        this.setState({open: true });
    };
    categoryChange(e){
        this.setState({selectedCategory: e.target.value});
        this.props.history.push('/post')
    }

    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                           Post
                        </Typography>
                        <div style={{position: 'absolute', right: '10px'}}>
                            <Button color="inherit" onClick={this.handleClickOpen.bind(this)}>Sell</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="title" label="Title" type="text" fullWidth
                            />
                        <TextField value={this.state.selectedCategory} onChange={this.categoryChange.bind(this)}
                            id="filled-select-currency" select label="Select A Category" fullWidth
                            helperText="Please select your category" margin="normal" variant="filled">
                            {this.state.category.map((category)=>{
                                return(
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}
export default Dashboard;

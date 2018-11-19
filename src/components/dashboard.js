import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import firebase from 'firebase'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            category: [
                'Mobiles', 'Vehicles', 'Property for Sale', 'Property for Rent', 'Electronics & Home Appliances', 'Bikes', 'Business, ' +
                'Industrial & Agriculture', 'Services', 'Jobs', 'Animals', 'Furniture & Home Decor', 'Fashion & Beauty', 'Books, Sports & Hobbies', 'Kids'
            ],
            selectedCategory: '',
            title: '',
            price: 0,
            description: ''
        };

    }

    handleClose() {
        this.setState({open: false});
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    titleChange(e) {
        this.setState({title: e.target.value});
    }

    categoryChange(e) {
        this.setState({selectedCategory: e.target.value});
    }

    priceChange(e) {
        this.setState({price: e.target.value});
    }

    description(e) {
        this.setState({description: e.target.value});
    }

    sendPost() {
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var userID = localStorage.getItem('userID');
        this.state.title && this.state.selectedCategory && this.state.price && this.state.description ?
            db.collection('post').add({
                title: this.state.title,
                category: this.state.selectedCategory,
                price: this.state.price,
                description: this.state.description,
                userID: userID,
                time: Date.now()
            }).then(function () {
                alert("Document successfully written!");
            })
                .catch(function (error) {
                    alert("Error writing document: ", error);
                })
            : alert('Require field');
        this.setState({open: false, title: '', selectedCategory: '', price: 0, description: ''});
    }

    viewItem(c){
        this.props.history.push('/view-item')
    }

    render() {
        return (
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

                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)}
                        aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="title" label="Title" type="text" fullWidth
                                   value={this.state.title} onChange={this.titleChange.bind(this)}/>
                        <TextField value={this.state.selectedCategory} onChange={this.categoryChange.bind(this)}
                                   id="filled-select-currency" select label="Select A Category" fullWidth
                                   helperText="Please select your category" margin="normal" variant="filled">
                            {this.state.category.map((category)=> {
                                return (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                        <TextField autoFocus margin="dense" id="title" label="Price" type="number" fullWidth
                                   value={this.state.price} onChange={this.priceChange.bind(this)}/>
                        <TextField id="standard-multiline-static" label="Description" multiline
                                   rows="3" defaultValue="" margin="normal" fullWidth
                                   value={this.state.description} onChange={this.description.bind(this)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.sendPost.bind(this)} variant="contained" color="primary">Post</Button>
                    </DialogActions>
                </Dialog>

                <div>
                {this.state.category.map((category)=> {
                    return (
                        <Card style={{maxWidth: '300px', cursor: 'pointer'}} onClick={this.viewItem.bind(this , category)}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {category}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
                </div>
            </div>
        )
    }
}
export default Dashboard;

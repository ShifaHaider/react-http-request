import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ToolBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            menuOpen: null,
            category: [
                'Mobiles', 'Vehicles', 'Property for Sale', 'Property for Rent', 'Electronics & Home Appliances', 'Bikes', 'Business, ' +
                'Industrial & Agriculture', 'Services', 'Jobs', 'Animals', 'Furniture & Home Decor', 'Fashion & Beauty', 'Books, Sports & Hobbies', 'Kids'
            ],
            selectedCategory: '',
            title: '',
            price: 0,
            description: '',
            image: '',
            cardOpen: false,
            anchorEl: null
        };
        this.profile = localStorage.getItem('userProfile');
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    titleChange(e) {
        this.setState({ title: e.target.value });
    }

    categoryChange(e) {
        this.setState({ selectedCategory: e.target.value });
    }

    priceChange(e) {
        this.setState({ price: e.target.value });
    }

    description(e) {
        this.setState({ description: e.target.value });
    }

    sendPost() {
        var db = firebase.firestore();
        var settings = { timestampsInSnapshots: true };
        db.settings(settings);
        var userID = localStorage.getItem('userID');
        this.state.title && this.state.selectedCategory && this.state.price && this.state.description
        && this.state.image?
            db.collection('post').add({
                title: this.state.title,
                category: this.state.selectedCategory,
                price: this.state.price,
                description: this.state.description,
                image: this.state.image,
                userID: userID,
                time: Date.now()
            }).then(function () {
                alert("Document successfully written!");
            })
                .catch(function (error) {
                    alert("Error writing document: ", error);
                })
            : alert('Require field');
        this.setState({ open: false, title: '', selectedCategory: '', price: 0, description: '' });
    }

    uploadFile(e){
        var file = e.target.files[0];
        console.log(file);
        var uploadTask = firebase.storage().ref().child(file.name).put(file);
        uploadTask.on('state_changed', (snapshot)=>{
        }, (error)=> {
            console.log(error);
        }, ()=> {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                this.setState({image: downloadURL});
                console.log(downloadURL);
            });
        });
    }

    myProfile(){
        console.log(this.props);
        //this.props.history.push('/my-profile');
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            My-OLX
                        </Typography>
                        <div style={{ position: 'absolute', right: '10px' }}>
                            <Button color="inherit" onClick={this.handleClickOpen.bind(this)}>Sell</Button>
                        </div>

                        <div style={{ position: 'absolute', right: '55px', top: '11px' , width: '60px', height: '60px', cursor: 'pointer'}}>
                            <Avatar alt="Adelle Charles" src={this.profile} onClick={this.handleClick}/>
                        </div>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                            <MenuItem onClick={this.handleClose}>My Ads</MenuItem>
                            <MenuItem onClick={this.myProfile.bind(this)}>My Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My orders</MenuItem>
                            <MenuItem onClick={this.handleClose}>My network</MenuItem>
                            <MenuItem onClick={this.handleClose}>Setting</MenuItem>
                            <MenuItem onClick={this.handleClose}>Help</MenuItem>
                            <MenuItem onClick={this.handleClose}>logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)}
                        aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="title" label="Title" type="text" fullWidth
                                   value={this.state.title} onChange={this.titleChange.bind(this)} />
                        <TextField value={this.state.selectedCategory} onChange={this.categoryChange.bind(this)}
                                   id="filled-select-currency" select label="Select A Category" fullWidth
                                   helperText="Please select your category" margin="normal" variant="filled">
                            {this.state.category.map((category) => {
                                return (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                        <TextField autoFocus margin="dense" id="title" label="Price" type="number" fullWidth
                                   value={this.state.price} onChange={this.priceChange.bind(this)} />
                        <TextField id="standard-multiline-static" label="Description" multiline
                                   rows="3" defaultValue="" margin="normal" fullWidth
                                   value={this.state.description} onChange={this.description.bind(this)} />
                        <TextField multiple autoFocus margin="dense" id="title" label="Select Image" type="file" fullWidth onChange={this.uploadFile.bind(this)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.sendPost.bind(this)} variant="contained" color="primary">Post</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}
export default ToolBar;

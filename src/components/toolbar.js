import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import firebase from 'firebase'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ViewItem from './view-item.js'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
        this.state.title && this.state.selectedCategory && this.state.price && this.state.description
        && this.state.image ?
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
        this.setState({open: false, title: '', selectedCategory: '', price: 0, description: ''});
    }

    uploadFile(e) {
        var file = e.target.files[0];
        console.log(file);
        var uploadTask = firebase.storage().ref().child(file.name).put(file);
        uploadTask.on('state_changed', (snapshot)=> {
        }, (error)=> {
            console.log(error);
        }, ()=> {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                this.setState({image: downloadURL});
                console.log(downloadURL);
            });
        });
    }

    myProfile() {
        console.log(this.props);
        //this.props.history.push('/my-profile');
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
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

                        <div
                            style={{ position: 'absolute', right: '55px', top: '11px' , width: '60px', height: '60px', cursor: 'pointer'}}>
                            <Avatar alt="Adelle Charles" src={this.profile} onClick={this.handleClick}/>
                        </div>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText inset primary="My Ads"/>
                            </MenuItem>
                            <MenuItem onClick={this.myProfile.bind(this)}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText inset primary="My Profile"/>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText inset primary="My Orders"/>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText inset primary="My Network"/>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0V0z"/><path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
                                </ListItemIcon>
                                <ListItemText inset primary="Setting"/>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText inset primary="Help"/>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText inset primary="Logout"/>
                            </MenuItem>
                        </Menu>
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
                            {this.state.category.map((category) => {
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
                        <TextField multiple autoFocus margin="dense" id="title" label="Select Image" type="file"
                                   fullWidth onChange={this.uploadFile.bind(this)}/>
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
//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUSnrEYsPlAa9LH98TYEX0MtqGZqF2E78&libraries=places&callback=initMap"

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

class Dashboard extends Component {
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
            image: ''
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

    viewItem(c) {
        this.props.history.push('/view-item/'+ c);
        localStorage.setItem('category', c);
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

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Post
                        </Typography>
                        <div style={{ position: 'absolute', right: '10px' }}>
                            <Button color="inherit" onClick={this.handleClickOpen.bind(this)}>Sell</Button>
                        </div>
                        <div style={{ position: 'absolute', right: '55px', top: '11px' , width: '60px', height: '60px', cursor: 'pointer'}}>
                            <Avatar alt="Adelle Charles" src={this.profile}/>
                        </div>
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
                <div style={{display:"flex", flexWrap:"wrap",  justifyContent: "center"}}>
                    {this.state.category.map((category) => {
                        return (
                            <Card style={{ width:"20%", height:"130px" , cursor: 'pointer', border:"solid 1px #bebebe", borderRadius:"0px", margin:"2px", boxShadow:"none",  }} onClick={this.viewItem.bind(this, category)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h6">
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

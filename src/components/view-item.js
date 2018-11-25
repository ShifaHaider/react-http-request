import React, {Component} from 'react';
import firebase from 'firebase'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Post from './post.js'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import ToolBar from './navbar.js'
import Button from '@material-ui/core/Button';
import './style.css'


class ViewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            compOpen: false,
            item: {},
            error: false

        };
        this.loadCategory();
    }

    loadCategory() {
        var category = this.props.match.params.category;
        var arr = [];
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('post').where('category', '==', category).onSnapshot((items) => {
            items.docChanges().forEach((item) => {
                var items = item.doc.data();
                items.orderID = item.doc.id;
                arr.push(items);
                this.setState({items: arr});
            })
        })
    }

    detail(v) {
        this.props.history.push('/post');
        localStorage.setItem('item', JSON.stringify(v));
    }

    minValue(e){
        console.log(e.target.value);
        this.setState({minValue: e.target.value});
    }

    maxValue(e){
        console.log(e.target.value);
        this.setState({maxValue: e.target.value});
    }

    loadSelectedData(){
        var selectedItems = [];
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var min = this.state.minValue;
        var max = this.state.maxValue;
        this.state.items.map((item)=>{
            console.log(min  , item.price , max);
            console.log(min <= item.price , max >= item.price );
            if(Number(min) <= Number(item.price) && Number(max) >= Number(item.price) ){
               selectedItems.push(item);
                this.setState({items: selectedItems, error: false});
               console.log(selectedItems);
           }
            else{
               this.setState({items: selectedItems , error: 'Oops... we did not find anything that matches this search'})
           }
        })
    }


    render() {

        return (
            <div>
                <ToolBar/>
                <GridList cols={4} cellHeight='auto'>
                    <GridListTile cols={1}>
                           <div style={{marginTop: '90px'}}>
                           <TextField label="Min" type='number' style={{width: '100px' , backgroundColor: '#ebeeef' , margin: '0 8px 0 0'}}
                               value={this.state.minValue} onChange={this.minValue.bind(this)}/>
                           <TextField label="Max" type='number' style={{width: '100px' , backgroundColor: '#ebeeef', margin: '0 8px 0 0'}}
                                      value={this.state.maxValue} onChange={this.maxValue.bind(this)}/>
                           <div style={{display: 'inline'}} onClick={this.loadSelectedData.bind(this)}>
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id='icon'>
                                   <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                   <path fill="none" d="M0 0h24v24H0V0z"/></svg>
                           </div>
                           </div>
                    </GridListTile>
                    <GridListTile cols={3}>
                {this.state.items.length !== 0 ?
                    <div style={{display:"flex", flexWrap:"wrap",  justifyContent: "center"}}>
                        {this.state.items.map((item) => {
                            return (
                                <Card
                                    style={{ width:"30%", cursor: 'pointer', border:"solid 1px #bebebe", borderRadius:"0px", margin:"2px", boxShadow:"none"}}
                                    onClick={this.detail.bind(this , item)}>
                                    <CardActionArea>
                                        <CardMedia component="img" alt="Contemplative Reptile"
                                                   height="140" image={item.image} title="Contemplative Reptile"/>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Rs. {item.price}
                                            </Typography>
                                            <Typography component="p">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </div> : <h1>No Item!</h1>}
                        {this.state.error ? null: <h1>{this.state.error}</h1>}
                </GridListTile>
                </GridList>

            </div>
        )
    }
}

export default ViewItem;
//box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
//background-color: #fff;
//right: 5%;

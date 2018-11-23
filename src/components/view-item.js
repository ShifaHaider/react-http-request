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

class ViewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            compOpen: false,
            item: {}
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

    render() {

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Items
                        </Typography>
                    </Toolbar>
                </AppBar>

                {this.state.items.length !== 0 ?
                    <div style={{display:"flex", flexWrap:"wrap",  justifyContent: "center"}}>
                        {this.state.items.map((item) => {
                            return (
                                <Card
                                    style={{ width:"20%", cursor: 'pointer', border:"solid 1px #bebebe", borderRadius:"0px", margin:"2px", boxShadow:"none"}}
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


            </div>
        )
    }
}

export default ViewItem;
///* margin: 0; */
//padding: 0;
///* z-index: 2; */
//position: absolute;
//box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
//background-color: #fff;
//width: 200px;
//right: 5%;
//top: 53px!important;
///* left: auto; */
//width: -webkit-max-content;
//width: -moz-max-content;
//width: max-content;
/* min-width: 200px; */
/* text-align: left; */







//<Card style={{ width:"20%", height:"130px" , cursor: 'pointer', border:"solid 1px #bebebe", borderRadius:"0px", margin:"2px", boxShadow:"none",  }}>



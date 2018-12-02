import React, {Component} from 'react';
import firebase from 'firebase'
import ToolBar from './toolbar.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class ViewAllItems extends Component {

    constructor(props){
        super(props);
        this.state={
            allItems: []
        };
        this.loadAllItems();
    }


    loadAllItems(){
        var allItems = [];
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('post').onSnapshot((items)=>{
            items.docChanges().forEach((item)=>{
                var item = item.doc.data();
                //item.id = item.doc.id;
                allItems.push(item);
                console.log(item);
                this.setState({allItems: allItems});
            })
        })
    }
    detail(v) {
        this.props.history.push('/post');
        localStorage.setItem('item', JSON.stringify(v));
    }
    render(){
        return(
            <div>
              <ToolBar/>
                <div style={{display:"flex", flexWrap:"wrap",  justifyContent: "center"}}>
                    {this.state.allItems.map((item) => {
                        return (
                            <Card key={item.time}
                                  style={{ width:"30%", cursor: 'pointer', border:"solid 1px #bebebe", borderRadius:"0px", margin:"2px", boxShadow:"none"}}
                                  onClick={this.detail.bind(this , item)}>
                                <CardActionArea>
                                    <CardMedia component="img" alt="Picture not found"
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
                </div>
            </div>
        )
    }

}



export default ViewAllItems;
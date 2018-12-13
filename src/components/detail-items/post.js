import React, { Component } from "react"
import ToolBar from './../toolbar/navbar.js';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './../style.css'

class Post extends Component {


    constructor(props) {
        super(props);
        this.item = JSON.parse(localStorage.getItem('item'));
    }


    render() {
        return (
            <div>
               <ToolBar/>
                <div style={{ display: "flex", padding: 10}} >
                    <div>
                        <div>
                            <img src={this.item.image} height='400px' width='900px'></img>
                        </div>
                        <Card style={{width : '500px', marginTop: 10}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">Description</Typography>
                                <Typography component="p">{this.item.description}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div style={{width: '30%'}} >

                        <Card style={{ margin: 10}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">Rs. {this.item.price}</Typography>
                                <Typography component="p">{this.item.description}</Typography>
                            </CardContent>
                        </Card>
                        <Card style={{ margin: 10}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">Contact the seller</Typography>
                                <Typography component="h5">Shifa Haider</Typography>
                            </CardContent>
                        </Card>
                        <Card style={{ margin: 10}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">Posted in</Typography>
                                <Typography component="p">Karachi</Typography>
                            </CardContent>
                        </Card>

                    </div>
                </div>

            </div>
        )
    }
}
export default Post;







helloooooooooooooooooooooooooooo

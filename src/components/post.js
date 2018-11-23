import React, { Component } from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './style.css'

class Post extends Component {


    constructor(props) {
        super(props);
        console.log(this.props);
        this.item = JSON.parse(localStorage.getItem('item'));
    }


    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            My - OLX
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ display: "flex", padding:10 }} >
                    <div >
                        <div>
                            <img src={this.item.image} height='400px' width='100%'></img>
                        </div>
                        <div style={{ border: 'solid 1px rgba(0,47,52,.2)', height: '135px', width: '100%', }}>
                            <h4>Description</h4><br />
                            {this.item.description}
                        </div>
                    </div>
                    <div style={{ border: 'solid 1px rgba(0,47,52,.2)', height: '135px', width: '30%', float: "left",
                       padding: 6 , marginLeft: 10 }}>
                        <h1>Rs. {this.item.price}</h1>
                        {this.item.description}
                    </div>
                </div>
            </div>
        )
    }
}
export default Post;

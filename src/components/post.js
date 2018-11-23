import React, {Component} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './style.css'

class Post extends Component {


    constructor(props){
        super(props);
        console.log(this.props);
       this.item =  JSON.parse(localStorage.getItem('item'));
    }



    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            My - OLX
                        </Typography>
                        </Toolbar>
                    </AppBar>
                <img src={this.item.image} height='400px' width='700px'></img>
                <div style={{border : 'solid 1px gray' , height: '135px', width: '700px'}}>
                    <h4>Description</h4><br/>
                    {this.item.description}
                </div>
            </div>
        )
    }
}
export default Post;

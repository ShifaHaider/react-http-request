
import React, { Component } from 'react';
import Toolbar from './toolbar.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Category extends Component {


    constructor(props) {
        super(props);
        this.state = {
            category: [
                'Mobiles', 'Vehicles', 'Property for Sale', 'Property for Rent',
                'Electronics & Home Appliances', 'Bikes', 'Business, ' +
                'Industrial & Agriculture', 'Services', 'Jobs', 'Animals', '' +
                'Furniture & Home Decor', 'Fashion & Beauty', 'Books, Sports & Hobbies', 'Kids'
            ]
        };
    }
    viewItem(c) {
        this.props.history.push('/view-items/'+ c);
        localStorage.setItem('category', c);
    }

    render(){
        return(
            <div>
                <Toolbar/>

                <div style={{display:"flex", flexWrap:"wrap",  justifyContent: "center"}}>
                    {this.state.category.map((category) => {
                        return (
                            <Card key={category} style={{ width:"20%", height:"130px" , cursor: 'pointer', border:"solid 1px #bebebe",
                            borderRadius:"0px", margin:"2px", boxShadow:"none"}} onClick={this.viewItem.bind(this, category)}>
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
export default Category;
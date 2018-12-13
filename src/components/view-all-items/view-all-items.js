import React, {Component} from 'react';
import firebase from 'firebase'
import ToolBar from './../toolbar/toolbar.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import NoSsr from '@material-ui/core/NoSsr';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';


class ViewAllItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allItems: [],
            selectedCategory: [
                'Mobiles', 'Vehicles', 'Property for Sale', 'Property for Rent',
                'Electronics & Home Appliances', 'Bikes', 'Business, ' +
                'Industrial & Agriculture', 'Services', 'Jobs', 'Animals', '' +
                'Furniture & Home Decor', 'Fashion & Beauty', 'Books, Sports & Hobbies', 'Kids'
            ],
            category: [
                'Mobiles', 'Vehicles', 'Property for Sale', 'Property for Rent',
                'Electronics & Home Appliances', 'Bikes', 'Business, ' +
                'Industrial & Agriculture', 'Services', 'Jobs', 'Animals', '' +
                'Furniture & Home Decor', 'Fashion & Beauty', 'Books, Sports & Hobbies', 'Kids'
            ]
        };
        this.loadAllItems();
    }

    minValue(e) {
        this.setState({minValue: e.target.value});
    }

    maxValue(e) {
        console.log(e.target.value);
        this.setState({maxValue: e.target.value});
    }

    loadAllItems() {
        var allItems = [];
        var min = this.state.minValue;
        var max = this.state.maxValue;
        var selectedCategory = this.state.selectedCategory;
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('post').onSnapshot((items)=> {
            items.docChanges().forEach((post)=> {
                var item = post.doc.data();
                if ((Number(min) || 0) <= Number(item.price) && (Number(max) || 10000000) >= Number(item.price) && selectedCategory.indexOf(item.category) != -1){
                    allItems.push(item);
                    this.setState({allItems: allItems});
                }
            })
        })
    }

    detail(v){
        this.props.history.push('/post');
        localStorage.setItem('item', JSON.stringify(v));
    }

    selectedData(e) {
        this.setState({selectedCategory: e.target.value});
    }

    render() {
        return (
            <div>
                <ToolBar/>
                <GridList cols={4} cellHeight='auto'>
                    <GridListTile cols={1}>
                        <div style={{marginTop: '90px'}}>
                            <TextField label="Min" type='number'
                                       style={{width: '100px' , backgroundColor: '#ebeeef' , margin: '0 8px 0 0'}}
                                       value={this.state.minValue} onChange={this.minValue.bind(this)}/>
                            <TextField label="Max" type='number'
                                       style={{width: '100px' , backgroundColor: '#ebeeef', margin: '0 8px 0 0'}}
                                       value={this.state.maxValue} onChange={this.maxValue.bind(this)}/>
                        </div>
                        <div>
                            <FormControl style={{ minWidth: 200, maxWidth: 300}}>
                                <InputLabel htmlFor="select-multiple-chip">Select Category</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedCategory}
                                    onChange={this.selectedData.bind(this)}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={selected => (
                                   <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                  {selected.map(value => (
                                      <Chip key={value} label={value}/> ))}
                                      </div> )}>
                                    {this.state.category.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{display: 'inline'}} onClick={this.loadAllItems.bind(this)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 id='icon'>
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                <path fill="none" d="M0 0h24v24H0V0z"/>
                            </svg>
                        </div>
                    </GridListTile>
                    <GridListTile cols={3}>
                        {this.state.allItems.length !== 0 ?
                            <div style={{display:"flex", flexWrap:"wrap",  justifyContent: "center"}}>
                                {this.state.allItems.map((item) => {
                                    return (
                                        <Card key={item.time}
                                              style={{ width:"30%", cursor: 'pointer', border:"solid 1px #bebebe", borderRadius:"0px", margin:"2px", boxShadow:"none"}}
                                              onClick={this.detail.bind(this , item)}>
                                            <CardActionArea>
                                                <CardMedia component="img" alt="Picture not found"
                                                           height="140" image={item.image}
                                                           title="Contemplative Reptile"/>
                                                <CardContent>
                                                    <Typography color="textSecondary" gutterBottom>
                                                      {item.category}
                                                    </Typography>
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
                            </div> : <h1>{this.state.error}</h1>}
                    </GridListTile>
                </GridList>

            </div>
        )
    }
}
export default ViewAllItems;
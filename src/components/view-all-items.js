import React, {Component} from 'react';
import firebase from 'firebase'
import ToolBar from './toolbar.js'
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
            values: [],
            category: [
                'Mobiles', 'Vehicles', 'Property for Sale', 'Property for Rent',
                'Electronics & Home Appliances', 'Bikes', 'Business, ' +
                'Industrial & Agriculture', 'Services', 'Jobs', 'Animals', '' +
                'Furniture & Home Decor', 'Fashion & Beauty', 'Books, Sports & Hobbies', 'Kids'
            ]
        };
        this.loadAllItems();

    }

    loadAllItems() {
        var allItems = [];
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('post').onSnapshot((items)=> {
            items.docChanges().forEach((item)=> {
                var item = item.doc.data();
                //item.id = item.doc.id;
                allItems.push(item);
                this.setState({allItems: allItems});
            })
        })
    }

    detail(v) {
        this.props.history.push('/post');
        localStorage.setItem('item', JSON.stringify(v));
    }

    minValue(e) {
        this.setState({minValue: e.target.value});
    }

    maxValue(e) {
        this.setState({maxValue: e.target.value});
    }

    loadSelectedData() {
        var selectedItems = [];
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var min = this.state.minValue;
        var max = this.state.maxValue;
        this.state.allItems.map((item)=> {
            if (Number(min) <= Number(item.price) && Number(max) >= Number(item.price)) {
                selectedItems.push(item);
                this.setState({allItems: selectedItems});
            }
            else {
                this.setState({
                    allItems: selectedItems,
                    error: 'Oops... we did not find anything that matches this search'
                })
            }
        })
    }

    selectedData(e) {
        this.setState({ values: e.target.value });
    }
    loadSelectedC(){
        var selectedC = [];
        var categories = this.state.values;
        var allItems = this.state.allItems;
        console.log(categories);
        for(var i = 0; i < allItems.length; i++){
          for(var j = 0; j< categories.length; j++){
              if(allItems[i].category === categories[j]){
                  selectedC.push(allItems[i]);
               this.setState({allItems: selectedC});
              }
          }
        }
        console.log(selectedC);

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

                            <div style={{display: 'inline'}} onClick={this.loadSelectedData.bind(this)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     id='icon'>
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                    <path fill="none" d="M0 0h24v24H0V0z"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <FormControl style={{ minWidth: 230, maxWidth: 300}}>
                                <InputLabel htmlFor="select-multiple-chip">Select Category</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.values}
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
                        <div style={{display: 'inline'}} onClick={this.loadSelectedC.bind(this)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 id='icon'>
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                <path fill="none" d="M0 0h24v24H0V0z"/>
                            </svg>
                        </div>
                    </GridListTile>
                    <GridListTile cols={3}>
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
                    </GridListTile>
                </GridList>

            </div>
        )
    }

}

Helllo
export default ViewAllItems;
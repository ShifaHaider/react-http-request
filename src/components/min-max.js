import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase'



class MinMax extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    minValue(e){
        this.setState({minValue: e.target.value});
    }

    maxValue(e){
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
            if(Number(min) <= Number(item.price) && Number(max) >= Number(item.price) ){
                selectedItems.push(item);
                this.setState({items: selectedItems,});
            }
            else{
                this.setState({items: selectedItems , error: 'Oops... we did not find anything that matches this search'})
            }
        })
    }

    render(){
        return(
            <div>
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
            </div>
        )
    }

}

export default MinMax;
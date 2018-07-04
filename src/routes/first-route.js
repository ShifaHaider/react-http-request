import React , {Component} from 'react';



class First extends Component{
    constructor(props){
        super(props);
    }

    secondRoute(){
        console.log(this.props);
        this.props.history.push('second-route');
    }

    render(){
        return(
            <div>
                <h1>First Route</h1>
                <button onClick={this.secondRoute.bind(this)}>Second Route</button>
            </div>
        )
    }

}
export default First;
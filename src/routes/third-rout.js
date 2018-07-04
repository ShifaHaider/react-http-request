import React , {Component} from 'react';

class Third extends Component{

    constructor(props){
        super(props);
    }
    fourthRoute(){
        this.props.history.push('fourth-route')
    }

    render(){
        return(
            <div>
                <h1>Third Route</h1>
                <button onClick={this.fourthRoute.bind(this)}>Fourth Route</button>

            </div>
        )
    }

}
export default Third;
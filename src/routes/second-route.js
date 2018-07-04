import React , {Component} from 'react';

class Second extends Component{

    constructor(props){
        super(props);
    }

    thirdRoute(){
        this.props.history.push('third-route')
    }
    render(){
        return(
            <div>
                <h1>Second Route</h1>
                <button onClick={this.thirdRoute.bind(this)}>Third Route</button>
            </div>
        )
    }

}
export default Second;
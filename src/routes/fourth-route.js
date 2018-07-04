import React , {Component} from 'react';

class Fourth extends Component{

    constructor(props){
        super(props);
    }
    fifthRoute(){
        this.props.history.push('fifth-route')
    }

    render(){
        return(
            <div>
                <h1>Fourth Route</h1>
                <button onClick={this.fifthRoute.bind(this)}>Fifth Route</button>

            </div>
        )
    }

}
export default Fourth;
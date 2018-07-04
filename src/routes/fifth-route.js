import React , {Component} from 'react';

class Fifth extends Component{

    constructor(props){
        super(props);
    }

    main(){
        this.props.history.push('/')
    }

    render(){
        return(
            <div>
                <h1>Fifth Route</h1>
                <button onClick={this.main.bind(this)}>Main</button>

            </div>
        )
    }

}
export default Fifth;
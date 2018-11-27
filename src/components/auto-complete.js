import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import GoogleMapReact from 'google-map-react';




const AnyReactComponent = ({ text }) => <div>{text}</div>;

class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11
        }
    }
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        return (
            <div>
            <Autocomplete
                style={{width: '90%'}}
                onPlaceSelected={place => this.setState({ place })}
                types={['(regions)']}
                componentRestrictions={{country: "ru"}}/>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBUSnrEYsPlAa9LH98TYEX0MtqGZqF2E78' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    >
                    <AnyReactComponent lat={59.955413} lng={30.337844} text={'Kreyser Avrora'}/>
                </GoogleMapReact>
            </div>
            </div>
        );

    }
}
export default LocationSearchInput;
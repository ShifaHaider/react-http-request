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
            zoom: 11,
            place: ''
        }
    }
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    location(e){
        var address = e.target.value;
        //var geocoder = new google.maps.Geocoder();
        //console.log(geocoder);
        //geocoder.geocode( { 'address': address}, function(results, status) {
        //    if (status == this.google.maps.GeocoderStatus.OK) {
        //        console.log(results);
        //        console.log(results[0].geometry.location.latitude);
        //        console.log(results[0].geometry.location.longitude);
        //        // results[0].geometry.location.latitude
        //        // results[0].geometry.location.longitude
        //    }
        //});
        console.log(e.target.value);
    }
    render() {
        return (
            <div>
            <Autocomplete
                style={{width: '90%'}}
                onPlaceSelected={place => this.setState({ place })}
                types={['(regions)']}
                componentRestrictions={{country: "ru"}}
                onChange={this.location.bind(this)}/>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBUSnrEYsPlAa9LH98TYEX0MtqGZqF2E78' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    >
                </GoogleMapReact>
            </div>
            </div>
        );

    }
}
export default LocationSearchInput;
import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";

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
        //Geocode.setApiKey("AIzaSyBdHhIcbrK8mp4xudA2O0SOa7vZL-tytic");
        Geocode.setApiKey("AIzaSyBUSnrEYsPlAa9LH98TYEX0MtqGZqF2E78");
        Geocode.enableDebug();
        console.log(Geocode.fromAddress("karachi"));
        Geocode.fromAddress("Eiffel Tower").then((response) => {
                    console.log(response);
                    const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
            },
                error => {
                console.error(error);
            }
        ).catch((e)=>{
                console.log(e);
            })
    }
    render(){
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
                    defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
                    <AnyReactComponent lat={59.955413} lng={30.337844} text={'Kreyser Avrora'}/>
                </GoogleMapReact>
            </div>
            </div>
        );
    }
}
export default LocationSearchInput;
//'AIzaSyBUSnrEYsPlAa9LH98TYEX0MtqGZqF2E78'
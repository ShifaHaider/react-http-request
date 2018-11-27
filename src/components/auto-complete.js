import React, {Component} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';

class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};
    }


    render() {
        return (
            <Autocomplete
                style={{width: '90%'}}
                onPlaceSelected={(place) => {console.log(place);}}
                types={['(regions)']}
                componentRestrictions={{country: "ru"}}/>
        );
        
    }
}
export default LocationSearchInput;
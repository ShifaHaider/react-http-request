import React, {Component} from 'react';
import {    geocodeByAddress,   geocodeByPlaceId,getLatLng} from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';
import PlacesAutocomplete from 'react-places-autocomplete';

import Geocode from "react-geocode";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class LocationSearchInput extends Component {

 constructor(props) {
  super(props);
  this.state = { address: '' };
 }

 handleChange = address => {
  this.setState({ address });
 };

 handleSelect = address => {
  geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
 };

 render() {
  return (
      <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          >
       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
           <div>
            <input
                {...getInputProps({
                 placeholder: 'Search Places ...',
                 className: 'location-search-input',
                })}
                />
            <div className="autocomplete-dropdown-container">
             {loading && <div>Loading...</div>}
             {suggestions.map(suggestion => {
              const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                  <div
                      {...getSuggestionItemProps(suggestion, {
                       className,
                       style
                      })}
                      >
                   <span>{suggestion.description}</span>
                  </div>
              );
             })}
            </div>
           </div>
       )}
      </PlacesAutocomplete>
  );
 }




    /*    constructor(props) {
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

     location(e) {
     var address = e.target.value;
     //Geocode.setApiKey("AIzaSyBdHhIcbrK8mp4xudA2O0SOa7vZL-tytic");
     Geocode.setApiKey("AIzaSyAJeJ7KJO8AoQe5KYjPrnX_O_TqkEb_FjI");
     Geocode.enableDebug();
     //console.log(Geocode.fromAddress("karachi"));
     Geocode.fromAddress("Eiffel Tower").then((response) => {
     console.log(response);
     const { lat, lng } = response.results[0].geometry.location;
     console.log(lat, lng);
     }, error => {
     console.error(error);
     }).catch((e)=> {
     console.log(e);
     })
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
     defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
     <AnyReactComponent lat={59.955413} lng={30.337844} text={'Kreyser Avrora'}/>
     </GoogleMapReact>
     </div>
     </div>
     );
     }*/
}
export default LocationSearchInput;
//'AIzaSyBUSnrEYsPlAa9LH98TYEX0MtqGZqF2E78'
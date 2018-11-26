import React, {Component} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '', value:  '' };
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
        const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (

            <div className="autocomplete-root">
                {console.log(getInputProps, getSuggestionItemProps, suggestions, loading)}
                <input {...getInputProps()} />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => (
                        <div {...getSuggestionItemProps(suggestion)}>
                            <span>{suggestion.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
        return (
            <div>
            <PlacesAutocomplete value={this.state.address}
                onChange={this.handleChange} onSelect={this.handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input{...getInputProps({placeholder: 'Search Places ...', className: 'location-search-input'})}/>
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, {className, style})}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            </div>
        );
    }
}
export default LocationSearchInput;
//<script src="https:/8EMtqGZqF78&libraries=places&callba
import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay';

// TODOs: Phase 2 display map markers identifying at least 5 locations
	// TODO: Add marker props to MapDisplay state (markers, markerProps, activeMarker, activeMarkerProps, showing in window)
	// TODO: Create updateMarkers() method and call when mapReady
		// TODO: make sure locations are valid
		// TODO: Clear any existing markers
		// TODO: Create an empty markerProps array
		// TODO: Iterate through markers, for every location, get data, index and array
		// TODO: push marker data into markerProps array
	// TODO: Create onMarkerClick()
		// TODO: Close any open info window
		// TODO: Set state to marker info window show
	// TODO: create closeInfoWindow
		// TODO: Disable any active info window
		// TODO: set state so no active windows
	// TODO: Add InfoWindow object

// TODOs: Phase 3 Implement a list view of the set of locations you have defined
	// TODO: Add phase 3 TODOs
// TODOs: Phase 4 Provide a filter option
// TODOs: Phase 5 Add third-party API for map marker information
// TODOs: Phase 6 Ensure responsive design

class App extends Component {
	// important to keep state at this higher level
	state = {
		// Mancos CO
		lat: 37.344996,
		lng: -108.289249,
		zoom: 14,
		locations: locations
		}
  render() {
    return (
      <div className="App">
				<h1>Restaurants in Mancos Colorado</h1>

				<MapDisplay
					lat = {this.state.lat}
					lng = {this.state.lng}
					zoom = {this.state.zoom}
					locations = {this.state.locations}
					/>
      </div>
    );
  }
}

export default App;

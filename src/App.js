import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay';

// TODOs: Phase 4 Implement a list view of the set of locations you have defined
	// TODO: Identify P4 TODOs
	
// TODOs: Phase 5 Provide a filter option
// TODOs: Phase 6 Ensure responsive design

class App extends Component {
	// important to keep state at this higher level
	state = {
		// Mancos CO
		lat: 37.344996,
		lng: -108.289249,
		zoom: 16.5,
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

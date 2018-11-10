import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay'

// TODOs: Phase 1 Get map on screen
	// DONE: create hard coded list of locations
	// DONE: Keep state and functions above the components,
	// TODO: Create a MapDisplay component to display the map and a heading

// TODOs: Phase 2 display map markers identifying at least 5 locations
	// TODO: Create Phase 2 TODOs

// TODOs: Phase 3 Implement a list view of the set of locations you have defined
// TODOs: Phase 4 Provide a filter option
// TODOs: Phase 5 Add third-party API for map marker information
// TODOs: Phase 6 Ensure responsive design


const API_KEY = 'AIzaSyBlvE_2fUrpkkd2H0hMei-27nw_axyaVY0';

class App extends Component {
	// important to keep state at this higher level
	state = {
		// Mancos CO
		lat: 37.344996,
		lng: -108.289249,
		zoom: 14,
		locations: locations,
		key: API_KEY
	}
  render() {
    return (
      <div className="App">
				<h1>Restaurants in Mancos Colorado</h1>
				<MapDisplay />
      </div>
    );
  }
}

export default App;

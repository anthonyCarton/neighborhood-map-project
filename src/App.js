import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay'

// TODOs: Phase 1
	// TODO: create hard coded list of locations
	// TODO: Keep state and functions above the components,
	// TODO: Create a MapDisplay component to display the map and a heading

// TODOs: Phase 2
	// TODO: Create Phase 2 TODOs

// TODOs: Phase 3
// TODOs: Phase 4
// TODOs: Phase 5
// TODOs: Phase 6

const API_KEY = 'AIzaSyBlvE_2fUrpkkd2H0hMei-27nw_axyaVY0';

class App extends Component {
	// important to keep state at this higher level
	state = {
		lat: 37.774929,
		lng: -122.419416,
		zoom: 14,
		locations: locations,
		key: API_KEY
	}
  render() {
    return (
      <div className="App">
				<h1>Mexican Restaurants in Mancos Colorado</h1>
				<MapDisplay />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay';
import ListView from './ListView';

// TODOs: Phase 5 Provide a filter option
	// TODO: Identify TODOs
	
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
      <div className="container">
				<header>
					<h1>Restaurants in Mancos Colorado</h1>
				</header>

				<main>
					<ListView
						locations = {this.state.locations}
					/>

					<MapDisplay
						lat = {this.state.lat}
						lng = {this.state.lng}
						zoom = {this.state.zoom}
						locations = {this.state.locations}
						/>
				</main>

				<footer>
				</footer>
      </div>
    );
  }
}

export default App;

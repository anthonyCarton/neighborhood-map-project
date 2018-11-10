import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay'


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

import React, { Component } from 'react';
import './App.css';
import Container from './Container.js';
import locations from './data/locations.json';

class App extends Component {
	// important to keep state at this higher level
	state = {
		lat: 111,
		lng: 222,
		zoom: 14,
		locations: locations
	}
  render() {
    return (
      <div className="App">
				<Container />
      </div>
    );
  }
}

export default App;

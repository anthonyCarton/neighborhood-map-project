import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay';
import ListView from './ListView';

// TODOs: Phase 5 Provide a filter option
	// DONE: Add input element for filtering
	// DONE: Filter elements in list
	// TODO: Show only filtered elements on map
	// TODO: Show infoWindow when list item is selected

// TODOs: Phase 6 Ensure responsive design
	// TODO: Make list view into HamburgerMenu

// TODOs: Phase 7 Error Handling

class App extends Component {
	// important to keep state at this higher level
	state = {
		// Mancos CO
		lat: 37.344996,
		lng: -108.289249,
		zoom: 16.5,
		locations: locations,
		filtered: null
	}
	componentDidMount = () => {
		this.setState({
			...this.state,
			filtered: this.filterLocations(this.state.locations, "")
		});
	}

	updateQuery = (query) => {
		this.setState({
			...this.state,
			selected: null,
			filtered: this.filterLocations(this.state.locations, query)
		});
	}

	filterLocations = (locations, query) => {
		return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
	}

  render() {
    return (
      <div className="container">
				<header>
					<h1>Restaurant Liquor License Status in Mancos Colorado</h1>
					<nav id="filter-options">
						<ListView
							locations = {this.state.filtered}
							filterLocations = {this.updateQuery}
						/>
					</nav>
					<section id="data-credit">
						<p>Liquor license status provided by <a href="https://data.colorado.gov/Business/Liquor-Licenses-in-Colorado/ier5-5ms2">State of Colorado</a> and <a href="https://dev.socrata.com/foundry/data.colorado.gov/6a7f-q6ys">Socrata</a></p>
					</section>
				</header>
				<main id="main-content">
					<section id="map-container">
						<MapDisplay
							lat = {this.state.lat}
							lng = {this.state.lng}
							zoom = {this.state.zoom}
							locations = {this.state.filtered}
							selected = {this.state.selected}
						/>
					</section>
				</main>
      </div>
    );
  }
}

export default App;

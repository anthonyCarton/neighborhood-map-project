import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

// TODO: Add mapReady(props, map)
// TODO: Add style and center variables
// TODO: Add ARIA role and label
// TODO: Use GoogleApiWrapper to load the API, pass in MapDisplay when promise is fulfilled

class MapDisplay extends React.Component {
	state = {
		map:null
	}
	componentDidMount() {

	}
	mapReady(props, map) {
		// works with google-maps-react's onReady event
		const {google} = props;
  	const service = new google.maps.places.PlacesService(map);
	}
  render() {
    return (
			<div>
				<h1>Restaurants in Mancos Colorado</h1>
				<p>The map will be here</p>
				<Map
					onReady={this.mapReady}
			</div>
		);
  }
}

export default MapDisplay

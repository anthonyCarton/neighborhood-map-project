import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

class MapDisplay extends React.Component {
	state = {
		map:null
	};
	componentDidMount() {

	}
	mapReady(props, map) {
		// works with google-maps-react's onReady event
		const {google} = props;
  	const service = new google.maps.places.PlacesService(map);
	}
  render() {
		const style = {
			// Prefer VW and VH to %
		  width: '100vw',
		  height: '100vh'
		}
		const center = {
			lat: this.props.lat,
			lng: this.props.lng
		}
    return (
			<div>
				<h1>Restaurants in Mancos Colorado</h1>
				<p>The map will be here</p>
				<Map
					role="application"
					aria-label="map"
					onReady={this.mapReady}
					style={style}
					// initalCenter: Takes an object containing latitude and longitude coordinates. Sets the maps center upon loading.
					initialCenter={center}

				/>
			</div>
		);
  }
}

// Automatically Lazy-loading Google API
export default GoogleApiWrapper({
  apiKey: this.props.key
})(MapDisplay)

import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

const API_KEY = 'AIzaSyBlvE_2fUrpkkd2H0hMei-27nw_axyaVY0';

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
				<Map
					role="application"
					aria-label="map"
					onReady={this.mapReady}
					// Looks like I was missing this: https://www.npmjs.com/package/google-maps-react#sample-usage-with-lazy-loading-google-api
					google={this.props.google}
					style={style}
					// initalCenter: Takes an object containing latitude and longitude coordinates. Sets the maps center upon loading.
					initialCenter={center}
				/>
			</div>
		);
  }
}

// Automatically Lazy-loading Google API
export default GoogleApiWrapper({ apiKey: API_KEY })(MapDisplay)

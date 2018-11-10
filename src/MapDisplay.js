import React, { Component } from 'react'
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
/*import { BrowserRouter, Route, Link } from 'react-router-dom'*/

const API_KEY = 'AIzaSyBlvE_2fUrpkkd2H0hMei-27nw_axyaVY0';

class MapDisplay extends React.Component {
	state = {
		map: null,
		// List of all markers, and props
		markers: [],
		markerProps: [],
		// Which marker is active, and it's props
		activeMarker: null,
		activeMarkerProps: null,
		// Is info window supposed to show
		showInfoWindow: false
	};

	componentDidMount = () => {
	}

	mapReady = (props, map) => {
		// Pass map into state, call updateMarkers with locations
		this.setState({map});
		this.updateMarkers(this.props.locations);
	}

	closeInfoWindow = () => {
		// Disable any active markers
		// See if there is an active marker && turn off any Animation
		this.state.activeMarker && this.state.activeMarker.setAnimation(null);
		// Then set showInfoWindow, activeMarker, and activeMarkerProps to null
		// Using optional pass obj into first arg
		// https://reactjs.org/docs/react-component.html#setstate
		this.setState({
			showInfoWindow: null,
			activeMarker: null,
			activeMarkerProps: null
		})
	}

	onMarkerClick = (props, marker, event) => {
		this.closeInfoWindow();

		// Set state to marker info window show
		this.setState({
			showInfoWindow: true,
			activeMarker: marker,
			activeMarkerProps: props
		})
	}

	updateMarkers = (locations) => {
			// make sure locations are valid
			if (!locations) return;

			// Clear map of current markers if any
			this.setState((this.state.map), null);

			// Create an empty markerProps array
			let markerProps = [];
			// Map over locations, get data, index and array
			let markers = locations.map((location, index) => {
					let theseProps = {
						key: index,
						index,
						name: location.name,
						position: location.pos,
						url: location.url
					}
					// push marker data into markerProps array
					markerProps.push(theseProps);

					// Animation can either BOUNCE or DROP
					// https://developers.google.com/maps/documentation/javascript/reference/marker#Animation
					let animation = this.props.google.maps.Animation.DROP;
					let marker = new this.props.google.maps.Marker({
						position: location.pos,
						map: this.state.map,
						animation
					});
					marker.addListener('click', () => {
						this.onMarkerClick(theseProps, marker, null);
					});
					return marker;
				}
			)
		}

  render() {
		const style = {
			// Prefer VW and VH to %
		  width: '100vw',
		  height: '90vh'
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

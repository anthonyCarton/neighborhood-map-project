import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
/*import { BrowserRouter, Route, Link } from 'react-router-dom'*/

const API_KEY = 'AIzaSyBlvE_2fUrpkkd2H0hMei-27nw_axyaVY0';
const CO_SOCRATA_TOKEN = 'gNqVzSHJ7pWovzVu8pRHdiMHe';

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
		// Call for CO Liquor License Info as soon at the map is ready instead of when clicking on markers
		this.getLicenseInfo();
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

	getLicenseInfo = () => {
		// Fetch the info from CO
		// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
		// https://data.colorado.gov/Business/Liquor-Licenses-in-Colorado/ier5-5ms2
		// https://dev.socrata.com/foundry/data.colorado.gov/6a7f-q6ys
		const CITY = 'Mancos';

		fetch(`https://data.colorado.gov/resource/6a7f-q6ys.json?city=${CITY}&%24%24app_token=${CO_SOCRATA_TOKEN}`)
			.then(
				function(response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem. Status Code: ' + response.status);
						return;
					}
					// Examine the text in the response
					response.json().then(function(data) {
						console.log(data);
					});
				}
			)
			.catch(function(error) {
			console.log('Fetch Error :-S', error);
		})
	}

	getBusinessInfo = () => {
		// Match the info to restaurant
	}

	onMarkerClick = (props, marker, event) => {
		this.closeInfoWindow();
		// Set state to marker info window show
		this.setState({
			showInfoWindow: true,
			activeMarker: marker,
			activeMarkerProps: props
		})

		// Call for CO Liquor License Info
		this.getLicenseInfo();
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
					google={this.props.google}
					zoom={this.props.zoom}
					style={style}
					initialCenter={center}
					onClick={this.closeInfoWindow}
				>
				{/* https://www.npmjs.com/package/google-maps-react#events-4 */}
				<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showInfoWindow}
					onClose={this.closeInfoWindow}
					>
				    <div>
				      <h3>{this.state.activeMarkerProps && this.state.activeMarkerProps.name}</h3>
							{/* Most places in town down have a website so I'm leaving off the URL*/}
				    </div>
				</InfoWindow>
				</Map>
			</div>
		);
  }
}

// Automatically Lazy-loading Google API
export default GoogleApiWrapper({ apiKey: API_KEY })(MapDisplay)

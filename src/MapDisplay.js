import React, { Component } from 'react'
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import LoadingContainer from './LoadingContainer';

const API_KEY = 'AIzaSyBlvE_2fUrpkkd2H0hMei-27nw_axyaVY0';
const CO_SOCRATA_TOKEN = 'gNqVzSHJ7pWovzVu8pRHdiMHe';

class MapDisplay extends Component {
	state = {
		map: null,
		// List of all markers, and props
		markers: [],
		markerProps: [],
		// Which marker is active, and it's props
		activeMarker: null,
		activeMarkerProps: null,
		// Is info window supposed to show
		showInfoWindow: false,
		didFetch: false
	};

	componentWillReceiveProps = (receivedProps) => {
		// If number of locations changes, update the markers
		if (this.state.markers.length !== receivedProps.locations.length) {
			this.closeInfoWindow();
			this.updateMarkers(this.props.locations);
			return;
		}

		// If selected item not the active marker, close infoWindow
		if (!receivedProps.selectedIndex
				|| (this.state.activeMarker
				&& (this.state.markers[receivedProps.selectedIndex] !== this.state.activeMarker))) {
					this.closeInfoWindow();
				}

		// If no selected marker, return
    if (receivedProps.selectedIndex === null || typeof(receivedProps.selectedIndex) === "undefined") {
        return;
    };

		// act as though marker is clicked
		this.onMarkerClick(this.state.markerProps[receivedProps.selectedIndex], this.state.markers[receivedProps.selectedIndex])
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
			activeMarkerProps: null,
			animation: null // added this to remove animation
		})
	}

	getBusinessInfo = (props, data) => {
		// Match the info to restaurant by filtering by address
		let matchList =  data.filter(item => item.street_address.toLowerCase().includes(props.street.toLowerCase()) || props.street.toLowerCase().includes(item.street_address.toLowerCase()));

		if (!matchList[0]) {
		} else {
			return matchList[0];
		}
	}

	onMarkerClick = (props, marker, event) => {
		this.closeInfoWindow();

		// Call for CO Liquor License Info
		let activeMarkerProps;

		fetch(`https://data.colorado.gov/resource/6a7f-q6ys.json?city=Mancos&%24%24app_token=${CO_SOCRATA_TOKEN}`)
			.then(fetchResponse => fetchResponse.json())
			.then(result => {
				// get the Business
				let restaurant = this.getBusinessInfo(props, result);
				// was there a match?
				if (restaurant) {
					let exp_date = new Date(restaurant.expiration).toDateString();
					activeMarkerProps = {
						...props,
						// has_lic: true,
						lic_num: restaurant.license_number,
						lic_exp: exp_date,
						lic_type: restaurant.license_type
					}
				} else {
					activeMarkerProps = {
						...props,
						has_lic: false
					}
				}
				marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
				this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
			}
		)
		.then(result => {
				this.setState({
					didFetch: true
				});
			console.log('didFetch is true!');
			}
		)
		.catch(function(error) {
			console.log('Fetch Error (yikes!) :', error);
		});

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
		this.state.markers.forEach(marker => marker.setMap(null));

		// Create an empty markerProps array
		let markerProps = [];
		// Map over locations, get data, index and array
		let markers = locations.map((location, index) => {
			let theseProps = {
				key: location.name,
				index: index,
				name: location.name,
				position: location.pos,
				street: location.street,
				url: location.url
			}
			// push marker data into markerProps array
			markerProps.push(theseProps);

			// Animation can either BOUNCE or DROP
			// let animation = this.props.google.maps.Animation.DROP;
			let marker = new this.props.google.maps.Marker({
				position: location.pos,
				map: this.state.map,
				animation: null
			});
			marker.addListener('click', () => {
				this.onMarkerClick(theseProps, marker, null);
			});
			return marker;
		})

		this.setState({markers, markerProps}); // It was this!
	};

render() {
	let theseProps = this.state.activeMarkerProps;
	let didFetch = this.state.didFetch;

	// did_fetch === false
	const FETCH_ERROR =
		<div>
			<p>Due to an error connecting to Colorado Dept. of Revenue,
			<br />not currently able to fetch license status.</p>
		</div>;

	// didFetch === true && hasLic === true
	const HAS_LIC =
		<div>
			<p>Lic. # {theseProps && theseProps.lic_num}</p>
			<p>Expiration: {theseProps && theseProps.lic_exp}</p>
			<p>Type: {theseProps && theseProps.lic_type}</p>
		</div>;

	// didFetch === true && hasLic === false
	const NO_LIC =
		<div>
			<p>This establishment does not <br />have a liquor license.</p>
		</div>;

		const STYLE = {
		  width: 'inherit',
			height: '100%'
		}
		const CENTER = {
			lat: this.props.lat,
			lng: this.props.lng
		}

    return (
				<Map
					role="application"
					aria-label="map"
					onReady={this.mapReady}
					google={this.props.google}
					zoom={this.props.zoom}
					style={STYLE}
					initialCenter={CENTER}
					onClick={this.closeInfoWindow}>

					{/* https://www.npmjs.com/package/google-maps-react#events-4 */}
					<InfoWindow
						marker={this.state.activeMarker}
						visible={this.state.showInfoWindow}
						onClose={this.closeInfoWindow}>
							<div>
								<h3>{ theseProps && theseProps.name }</h3>
								{
									( didFetch === false ) ? ( FETCH_ERROR ) : (
										( theseProps && theseProps.lic_num && theseProps.lic_exp ) ? ( HAS_LIC ) : ( NO_LIC )
									)
								}
							</div>
						</InfoWindow>
				</Map>
		);
  }
}

// Automatically Lazy-loading Google API with custom loading container
export default GoogleApiWrapper({
  apiKey: API_KEY,
  LoadingContainer: LoadingContainer
})(MapDisplay)

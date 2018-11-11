import React, { Component } from 'react'
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
/*import { BrowserRouter, Route, Link } from 'react-router-dom'*/

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
		showInfoWindow: false
	};

	componentWillReceiveProps = (props) => {
		// If number of locations changes, update the markers
		if (this.state.markers.length !== props.locations.length) {
			this.closeInfoWindow();
			this.updateMarkers(this.props.locations);
			return;
		}
		// If selected item not the active marker, close infoWindow
		if (!this.props.selected
				|| (this.state.activeMarker
				&& (this.state.markers[this.props.selected] !== this.state.activeMarker))) {
					this.closeInfoWindow();
				}
		// If no selected marker, return
    if (this.props.selected === null || typeof(this.props.selected) === "undefined") {
        return;
    };
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

	getBusinessInfo = (props, data) => {
		// Match the info to restaurant by filtering by address
		return data.filter(item => item.street_address.toLowerCase().includes(props.street.toLowerCase()) || props.street.toLowerCase().includes(item.street_address.toLowerCase()))
	}

	onMarkerClick = (props, marker, event) => {
		this.closeInfoWindow();

		// Call for CO Liquor License Info
		// Fetch the info from CO
		// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
		// https://data.colorado.gov/Business/Liquor-Licenses-in-Colorado/ier5-5ms2
		// https://dev.socrata.com/foundry/data.colorado.gov/6a7f-q6ys
		// Create props for the active marker
		let activeMarkerProps;

		fetch(`https://data.colorado.gov/resource/6a7f-q6ys.json?city=Mancos&%24%24app_token=${CO_SOCRATA_TOKEN}`)
			.then(fetchResponse => fetchResponse.json())
			.then(result => {
					// get just this Business
					let restaurant = this.getBusinessInfo(props, result);
					console.log(restaurant[0]);
					let exp_date = new Date(restaurant[0].expiration).toDateString();

					// was there a match?
					if (restaurant[0]) {
						activeMarkerProps = {
							...props,
							lic_num: restaurant[0].license_number,
							lic_exp: exp_date,
							lic_type: restaurant[0].license_type
						}
					} else {
						activeMarkerProps = {
							...props,
						}
					}

					this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});

					console.log(activeMarkerProps);

					if (activeMarkerProps.lic_num &&
							activeMarkerProps.lic_exp &&
							activeMarkerProps.lic_type ) {
						console.log(activeMarkerProps);
					} else {
						console.log('no liquor license');
					}
				}
			)
			.catch(function(error) {
				console.log('Fetch Error :-S', error);
			});

			// Set state to marker info window show
			this.setState({
				showInfoWindow: true,
				activeMarker: marker,
				activeMarkerProps: props
			})

	}


	updateMarkers = (locations) => {
		console.log(this.state.markers);
		// make sure locations are valid
		if (!locations) return;

		// Clear map of current markers if any
		this.state.markers.forEach(marker => marker.setMap(null));

		// Create an empty markerProps array
		let markerProps = [];
		// Map over locations, get data, index and array
		let markers = locations.map((location, index) => {
			let theseProps = {
				key: index,
				index,
				name: location.name,
				position: location.pos,
				street: location.street,
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
		})
		console.log(markers);
		this.setState({markers, markerProps}); // It was this!
	}

  render() {
		const style = {
			// Prefer VW and VH to %
		  width: '75%',
		}
		const center = {
			lat: this.props.lat,
			lng: this.props.lng
		}
		let theseProps = this.state.activeMarkerProps;
    return (
				<Map
					role="application"
					aria-label="map"
					onReady={this.mapReady}
					google={this.props.google}
					zoom={this.props.zoom}
					style={style}
					initialCenter={center}
					onClick={this.closeInfoWindow}>
					{/* https://www.npmjs.com/package/google-maps-react#events-4 */}
					<InfoWindow
						marker={this.state.activeMarker}
						visible={this.state.showInfoWindow}
						onClose={this.closeInfoWindow}>
					  <div>
							<h3>{theseProps && theseProps.name}</h3>
							{theseProps && theseProps.lic_num && theseProps.lic_exp
                ? (
									<div>
										<p>Lic. # {theseProps && theseProps.lic_num}</p>
										<p>Expiration: {theseProps && theseProps.lic_exp}</p>
										<p>Type: {theseProps && theseProps.lic_type}</p>
									</div>
								) : (
									<p>This establishment does not have a liquor license.</p>
								)}
					  </div>
					</InfoWindow>
				</Map>
		);
  }
}

// Automatically Lazy-loading Google API
export default GoogleApiWrapper({ apiKey: API_KEY })(MapDisplay)

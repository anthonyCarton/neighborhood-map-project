import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {GoogleApiComponent, GoogleAPIWrapper} from 'google-maps-react';
import PropTypes from 'prop-types';



export class Map extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.google !== this.props.google) {
			this.loadMap();
		}
		if (prevState.currentLocation !== this.state.currentLocation) {
			this.recenterMap();
		}
	}

	recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng)
        map.panTo(center)
    }
  }

	constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }

	componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
    }
    this.loadMap();
  }

	loadMap() {
		if (this.props && this.props.google) {
			// if both of those things, google is available, so...
			const {google} = this.props;
			const maps = google.maps;

			// grab a reference to the DOM component where we want the map to be placed
			const mapRef = this.refs.map;
			const node = ReactDOM.findDOMNode(mapRef)

			// instantiate a Google map object on our page
			let {initialCenter, zoom} = this.props;
			const {lat, lng} = this.state.currentLocation;
			const center = new maps.LatLng(lat, lng);
			const mapConfig = Object.assign({}, {
				center: center,
				zoom: zoom
			})
			this.map = new maps.Map(node, mapConfig);
		}
		// ...
	}

	render() {
    return (
			<div id="map" ref='map' role="application">
				Loading map...
				<p>{this.props.zoom}, {this.props.lat}, {this.props.lng}</p>
			</div>
    )
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object
}
Map.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
	centerAroundCurrentLocation: false
}

export default Map

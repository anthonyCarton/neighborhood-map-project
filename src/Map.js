import React, { Component } from 'react'


class Map extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (prefProps.google !== this.props.google) {
			this.loadMap();
		}
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
			let zoom = this.props.zoom;
			let lat = this.props.lat;
			let lng = this.props.lng;
			const center = new.maps.LatLng(lat, lng);
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
      <div ref='map'>
        Loading map...
      </div>
    )
  }
}

export default Map

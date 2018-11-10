import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

// TODO: Add state with map: null
// TODO: Add empty compDidMount()
// TODO: Add mapReady(props, map)
// TODO: Add style and center variables
// TODO: Add ARIA role and label
// TODO: Use GoogleApiWrapper to load the API, pass in MapDisplay when promise is fulfilled

class MapDisplay extends React.Component {
  render() {
    return (
			<div>
				<h1>Restaurants in Mancos Colorado</h1>
				<p>The map will be here</p>
			</div>
		);
  }
}

export default MapDisplay

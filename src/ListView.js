import React, { Component } from 'react'

//https://reactjs.org/docs/lists-and-keys.html#embedding-map-in-jsx

class ListView extends Component {
	state = {
		query: ""
	}

	updateQuery = (query) => {
		this.setState({query: query})
		this.props.filterLocations(query);
	}

  render() {
    return (
			<div className="list-view">
				<input
					type="search"
					id="locationFilter"
					aria-label="Filter locations"
					onChange={event => this.updateQuery(event.target.value.toLowerCase())}
					></input>
				<ul>
						{this.props.locations && this.props.locations.map((location) => {
							return (
								<li key={location.name}>
									<button>{location.name}</button>
								</li>
							)
						})}
				</ul>
			</div>
		);
  }
}

export default ListView

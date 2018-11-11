import React, { Component } from 'react'

//https://reactjs.org/docs/lists-and-keys.html#embedding-map-in-jsx

class ListView extends Component {
	state = {
		query: ""
	}

	updateQuery = (updatedQuery) => {
		this.setState({ query: updatedQuery });
		this.props.filterLocations(updatedQuery);
	}

  render() {
    return (
			<div className="list-view">
				<input
					type="search"
					id="locationFilter"
					aria-label="Filter locations"
					name="filter"
					onChange={event => this.updateQuery(event.target.value)}
					onKeyUp={event => this.updateQuery(event.target.value)}
					value={this.state.query}
					/>
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

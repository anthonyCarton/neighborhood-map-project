import React, { Component } from 'react'

//https://reactjs.org/docs/lists-and-keys.html#embedding-map-in-jsx

class ListView extends React.Component {
	state = {}

  render() {
    return (
			<div className="list-view">
				<ul>
					{this.props.locations.map((location) => {
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

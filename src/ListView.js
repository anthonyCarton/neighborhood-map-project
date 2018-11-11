import React, { Component } from 'react'

//https://reactjs.org/docs/lists-and-keys.html#embedding-map-in-jsx

let numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
	<li>{number}</li>
);

class ListView extends React.Component {

  render() {
    return (
			<div className="list-view">
				<p>This is the ListView</p>
				<ul>{listItems}</ul>
			</div>
		);
  }
}

export default ListView

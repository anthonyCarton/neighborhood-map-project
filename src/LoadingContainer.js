import React, { Component } from 'react'

class LoadingContainer extends Component {
	state = {
		show: false,
		timeout: null
	}
	componentDidMount = () => {
		let timeout = window.setTimeout(this.showMessage, 1000);
		this.setState({timeout});
	}
	componentWillUnmount = () => {
		window.clearTimeout(this.state.timeout);
	}
	showMessage = () => {
			this.setState({show: true});
	}

  render() {
    return (
			<div>
			{this.state.show
				? (
					<div>
						<h1>Page is not loading correctly.</h1>
						<p>Unfortunately, this page cannot load right now.
						You might need to move to a location with stronger
						internet access or reset your router.</p>
						</div>
					)
					: (<div><h1>Loading</h1></div>)
				}
			</div>
		);
  }
}

export default LoadingContainer

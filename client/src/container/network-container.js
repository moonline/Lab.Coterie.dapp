import React from 'react';

import Web3 from 'web3';

class NetworkContainer extends React.Component {
	componentDidMount = async () => {
		// TODO add web3 connection for prod
		const web3 = new Web3('http://localhost:8545');
		const networkId = await web3.eth.net.getId();
		this.setState({ web3, networkId });
	};

	constructor(props) {
		super(props);

		this.state = {
			web3: null,
			networkId: null
		};
	}

	render = () => this.props.children(this.state.web3, this.state.networkId);
}

export default NetworkContainer;

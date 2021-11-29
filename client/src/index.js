import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NetworkContainer from './container/network-container';
import AccountContainer from './container/account-container';
import CoterieContainer from './container/coterie-container';

import App from './App';
import './index.css';

ReactDOM.render(
	<NetworkContainer>
		{(web3, networkId) => (
			<AccountContainer web3={web3} networkId={networkId}>
				{currentAccount => (
					<CoterieContainer web3={web3} networkId={networkId} currentAccount={currentAccount}>
						<App networkReady={!!networkId} />
					</CoterieContainer>
				)}
			</AccountContainer>
		)}
	</NetworkContainer>,
	document.getElementById('root')
);

/*
import Web3 from 'web3';

const web3 = new Web3('http://localhost:8545');

const NetworkContainer = () => {
    const [networkId, setNetworkId] = useState();

    web3.eth.net.getId().then((id) => { setNetworkId(id); console.log('networkId', id); });

    return (
        <App networkId={networkId} web3={web3} />
    );
};

ReactDOM.render(
    <NetworkContainer />,
	document.getElementById('root')
);*/

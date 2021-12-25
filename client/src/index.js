import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NetworkContainer from './container/network-container';
import AccountContainer from './container/account-container';
import CoterieContainer from './container/coterie-container';

import App from './components/app';
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

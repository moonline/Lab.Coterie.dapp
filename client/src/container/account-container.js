import React from 'react';

import AccountContext from '../context/account-context';

class AccountContainer extends React.Component {
	componentDidUpdate = async (previousProps, previousState) => {
		if (this.props.web3 && this.props.web3 !== previousProps.web3) {
			const accounts = await this.props.web3.eth.getAccounts();
			this.setState({ accounts, ...(accounts.length > 0 ? { currentAccount: accounts[0] } : {}) });
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			accounts: null,
			currentAccount: null
		};
	}

	setCurrentAccount = account => this.setState({ currentAccount: account });

	render = () => (
		<AccountContext.Provider
			value={{
				accounts: this.state.accounts,
				currentAccount: this.state.currentAccount,
				setCurrentAccount: this.setCurrentAccount
			}}
		>
			{this.props.children}
		</AccountContext.Provider>
	);
}

export default AccountContainer;

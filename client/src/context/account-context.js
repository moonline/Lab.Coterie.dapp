import React from 'react';

const AccountContext = React.createContext({
	accounts: null,
	currentAccount: null,
	setCurrentAccount: () => {}
});

export default AccountContext;

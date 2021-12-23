import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import AccountContext from '../../context/account-context';
import CoterieLogo from './coterie-logo';
import AccountsMenu from './accounts-menu';

const Header = () => {
	const { accounts, currentAccount, setCurrentAccount } = useContext(AccountContext);

	return (
		<Navbar expand="lg">
			<Container className="mx-4">
				<Navbar.Brand href="#" className="text-white">
					<CoterieLogo /> Coterie
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<AccountsMenu
							accounts={accounts}
							currentAccount={currentAccount}
							onChange={setCurrentAccount}
						/>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

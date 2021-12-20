import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle as PersonCircleIcon } from 'react-bootstrap-icons';

import AccountContext from '../context/account-context';
import Account from './account';
import CoterieLogo from './coterie-logo';

const Header = () => {
	const { accounts, currentAccount, setCurrentAccount } = useContext(AccountContext);

	return (
		<Navbar expand="lg">
			<Container className="px-0">
				<Navbar.Brand href="#" className="text-white">
					<CoterieLogo /> Coterie
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{accounts && (
							<NavDropdown
								title={
									<span className="text-white">
										<Account id={currentAccount} icon={<PersonCircleIcon />} />
									</span>
								}
								id="accounts-dropdown"
							>
								{accounts.map(account => (
									<NavDropdown.Item
										key={account}
										eventKey={account}
										active={currentAccount === account}
										onClick={() => setCurrentAccount(account)}
									>
										<Account id={account} />
									</NavDropdown.Item>
								))}
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

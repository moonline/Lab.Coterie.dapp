import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle as PersonCircleIcon } from 'react-bootstrap-icons';

import AccountContext from '../context/account-context';

import Account from './account';

const Header = () => {
	const { accounts, currentAccount, setCurrentAccount } = useContext(AccountContext);

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#">Coterie</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{accounts && (
							<NavDropdown
								title={<Account id={currentAccount} icon={<PersonCircleIcon />} />}
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

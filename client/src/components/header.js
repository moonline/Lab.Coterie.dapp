import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AccountContext from '../context/account-context';

const Header = () => {
	const { accounts, currentAccount, setCurrentAccount } = useContext(AccountContext);

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#">Coterie</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{/*accountList.accounts && (
				            <NavDropdown title={accountList.currentAccount.substring(0,10)} id="accounts-dropdown">
					            {accountList.accounts.map(account => (
						            <NavDropdown.Item
                                        key={account}
							            eventKey={account}
							            active={accountList.currentAccount === account}
                                        onClick={() => accountList.setCurrentAccount(account)}
						            >
							            {account.substring(0, 10)}
						            </NavDropdown.Item>
					            ))}
				            </NavDropdown>
			            )*/}
						{accounts && (
							<NavDropdown
								title={currentAccount ? currentAccount.substring(0, 10) : 'Account'}
								id="accounts-dropdown"
							>
								{accounts.map(account => (
									<NavDropdown.Item
										key={account}
										eventKey={account}
										active={currentAccount === account}
										onClick={() => setCurrentAccount(account)}
									>
										{account.substring(0, 10)}
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

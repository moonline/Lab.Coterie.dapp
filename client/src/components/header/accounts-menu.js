import React from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle as PersonCircleIcon } from 'react-bootstrap-icons';

import Account from '../account';

import './accounts-menu.css';

const AccountsMenu = ({ accounts, currentAccount, onChange }) =>
	accounts && (
		<NavDropdown
			className="accounts-menu"
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
					onClick={() => onChange(account)}
					variant="success"
				>
					<Account id={account} />
				</NavDropdown.Item>
			))}
		</NavDropdown>
	);

export default AccountsMenu;
